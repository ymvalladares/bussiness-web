using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Entitys
{
    public class Friends
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        [ForeignKey("UserId")]
        public User_Application User { get; set; }
        public string UserName { get; set; }

        public string FriendId { get; set; }
        [ForeignKey("FriendId")]
        public User_Application UserFriend { get; set; }
        public string FriendUserName { get; set; }
    }
}
