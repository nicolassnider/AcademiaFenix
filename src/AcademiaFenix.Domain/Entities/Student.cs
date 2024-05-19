using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace AcademiaFenix.Domain.Entities
{
	public class Student
    {
        [BsonId]
        [BsonRepresentation(BsonType.String)]
        public Guid Id { get; set; }

        [BsonElement("name")]
        public string Name { get; set; }

        [BsonElement("belt")]
        public string Belt {  get; set; }

        public Student(string name, string belt)
        {
            Id = Guid.NewGuid();
            Name = name;
            Belt = belt;
        }

    }
}
