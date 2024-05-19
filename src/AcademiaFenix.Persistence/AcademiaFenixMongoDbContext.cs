using AcademiaFenix.Domain.Entities;
using MongoDB.Driver;

namespace AcademiaFenix.Persistence
{
	public class AcademiaFenixMongoDbContext : IAcademiaFenixMongoDbContext
    {
        private readonly IMongoDatabase _database;

        public AcademiaFenixMongoDbContext(IMongoClient mongoClient,string databaseName)
        {
            _database= mongoClient.GetDatabase(databaseName);
        }
        public IMongoCollection<Student> Students => _database.GetCollection<Student>("Students");
    }
}
