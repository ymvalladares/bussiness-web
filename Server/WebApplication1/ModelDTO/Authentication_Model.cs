using System.ComponentModel.DataAnnotations;

namespace WebApplication1.ModelDTO
{
    public class Authentication_Model
    {
        [EmailAddress]
        public string Email { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }

    }
}
