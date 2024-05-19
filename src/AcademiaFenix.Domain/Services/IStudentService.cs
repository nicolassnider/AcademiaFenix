using AcademiaFenix.Domain.Constants;
using AcademiaFenix.Domain.Entities;

namespace AcademiaFenix.Domain.Services
{
    public interface IStudentService
    {
        Student CreateStudent(
            string name,
            DateTime dateOfBirth,
            TaekwondoBeltColorsEnum beltColor,
            string email,
            DateTime? lastMedicExamDate = null,
            DateTime? trainingStartDate = null
        );
    }
}
