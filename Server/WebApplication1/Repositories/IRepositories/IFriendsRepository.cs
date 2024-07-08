using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Repositories.IRepositories
{
    public interface IFriendsRepository : IRepository<Friends>
    {
        void Update(Friends friends);
    }

}
