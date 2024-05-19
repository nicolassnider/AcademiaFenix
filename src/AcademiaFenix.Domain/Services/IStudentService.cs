using AcademiaFenix.Domain.Entities;

namespace AcademiaFenix.Domain.Services
{
    public interface IStudentService
    {
        Student CreateStudent(string name, string belt);
    }
}