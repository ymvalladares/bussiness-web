
using WebApplication1.Repositories.IRepositories;

namespace WebApplication1.Repository.IRepository
{
    public interface IUnitOfWork
    {
       IApplicationUserRepository ApplicationUserRepository { get; }

       IMessageRepository MessageRepository { get; }

       IFriendsRepository FriendsRepository { get; }

       void Save();
    }
}
