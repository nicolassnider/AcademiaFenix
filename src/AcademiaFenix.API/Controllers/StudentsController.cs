using AcademiaFenix.Application.Students;
using MediatR;
using Microsoft.AspNetCore.Mvc;

namespace AcademiaFenix.API.Controllers
{
    public class StudentsController : BaseApiController
    {
        public StudentsController(IMediator mediator) : base(mediator)
        {

        }

        [HttpGet]
        public async Task<IActionResult> GetStudents([FromQuery] StudentParams studentParams)
        {
            var query = new List.Query { Params = studentParams };

            var result = await _mediator.Send(query);
            return HandlePagedResult(result);
        }
    }
}
