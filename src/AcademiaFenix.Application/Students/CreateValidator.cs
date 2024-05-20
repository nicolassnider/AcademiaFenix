using AcademiaFenix.Application.Dtos;
using FluentValidation;

namespace AcademiaFenix.Application;

public class CreateValidator : AbstractValidator<StudentDto>
{
    public CreateValidator()
    {
        RuleFor(student => student.Name).NotEmpty();
        RuleFor(student => student.Email).NotEmpty().EmailAddress();
        RuleFor(student => student.DateOfBirth)
            .NotEmpty()
            .LessThanOrEqualTo(DateTime.Now.AddYears(-5));
        RuleFor(student => student.Belt).NotEmpty().IsInEnum();
    }
}
