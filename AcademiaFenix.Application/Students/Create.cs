using AcademiaFenix.Application.Core;
using AcademiaFenix.Application.Interfaces;
using AcademiaFenix.Domain;
using AcademiaFenix.Persistence;
using FluentValidation;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Metadata.Ecma335;
using System.Text;
using System.Threading.Tasks;

namespace AcademiaFenix.Application.Students
{
    public class Create
    {
        public class Command : IRequest<Result<Unit>> {
            public Student Student { get; set; }
            }

        public class CommandValidator : AbstractValidator<Command>
        {
            public CommandValidator()
            {
                RuleFor(x=>x.Student).SetValidator(new StudentValidator());
            }
        }

        public class Handler : IRequestHandler<Command,Result<Unit>>{

            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;

            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
            {
                /**
                 * {
  "name": "Test Student",
  "email": "test.student@mail.com",
  "phone": "123-456-7890",
  "address": "calle test 123",
  "colorBelt": 0,
  "gender": "M",
  "dateOfBirth": "2020-07-13",
  "admissionDate": "2024-07-13",
  "dateOfLastBeltExam": "2024-07-13",
  "dateOfLastMedicExam": "2024-07-13",
  
  
}*/
                 
                var student = new Student
                {
                    Id = Guid.NewGuid(),
                    Name = request.Student.Name,
                    Email = request.Student.Email,
                    Phone = request.Student.Phone,
                    Address = request.Student.Address,
                    ColorBelt = request.Student.ColorBelt,
                    DanLevel = request.Student.DanLevel,
                    AdmissionDate = request.Student.AdmissionDate,
                    CreatedBy = _userAccessor.GetUserName(),
                    DateOfBirth = request.Student.DateOfBirth,
                    DateOfLastBeltExam = request.Student.DateOfLastBeltExam,
                    DateOfLastMedicExam = request.Student.DateOfLastMedicExam,
                    UpdatedBy = string.Empty
                };

                _context.Students.Add(student);

                var result = await _context.SaveChangesAsync() > 0;

                if (!result) return Result<Unit>.Failure("Failed to create student");
                return Result<Unit>.Success(Unit.Value);
            }
        }

    }
}
