using AutoMapper;
using WebApplication1.Dto;
using WebApplication1.Entitys;
using WebApplication1.ModelDTO;

namespace WebApplication1.MappingProfiles
{
    public class ApplicationProfiles : Profile
    {
        public ApplicationProfiles()
        {
            CreateMap<User_Application, UserDto>().ReverseMap();
            CreateMap<Messages, MessageResponseDTO>().ReverseMap();
            CreateMap<User_Application, FriendDto>().ReverseMap();
        }
    }
}
