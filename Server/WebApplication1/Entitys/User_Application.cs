using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Entitys
{
    //Add DbContext
    public class User_Application : IdentityUser
    {
        public string? Name { get; set; }
        public DateTime LastActive { get; set; } = DateTime.Now;
        public bool Active { get; set; }
        //public ICollection<Messages> MessagesSent { get; set; }
        //public ICollection<Messages> MessagesReceived { get; set; }
        //public ICollection<User_Application> Friends_Talk_Already { get; set; }
    }
}
