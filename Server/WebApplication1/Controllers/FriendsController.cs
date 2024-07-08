using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApplication1.ModelDTO;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class FriendsController : Base_Controller_Api
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public FriendsController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet("All-friends")]
        public async Task<ActionResult<IEnumerable<FriendDto>>> GetAllFriends()
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.GivenName).Value;


            try
            {
                var friends = _unitOfWork.FriendsRepository.GetAll(m => m.UserName == claim || m.FriendUserName == claim, x => x.User).ToList();

                var realList = new List<FriendDto>();


                foreach (var friend in friends)
                {
                    if (friend.UserName == claim)
                    {
                        var userFriendData = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.UserName == friend.FriendUserName);

                        var userFriend = _mapper.Map<FriendDto>(userFriendData);

                        realList.Add(userFriend);
                    }
                        


                    if (friend.FriendUserName == claim)
                    {
                        var userFriendData = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.UserName == friend.UserName);

                        var userFriend = _mapper.Map<FriendDto>(userFriendData);

                        realList.Add(userFriend);
                    }
                }


                //var friendDtos = 
                return Ok(realList);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NotFound();


        }
    }
}
