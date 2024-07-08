namespace WebApplication1.ModelDTO
{
    public class MessageResponseDTO
    {
        public int Id { get; set; }
        public string SenderName { get; set; }
        public string RecipientName { get; set; }
        public string Content { get; set; }
        public DateTime DateRead { get; set; }
        public DateTime MessageSent { get; set; }
    }
}
