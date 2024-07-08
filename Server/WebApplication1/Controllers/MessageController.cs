using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using WebApplication1.Entitys;
using WebApplication1.ModelDTO;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Controllers
{
    [Authorize]
    public class MessageController : Base_Controller_Api
    {
        private readonly IUnitOfWork _unitOfWork;
        private readonly IMapper _mapper;
        readonly DateTime valueDefault = new(0001, 01, 01, 00, 00, 00);

        public MessageController(IUnitOfWork unitOfWork, IMapper mapper)
        {
            _unitOfWork = unitOfWork;
            _mapper = mapper;
        }

        [HttpPost("Send-Message")]
        public async Task<ActionResult<MessageResponseDTO>> CreateMessage(CreateMessageDTO createMessageDto)
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.GivenName).Value;

            if (claim.ToLower() == createMessageDto.RecipientName.ToLower())
            {
                return BadRequest("You cannot send messages to yousefl");
            }

            var sender = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.UserName == claim);

            var recipient = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.UserName == createMessageDto.RecipientName);

            var checkListOfFriends = _unitOfWork.FriendsRepository.GetFirstOrDefault(x => x.UserName == createMessageDto.RecipientName || x.FriendUserName == createMessageDto.RecipientName);

            if (recipient == null) return NotFound();
            var message = new Messages
            {
                Sender = sender,
                Recipient = recipient,
                SenderName = sender.UserName,
                RecipientName = recipient.UserName,
                Content = createMessageDto.Content
            };

            if(checkListOfFriends == null)
            {
                var friend = new Friends
                {
                    User = sender,
                    UserName = sender.UserName,
                    UserFriend = recipient,
                    FriendUserName = recipient.UserName,
                };

                _unitOfWork.FriendsRepository.Add(friend);
            }

            try
            {
                _unitOfWork.MessageRepository.Add(message);
                
                _unitOfWork.Save();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            var messageDTO = _mapper.Map<MessageResponseDTO>(message);

            return Ok(messageDTO);
        }

        [HttpGet("All-Messages/{friendId}")]
        public async Task<ActionResult<IEnumerable<MessageResponseDTO>>> GetMessageForUser(string friendId)
        {
            var conf_username_exist_db = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.Id == friendId);
            if(conf_username_exist_db == null) return NotFound("Are you trying to hack, MotherFucker");

            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.GivenName).Value;


            try
            {
                var messages = _unitOfWork.MessageRepository.GetAll(m => m.RecipientName == claim && m.SenderId == friendId || m.RecipientId == friendId && m.SenderName == claim);
                var messageDto = _mapper.Map<List<MessageResponseDTO>>(messages);
                return Ok(messageDto);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

            return NotFound();

            
        }


        //[HttpGet("chat-user-list")]
        //public async Task<ActionResult<IEnumerable<string>>> GetUserChatAlready()
        //{
         
        //    var claimsIdentity = (ClaimsIdentity)User.Identity;
        //    var claim = claimsIdentity.FindFirst(ClaimTypes.GivenName).Value;


        //    try
        //    {
        //        var messages = _unitOfWork.MessageRepository.GetAll(m => m.RecipientName == claim || m.SenderName == claim);
        //        return Ok(messageDto);
        //    }
        //    catch (Exception ex)
        //    {
        //        return BadRequest(ex.Message);
        //    }

        //    return NotFound();


        //}

        [HttpGet("thread/{username}")]
        public async Task<ActionResult> GetMessageThread(string username)
        {
            var conf_username_exist_db = _unitOfWork.ApplicationUserRepository.GetFirstOrDefault(x => x.UserName.ToLower() == username.ToLower());
            if (conf_username_exist_db == null) return NotFound("Are you trying to hack, MotherFucker");

            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.GivenName).Value;

            try
            {
                var message = _unitOfWork.MessageRepository.GetAll(m => m.RecipientName == claim && m.RecipientDeleted == false && m.SenderName == username);

                var unReadMessage = message.Where(m => m.DateRead == valueDefault && m.SenderName == username).ToList();

                if (unReadMessage.Any())
                {
                    foreach (var resul in unReadMessage)
                    {
                        resul.DateRead = DateTime.Now;
                    }
                    _unitOfWork.Save();

                    return Ok("Messages read already");
                }
            }
            catch
            {
                return BadRequest("Imposible to read messages. TRefresh your page and try again");
            }

            return NoContent();
            
            
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteMessageThread(int id)
        {
            var claimsIdentity = (ClaimsIdentity)User.Identity;
            var claim = claimsIdentity.FindFirst(ClaimTypes.GivenName).Value;

            var message = _unitOfWork.MessageRepository.GetFirstOrDefault(m => m.Id == id);

            if (message.SenderName != claim && message.RecipientName != claim) return Unauthorized();

           try
            {
                if (message.SenderName == claim) message.SenderDeleted = true;
                if (message.RecipientName == claim) message.RecipientDeleted = true;

                //if (message.SenderDeleted && message.RecipientDeleted) _unitOfWork.MessageRepository.Remove(message);
                _unitOfWork.Save();
                return Ok("Message deleted succesfully");
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
     
            return BadRequest("Problem deleting the message");
        }
    }
}
