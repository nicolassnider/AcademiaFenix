using System;
using AcademiaFenix.Domain.Constants;
using AcademiaFenix.Domain.Entities;

namespace AcademiaFenix.Application.Dtos
{
    public class StudentDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }
        public DateTime DateOfBirth { get; set; }
        public TaekwondoBeltColorsEnum Belt { get; set; }
        public DateTime? LastMedicExamDate { get; set; }
        public DateTime? LastExamDate { get; set; }
        public DateTime TrainingStartDate { get; set; }
        public bool IsBlackBelt { get; set; }

        public StudentDto(Student student)
        {
            Id = student.Id;
            Name = student.Name;
            Email = student.Email;
            DateOfBirth = student.DateOfBirth;
            Belt = student.Belt;
            LastMedicExamDate = student.LastMedicExamDate;
            LastExamDate = student.LastExamDate;
            TrainingStartDate = student.TrainingStartDate;
            IsBlackBelt = student.IsBlackBelt;
        }

		public StudentDto() { }
    }
}