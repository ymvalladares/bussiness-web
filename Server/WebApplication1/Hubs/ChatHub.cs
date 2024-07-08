
using Microsoft.AspNetCore.SignalR;
using WebApplication1.ModelDTO;

namespace WebApplication1.Hubs
{
    public class ChatHub : Hub
    {
        private readonly ChatService _chatService;

        public ChatHub(ChatService chatService)
        {
            _chatService = chatService;
        }

        public override async Task OnConnectedAsync()
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, "Come2Chat");
            await Clients.Caller.SendAsync("UserConnected");
        }

        public override async Task OnDisconnectedAsync(Exception exception)
        {
            await Groups.RemoveFromGroupAsync(Context.ConnectionId, "Come2Chat");

            var user = _chatService.GetUserByConnectionId(Context.ConnectionId);
            _chatService.RemoveUserFromList(user);

            var onlineUsers = _chatService.GetOnlineUsers();
            await Clients.Groups("Come2Chat").SendAsync("OnlineUsers", onlineUsers);

            await base.OnDisconnectedAsync(exception);
        }

        //Public Chats

        public async Task AddUserConnectionId(string username)
        {
           _chatService.AddUserConnetionId(username, Context.ConnectionId);

           var onlineUsers = _chatService.GetOnlineUsers();

           await Clients.Groups("Come2Chat").SendAsync("OnlineUsers", onlineUsers);
        }

        public async Task ReceiveMessage(MessageResponseDTO message)
        {
           
            await Clients.Group("Come2Chat").SendAsync("NewMessage", message);
        }


        //Privates Chats
        public async Task CreatePrivateChat(MessageResponseDTO message)
        {
            string privateGroupName = GetPrivateGroupName(message.SenderName, message.RecipientName);
            await Groups.AddToGroupAsync(Context.ConnectionId, privateGroupName);
            var toConnectionId = _chatService.GetConnectionIdByUser(message.RecipientName);
            await Groups.AddToGroupAsync(toConnectionId, privateGroupName);

            await Clients.Client(toConnectionId).SendAsync("OpenPrivateChat", message);
        }

        public async Task ReceivePrivateMessage(MessageResponseDTO message)
        {
            string privateGroupName = GetPrivateGroupName(message.SenderName, message.RecipientName);
            await Clients.Group(privateGroupName).SendAsync("NewPrivateMessage", message);
        }

        public async Task RemovePrivateChat(string From, string To)
        {
            string privateGroupName = GetPrivateGroupName(From, To);
            await Clients.Group(privateGroupName).SendAsync("ClosePrivateChat");

            await Groups.RemoveFromGroupAsync(Context.ConnectionId, privateGroupName);

            var toConnectionId = _chatService.GetConnectionIdByUser(To);
            await Groups.RemoveFromGroupAsync(toConnectionId, privateGroupName);
        }

        private string GetPrivateGroupName(string From, string To)
        {
            var stringCompare = string.Compare(From, To) < 0;
            return stringCompare ? $"{From} - {To}" : $"{To} - {From}";
        }
    }
}
