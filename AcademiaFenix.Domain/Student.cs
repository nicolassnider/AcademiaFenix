using AcademiaFenix.Domain.Enums;

namespace AcademiaFenix.Domain
{
    public class Student
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
        public string? CreatedBy { get; set; }
        public string? UpdatedBy { get; set; }
        public DateOnly CreatedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);
        public DateOnly UpdatedDate { get; set; } = DateOnly.FromDateTime(DateTime.Now);

        
    }
}
