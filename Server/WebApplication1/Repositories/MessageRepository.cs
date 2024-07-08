using AutoMapper;
using Microsoft.EntityFrameworkCore;
using WebApplication1.Data;
using WebApplication1.Entitys;
using WebApplication1.ModelDTO;
using WebApplication1.Repository.IRepository;

namespace WebApplication1.Repository
{
    public class MessageRepository : Repository<Messages>, IMessageRepository
    {
        private readonly DbContext_App _db;
        private readonly IMapper _mapper;

        public MessageRepository(DbContext_App db, IMapper mapper) : base(db)
        {
            _db = db;
            _mapper = mapper;
        }

        public void Update(Messages messages)
        {
            _db.Update(messages);
        }

    }
}
