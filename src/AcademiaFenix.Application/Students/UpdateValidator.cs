using AcademiaFenix.Application.Dtos;
using FluentValidation;

namespace AcademiaFenix.Application;

public class UpdateValidator:AbstractValidator<StudentDto>
{

	public UpdateValidator(){
		RuleFor(student => student.Name).NotEmpty();
		RuleFor(student => student.Email).NotEmpty().EmailAddress();
		RuleFor(student => student.DateOfBirth).NotEmpty().LessThanOrEqualTo(DateTime.Now.AddYears(-5));
		RuleFor(student => student.Belt).NotEmpty().IsInEnum();
		RuleFor(student => student.LastMedicExamDate).LessThanOrEqualTo(DateTime.Now);
		RuleFor(student => student.TrainingStartDate).LessThanOrEqualTo(DateTime.Now);
		RuleFor(student => student.LastExamDate).LessThanOrEqualTo(DateTime.Now);
	}

}
