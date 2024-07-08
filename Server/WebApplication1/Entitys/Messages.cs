using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1.Entitys
{
    public class Messages
    {
        public int Id { get; set; }
        [Required]
        public string SenderId { get; set; }
        [ForeignKey("SenderId")]
        public User_Application Sender { get; set; }
        public string SenderName { get; set; }
        [Required]
        public string RecipientId { get; set; }
        [ForeignKey("RecipientId")]
        public User_Application Recipient { get; set; }
        public string RecipientName { get; set; }
        public string Content { get; set; }
        public DateTime DateRead { get; set; }
        public DateTime MessageSent { get; set; } = DateTime.Now;
        public bool SenderDeleted { get; set; }
        public bool RecipientDeleted { get; set; }

    }
}
