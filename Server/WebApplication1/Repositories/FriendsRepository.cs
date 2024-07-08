using AutoMapper;
using WebApplication1.Data;
using WebApplication1.Entitys;
using WebApplication1.Repositories.IRepositories;
using WebApplication1.Repository;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Repositories
{
    public class FriendsRepository : Repository<Friends>, IFriendsRepository
    {
        private readonly DbContext_App _db;
    private readonly IMapper _mapper;

    public FriendsRepository(DbContext_App db, IMapper mapper) : base(db)
    {
        _db = db;
        _mapper = mapper;
    }

    public void Update(Friends friends)
    {
        _db.Update(friends);
    }

}
    
}
