using AcademiaFenix.Domain;
using AcademiaFenix.Domain.Enums;
using FluentValidation;

namespace AcademiaFenix.Application.Students
{
    public class StudentValidator:AbstractValidator<Student>
    {
         public StudentValidator()
            {
            // Id - No validation needed for GUID
            //
            RuleFor(s => s.Name)
                .NotEmpty()
                .Length(2, 255)
                .WithMessage("Name must be between 2 and 255 characters.");

            RuleFor(s => s.Email)
                .EmailAddress()
                .NotEmpty()
                .WithMessage("Please enter a valid email address.");

            RuleFor(s => s.Phone)
                .Matches(@"^\d{3}-\d{3}-\d{4}$") // Example phone number format (US)
                .When(s => !string.IsNullOrEmpty(s.Phone)) // Only validate if Phone is provided
                .WithMessage("Invalid phone number format. Use XXX-XXX-XXXX");

            RuleFor(s => s.Address)
                .NotEmpty()
                .Length(5, 255)
                .WithMessage("Address must be between 5 and 255 characters.");

            RuleFor(s => s.ColorBelt)
                .Must(belt => Enum.IsDefined(typeof(ColorBelt), belt))
                .WithMessage("Invalid ColorBelt value. Please choose a valid belt from the available options.");

            RuleFor(s => s.DanLevel)
                .Must(danLevel => danLevel.HasValue && Enum.IsDefined(typeof(DanLevel), danLevel.Value))
                .When(s => s.ColorBelt == ColorBelt.BLACK) //Only validate if ColorBelt is BLACK
                .WithMessage("DanLevel is required for black belt students. Please choose a valid Dan level.");

            RuleFor(s => s.DanLevel)
                .Must(danLevel => danLevel==null)
                .When(s => s.ColorBelt != ColorBelt.BLACK) //Only validate if ColorBelt is BLACK
                .WithMessage("DanLevel is not required for white belt students.");

            RuleFor(s => s.Gender)
                .NotEmpty()
                .Must(gender => gender == 'M' || gender == 'F' || gender == 'O') // Updated range to include 'O'
                .WithMessage("Gender must be either 'M', 'F', or 'O'.");

            // IsActive - No validation needed for bool

            RuleFor(s => s.DateOfBirth)
                .LessThan(DateOnly.FromDateTime(DateTime.Now))
                .WithMessage("Date of Birth cannot be in the future.")
                .Must(dateOfBirth => 
                {
                    var today = DateOnly.FromDateTime(DateTime.Now);
                    var age = today.Year - dateOfBirth.Year;
                    age -= today.Month < dateOfBirth.Month || 
                    (today.Month == dateOfBirth.Month && today.Day < dateOfBirth.Day) ? 1 : 0;
                    return age >= 3;
            })
            .WithMessage("Student must be at least 3 years old.");
            }
    }
}
