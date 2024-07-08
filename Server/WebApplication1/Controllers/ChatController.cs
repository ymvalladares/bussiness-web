using WebApplication1.Hubs;

namespace WebApplication1.Controllers
{
    public class ChatController : Base_Controller_Api
    {
        private readonly ChatService _chatService;

        public ChatController(ChatService chatService)
        {
            _chatService = chatService;
        }
    }
}
