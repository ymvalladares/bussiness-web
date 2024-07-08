using WebApplication1.Entitys;

namespace WebApplication1.Repository.IRepository
{
    public interface ITokenService
    {
        string CreateToken(User_Application user, List<string> Role);
    }
}
