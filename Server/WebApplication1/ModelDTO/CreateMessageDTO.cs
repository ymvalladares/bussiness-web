using System.ComponentModel.DataAnnotations;

namespace WebApplication1.ModelDTO
{
    public class CreateMessageDTO
    {
        [Required]
        public string RecipientName { get; set; }
        [Required]
        public string Content { get; set; }
    }
}
