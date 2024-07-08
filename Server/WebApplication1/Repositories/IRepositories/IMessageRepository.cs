using WebApplication1.Entitys;
using WebApplication1.ModelDTO;

namespace WebApplication1.Repository.IRepository
{
    public interface IMessageRepository : IRepository<Messages>
    {
        void Update(Messages messages);
    }
}