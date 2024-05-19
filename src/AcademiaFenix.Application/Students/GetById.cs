using AcademiaFenix.Application.Core;
using AcademiaFenix.Application.Dtos;
using AcademiaFenix.Persistence;
using AutoMapper;
using MediatR;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace AcademiaFenix.Application.Students;

public class GetById
{
    public class Query : IRequest<Result<StudentDto>>
    {
        public Guid Id { get; set; }
    }

    public class Handler : IRequestHandler<Query, Result<StudentDto>>
    {
        private readonly IAcademiaFenixMongoDbContext _context;

        // TODO: add logger
        private readonly IMapper _mapper;

        public Handler(IAcademiaFenixMongoDbContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<Result<StudentDto>> Handle(
            Query request,
            CancellationToken cancellationToken
        )
        {
            try
            {
                var student = await _context
                    .Students.AsQueryable()
                    .FirstOrDefaultAsync(s => s.Id == request.Id, cancellationToken);
                if (student == null)
                {
                    return Result<StudentDto>.Failure("Student not found");
                }

                var studentDto = _mapper.Map<StudentDto>(student);

                return Result<StudentDto>.Success(studentDto);
            }
            catch (Exception ex)
            {
                return Result<StudentDto>.Failure("Error occurred while getting student");
            }
        }
    }
}
