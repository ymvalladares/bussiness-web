using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApplication1.Dto;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;
using WebApplication1.Utility;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class UserController : Base_Controller_Api
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;

        public UserController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<UserDto>>> getAllUser()
        {
            var query = _unitOfWork.ApplicationUserRepository.GetAll();

            var userDTo = _mapper.Map<List<UserDto>>(query);
            return Ok(userDTo);
        }

        [HttpGet("ById/{id}")]
        public async Task<ActionResult<UserDto>> getUserById(string id)
        {
            var query = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.Id == id);
            var userDTo = _mapper.Map<UserDto>(query);
            return Ok(userDTo);
        }

        [HttpGet("ByUserName/{userName}")]
        public async Task<ActionResult<UserDto>> getAllUser(string userName)
        {
            var query = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.UserName == userName);
            var userDTo = _mapper.Map<UserDto>(query);
            return Ok(userDTo);
        }
    }
}
