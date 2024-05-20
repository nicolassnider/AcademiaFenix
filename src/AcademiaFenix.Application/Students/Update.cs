using AcademiaFenix.Application.Core;
using AcademiaFenix.Application.Dtos;
using AcademiaFenix.Domain.Entities;
using AcademiaFenix.Persistence;
using AutoMapper;
using FluentValidation;
using MediatR;
using MongoDB.Driver;

namespace AcademiaFenix.Application;

public class Update
{
    public record Command : IRequest<Result<StudentDto>>
    {
        public StudentDto StudentDto { get; init; }
    }

    public class CommandValidator : AbstractValidator<Command>
    {
        public CommandValidator()
        {
            RuleFor(x => x.StudentDto.Id).NotEmpty();
            RuleFor(x => x.StudentDto).SetValidator(new UpdateValidator());
        }
    }

    public class Handler : IRequestHandler<Command, Result<StudentDto>>
    {
        private readonly IAcademiaFenixMongoDbContext _context;
        private readonly IMapper _mapper;

        public Handler(IAcademiaFenixMongoDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<StudentDto>> Handle(
            Command request,
            CancellationToken cancellationToken
        )
        {
            try
            {
                var student = await _context
                    .Students.Find(x => x.Id == request.StudentDto.Id)
                    .FirstOrDefaultAsync(cancellationToken);
                if (student == null)
                {
                    return Result<StudentDto>.Failure("Student not found");
                }

                var updatedStudent = _mapper.Map(request.StudentDto, student);
                await _context.Students.UpdateOneAsync(
                    filter: g => g.Id == request.StudentDto.Id,
                    update: Builders<Student>.Update.Set(g => g.Name, updatedStudent.Name),
                    options: new UpdateOptions { IsUpsert = true },
                    cancellationToken: cancellationToken
                );

                return Result<StudentDto>.Success(_mapper.Map<StudentDto>(updatedStudent));
            }
            catch (Exception ex)
            {
                return Result<StudentDto>.Failure("Error occurred while updating student");
            }
        }
    }
}
