using WebApplication1.Entitys;

namespace WebApplication1.Repository.IRepository
{
    public interface IApplicationUserRepository : IRepository<User_Application>
    {
        void Update(User_Application user);
    }
}
