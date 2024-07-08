using AcademiaFenix.Application.Core;
using AcademiaFenix.Application.Interfaces;
using AcademiaFenix.Persistence;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.Extensions.Logging;


namespace AcademiaFenix.Application.Students
{
    public class List
    {
        public class Query : IRequest<Result<PagedList<StudentDto>>>
        {
            public StudentParams Params {get;set; }
        }
        public class Handler : IRequestHandler<Query, Result<PagedList<StudentDto>>>
        {
            private readonly DataContext _context;
            private readonly ILogger<List> _logger;
            private readonly IMapper _mapper;
            private readonly IUserAccessor _userAccessor;

            public Handler(
                DataContext context, ILogger<List> logger, IMapper mapper, IUserAccessor userAccessor)
            {
                _context = context;
                _logger = logger;
                _mapper = mapper;
                _userAccessor = userAccessor;
            }

            public async Task<Result<PagedList<StudentDto>>> Handle(Query request, CancellationToken cancellationToken)
            {
                var query = _context.Students
                    .OrderBy(x => x.AdmissionDate)
                    .ProjectTo<StudentDto>(_mapper.ConfigurationProvider)
                    .AsQueryable();
                
                return Result<PagedList<StudentDto>>.Success(await PagedList<StudentDto>.CreateAsync(query,request.Params.PageNumber, request.Params.PageSize));
            }
        }

    }
}
