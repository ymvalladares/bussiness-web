using WebApplication1.Data;
using WebApplication1.Entitys;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Repository
{
    public class ApplicationUserRepository : Repository<User_Application>, IApplicationUserRepository
    {
        private readonly DbContext_App _db;

        public ApplicationUserRepository(DbContext_App db) : base(db)
        {
            _db = db;
        }

        public void Update(User_Application user)
        {
            _db.Update(user);
        }
    }
}
