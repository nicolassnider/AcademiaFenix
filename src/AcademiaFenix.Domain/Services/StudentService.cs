using AcademiaFenix.Domain.Entities;
using AcademiaFenix.Domain.Exceptions;

namespace AcademiaFenix.Domain.Services
{
	public class StudentService : IStudentService
    {
        public Student CreateStudent(string name, string belt)
        {
            if (name == null || belt == null) throw new StudentNameMissingException(name);

            return new Student(name, belt);
        }
    }
}
