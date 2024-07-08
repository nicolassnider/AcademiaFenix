using AcademiaFenix.Domain.Enums;

namespace AcademiaFenix.Application.Core
{
    public class StudentDto
    {
        public Guid Id{get;set;}
        public string Name{get;set;}
        public string Email{get;set;}
        public string Phone{get;set;}
        public string Address{get;set;}
        public ColorBelt ColorBelt { get; set; }
        public char Gender{get;set;}
        public bool IsActive{get;set;}
        public DateOnly DateOfBirth { get; set; }
        public DateOnly AdmissionDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public DateOnly? DateOfLastBeltExam { get; set; }
        public DateOnly? DateOfLastMedicExam { get; set; }
        public DanLevel? DanLevel { get; set; }
    }
}
