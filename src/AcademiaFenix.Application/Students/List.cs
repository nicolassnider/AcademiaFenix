using AcademiaFenix.Application.Core;
using AcademiaFenix.Application.Dtos;
using AcademiaFenix.Persistence;
using AutoMapper;
using MediatR;
using MongoDB.Driver;
using MongoDB.Driver.Linq;

namespace AcademiaFenix.Application.Students
{
	public class List
    {
        public class Query:IRequest<Result<PagedList<StudentDto>>>
        {
            public StudentParams Params { get; set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<StudentDto>>>
        {
            private readonly IAcademiaFenixMongoDbContext _context;
            // TODO: add logger
            private readonly IMapper _mapper;

            public Handler(
                IAcademiaFenixMongoDbContext context,
                IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<Result<PagedList<StudentDto>>> Handle(
                Query request,
                CancellationToken cancellationToken)
            {
                try
                {
                    var queryable = _context.Students.AsQueryable();

                    // Apply any filters tothe query

                    // Map the query result to StudentDto objects
                    var studentDtos = _mapper.ProjectTo<StudentDto>(queryable);

                    // Get Total count of items async
                    var totalCount = await queryable.CountAsync(cancellationToken);

                    // Get paginated items async
                    var items = await ((IMongoQueryable<StudentDto>)studentDtos)
                        .Skip((request.Params.PageNumber - 1) * request.Params.PageSize)
                        .Take(request.Params.PageSize)
                        .ToListAsync(cancellationToken);

                    // Create a paged list
                    var pagedList = new PagedList<StudentDto>(items, totalCount, request.Params.PageNumber, request.Params.PageSize);

                    return Result<PagedList<StudentDto>>.Success(pagedList);

                        
                }
                catch (Exception ex)
                {

                    return Result<PagedList<StudentDto>>.Failure("Error occurred while listing students");
                }
            }

        }
    }
}
