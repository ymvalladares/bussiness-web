using AutoMapper;
using WebApplication1.Data;
using WebApplication1.Repositories;
using WebApplication1.Repositories.IRepositories;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Repository
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly DbContext_App _db;
        private readonly IMapper _mapper;

        public UnitOfWork(DbContext_App db, IMapper mapper)
        {
            _db = db;
            _mapper = mapper;
            ApplicationUserRepository = new ApplicationUserRepository(_db);
            MessageRepository = new MessageRepository(_db, _mapper);
            FriendsRepository = new FriendsRepository(_db, _mapper);
        }

        public IApplicationUserRepository ApplicationUserRepository { get; private set; }
        public IMessageRepository MessageRepository { get; private set; }
        public IFriendsRepository FriendsRepository { get; private set; }


        public void Save()
        {
            _db.SaveChanges();
        }
    }
}
