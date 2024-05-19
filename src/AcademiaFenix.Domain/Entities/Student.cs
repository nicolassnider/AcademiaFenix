using AcademiaFenix.Domain.Constants;
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

        [BsonElement("email")]
        public string Email { get; set; }

        [BsonElement("dateOfBirth")]
        public DateTime DateOfBirth { get; set; }

        [BsonElement("belt")]
        public TaekwondoBeltColorsEnum Belt { get; set; }

        [BsonElement("lastMedicExamDate")]
        public DateTime? LastMedicExamDate { get; set; }

        [BsonElement("lastExamDate")]
        public DateTime? LastExamDate { get; set; }

        [BsonElement("trainingStartDate")]
        public DateTime TrainingStartDate { get; set; }

        [BsonElement("isBlackBelt")]
        public bool IsBlackBelt { get; set; }

        public Student(
            string name,
            string email,
            DateTime dateOfBirth,
            TaekwondoBeltColorsEnum belt,
            DateTime? lastMedicExamDate = null,
            DateTime? lastExamDate = null,
            DateTime? trainingStartDate = null
        )
        {
            Id = Guid.NewGuid();
            Name = name;
            Email = email;
            DateOfBirth = dateOfBirth;
            Belt = belt;
            LastMedicExamDate = lastMedicExamDate;
            LastExamDate = lastExamDate;
            TrainingStartDate = trainingStartDate ?? DateTime.UtcNow;

            IsBlackBelt = belt == TaekwondoBeltColorsEnum.Black;
        }
    }
}