using AcademiaFenix.Application;
using AcademiaFenix.Application.Students;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AcademiaFenix.API.Controllers
{
    public class StudentsController : BaseApiController
    {
        public StudentsController(IMediator mediator)
            : base(mediator) { }

        [HttpGet]
        public async Task<IActionResult> GetStudents([FromQuery] StudentParams studentParams)
        {
            var query = new List.Query { Params = studentParams };

            var result = await _mediator.Send(query);
            return HandlePagedResult(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetStudent(Guid id)
        {
            var query = new GetById.Query { Id = id };

            var result = await _mediator.Send(query);

            return HandleResult(result);
        }
    }
}
