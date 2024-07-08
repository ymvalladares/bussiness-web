using Microsoft.AspNetCore.Identity;

namespace WebApplication1.Dto
{
    public class ApiResponseDTO<T>
    {
        public string Message { get; set; }
        public bool IsSuccess { get; set; }
        public IEnumerable<T>  Errors { get; set; }

    }
}
