using AcademiaFenix.Domain.Entities;
using MongoDB.Driver;

namespace AcademiaFenix.Persistence
{
	public interface IAcademiaFenixMongoDbContext
    {
        IMongoCollection<Student> Students { get; }        
    }
}
