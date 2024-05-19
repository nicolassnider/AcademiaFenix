using AcademiaFenix.Domain.Constants;
using AcademiaFenix.Domain.Entities;
using AcademiaFenix.Domain.Exceptions;

namespace AcademiaFenix.Domain.Services
{
    public class StudentService : IStudentService
    {
        public Student CreateStudent(
            string name,
            DateTime dateOfBirth,
            TaekwondoBeltColorsEnum beltColor,
            string email,
            DateTime? lastMedicExamDate = null,
            DateTime? trainingStartDate = null
        )
        {
            if (name == null)
                throw new StudentNameMissingException(name);

            return new Student(
                name,
                email,
                dateOfBirth,
                beltColor,
                lastMedicExamDate,
                trainingStartDate
            );
        }
    }
}
