using AcademiaFenix.Application.Core;
using AcademiaFenix.Application.Dtos;
using AcademiaFenix.Domain.Entities;
using AcademiaFenix.Persistence;
using AutoMapper;
using FluentValidation;
using MediatR;

namespace AcademiaFenix.Application;

public class Create
{
	public class Command : IRequest<Result<StudentDto>>{
		public StudentDto StudentDto { get; set; }
	}
	
	public class CommandValidator : AbstractValidator<Command>{
		public CommandValidator()
		{
			RuleFor(x => x.StudentDto).SetValidator(new CreateValidator());
		}
	}

	public class Handler : IRequestHandler<Command, Result<StudentDto>>
	{
		private readonly IAcademiaFenixMongoDbContext _context;
		private readonly IMapper _mapper;

		public Handler(IAcademiaFenixMongoDbContext context, IMapper mapper){
			_context = context;
			_mapper = mapper;
		}

		public async Task<Result<StudentDto>> Handle(Command request, CancellationToken cancellationToken)
		{
			try{
				var student = _mapper.Map<Student>(request.StudentDto);
				await _context.Students.InsertOneAsync(student,cancellationToken);
				var studentDto = _mapper.Map<StudentDto>(student);
				return Result<StudentDto>.Success(studentDto);
			}
			catch (Exception ex)
			{
				return Result<StudentDto>.Failure("Error occurred while creating student");
			}			
		}
	}
}

