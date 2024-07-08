using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;
using System.Text;
using WebApplication1.Data;
using WebApplication1.Dto;
using WebApplication1.Entitys;
using WebApplication1.Hubs;
using WebApplication1.ModelDTO;
using WebApplication1.Repository.IRepository;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    public class AccountController : Base_Controller_Api
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly ChatService _chatService;

        //private readonly DbContext_App _db;
        private readonly UserManager<IdentityUser> _userManager;
        private readonly SignInManager<IdentityUser> _signInManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly ITokenService _tokenService;
        private readonly IConfiguration _config;
        private readonly IEmailSender _emailSender;
        private readonly HttpClient _httpClient;

        //private readonly ILogger _logger;

        public AccountController(IUnitOfWork unitOfWork, ChatService chatService, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, RoleManager<IdentityRole> roleManager, ITokenService tokenService, IConfiguration config, IEmailSender emailSender)
        {
            _unitOfWork = unitOfWork;
            _chatService = chatService;
            //_db = db;
            _userManager = userManager;
            _signInManager = signInManager;
            _roleManager = roleManager;
            _tokenService = tokenService;
            _config = config;
            _emailSender = emailSender;
            _httpClient = new HttpClient
            {
                BaseAddress = new Uri("https://www.googleapis.com/oauth2/v2/")
            };

            //_logger = logger;
        }


        [HttpPost("register")]
        public async Task<ActionResult<ApiResponseDTO<string>>> Register(Authentication_Model usuario)
        {
            //created roles in the DB
            if (!_roleManager.RoleExistsAsync(Roles.Role_Admin).GetAwaiter().GetResult())
            {
                _roleManager.CreateAsync(new IdentityRole(Roles.Role_Admin)).GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole(Roles.Role_User_Indi)).GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole(Roles.Role_User_Company)).GetAwaiter().GetResult();
                _roleManager.CreateAsync(new IdentityRole(Roles.Role_Employee)).GetAwaiter().GetResult();
            }

            if (await UserExist(usuario.Email)) return BadRequest("Name is token");



            var user = new User_Application
            {
                UserName = usuario.Username,
                Email = usuario.Email,
            };



            var result = await _userManager.CreateAsync(user, usuario.Password);
            if (result.Succeeded)
            {
                try
                {
                    string url = $"{_config["AppUrl"]}";
                    var emailConfirmationObject = new EmailDto
                    {
                        To = usuario.Email,
                        Subject = "Reset Password",
                        Body = "<h1>Clic to confirm your email</h1>" +
                    $"<p>To confirm your email <a href='{url}'>Click here</a></p>"
                    };

                    await _emailSender.SendEmail(emailConfirmationObject);
                }
                catch (Exception ex)
                {
                    return new ApiResponseDTO<string>
                    {
                        Message = "......Email_Confirmation function....... Problems with email",
                        IsSuccess = false,
                        Errors = new List<string>() { ex.Message }
                    };
                }
                await _userManager.AddToRoleAsync(user, Roles.Role_User_Indi);
                //if (usuario.Role == null)
                //{
                //    await _userManager.AddToRoleAsync(user, Roles.Role_User_Indi);
                //}
                //else
                //{
                //    await _userManager.AddToRoleAsync(user, usuario.Role);
                //}

                //await _signInManager.SignInAsync(user, isPersistent: false);

                return new ApiResponseDTO<string>
                {
                    Message = "User created Succesfully",
                    IsSuccess = true
                };
            }

            return BadRequest(result.Errors);
        }



        [HttpPost("login")]
        public async Task<ActionResult<ApiResponseDTO<string>>> Login(Authentication_Model loginModel)
        {
            var response = new ApiResponseDTO<string> { };
            

            var userIdentity = await _userManager.FindByEmailAsync(loginModel.Email);
            if (userIdentity == null) return Unauthorized("Invalid user");


            var result = await _signInManager.CheckPasswordSignInAsync(userIdentity, loginModel.Password, false);

            if (!result.Succeeded) return Unauthorized("Invalid password");


            try
            {
                var user = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(u => u.Email == loginModel.Email);

                user.Active = true;
                _unitOfWork.Save();

                //add user to chat
                _chatService.AddUserToList(user.UserName);


                var roles = new List<string>(await _userManager.GetRolesAsync(user));
                string token = _tokenService.CreateToken(user, roles);

                return new ApiResponseDTO<string>
                {
                    Message = token,
                    IsSuccess = true,
                };
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

           
           
        }

        [Authorize]
        [HttpPost("Logout")]
        public async Task<ActionResult> Logout()
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.GivenName).Value;

            try
            {
                var user =  _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(u => u.UserName == claim);
                if (user == null) return BadRequest("User not found");
                user.LastActive = DateTime.Now;
                user.Active = false;
                _unitOfWork.Save();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            await _signInManager.SignOutAsync();
           return Ok();

        }


        [HttpGet("ConfirmEmail")]
        public async Task<ActionResult<ApiResponseDTO<string>>> ConfirmEmail(IdentityUser userId, string token)
        {
            if (string.IsNullOrWhiteSpace(userId.ToString()) || string.IsNullOrWhiteSpace(token)) return BadRequest("Email not found");

            

            var result = await _userManager.ConfirmEmailAsync(userId, token);

            if (result.Succeeded)
            {
                return new ApiResponseDTO<string>
                {
                    Message = "Email Confirmation succesfully",
                    IsSuccess = true,
                };
            }

            return BadRequest(result.Errors);
        }



        [HttpPost("forgetPassword")]
        public async Task<ActionResult<ApiResponseDTO<string>>> ForgetPasswordAsync(Authentication_Model usuario)
        {
            var user = await _userManager.FindByEmailAsync(usuario.Email);
            if (user == null) return BadRequest("No user associated with this email");
               

            var token = await _userManager.GeneratePasswordResetTokenAsync(user);
            var encodedToken = Encoding.UTF8.GetBytes(token);
            var validToken = WebEncoders.Base64UrlEncode(encodedToken);

           // string url = $"{_config["AppUrl"]}/ResetPassword?token={validToken}";
            string url = $"http://localhost:3000/reset-password?token={validToken}";

            try
            {
                var emailConfirmationObject = new EmailDto
                {
                    To = usuario.Email,
                    Subject = "Reset Password",
                    Body = "<h1>Follow the instructions to reset your password</h1>" +
                $"<p>To reset your password <a href='{url}'>Click here</a></p>"
                };

                await _emailSender.SendEmail(emailConfirmationObject);
            }
            catch (Exception ex)
            {
                return new ApiResponseDTO<string>
                {
                    Message = "......ForgetPasswordAsync function....... Problems with email",
                    IsSuccess = false,
                    Errors = new List<string>() { ex.Message }
                };
            }

            return new ApiResponseDTO<string>
            {
                Message = "Reset password URL has been sent to the email successfully!",
                IsSuccess = true,
            };
        }

        [HttpPost("ResetPassword")]
        public async Task<ActionResult<ApiResponseDTO<string>>> ResetPasswordAsync( ResetPasswordDTO model)
        {
            var user = await _userManager.FindByEmailAsync(model.Email);

            if (user == null) return BadRequest("Make sure you are using the same email");
               
            if (model.NewPassword != model.ConfirmPassword) return BadRequest("Password doesn't match its confirmation");

            var decodedToken = WebEncoders.Base64UrlDecode(model.Token);
            string normalToken = Encoding.UTF8.GetString(decodedToken);

            var result = await _userManager.ResetPasswordAsync(user, normalToken, model.NewPassword);

            if (result.Succeeded)
            {
                try
                {
                    var emailConfirmationObject = new EmailDto
                    {
                        To = model.Email,
                        Subject = "Reset Password Confirmation",
                        Body = "<h1>Password has been reseted succesfully!. I hope to stay here. Greetings</h1>"
                    };

                    await _emailSender.SendEmail(emailConfirmationObject);
                }
                catch (Exception ex)
                {
                    return new ApiResponseDTO<string>
                    {
                        Message = "......ResetPasswordAsync function....... Problems with email",
                        IsSuccess = false,
                        Errors = new List<string>() { ex.Message }
                    };
                }

                return new ApiResponseDTO<string>
                {
                    Message = "Password has been reset successfully!",
                    IsSuccess = true,
                };
            }


            return BadRequest(result.Errors);
       
        }



        private async Task<bool> UserExist(string email)
        {
            var user = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.Email == email.ToLower());
            if (user == null) return false;
            return true;
        }
    }
}
