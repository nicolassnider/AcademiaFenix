using AcademiaFenix.Application.Core;
using AcademiaFenix.Application.Students;
using AcademiaFenix.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace AcademiaFenix.API.Controllers
{
    [AllowAnonymous]
    public class StudentsController:BaseApiController
    {
        [HttpGet]
        public async Task<ActionResult<List<Student>>> GetStudents([FromQuery]StudentParams param)
        {
            return HandlePagedResult(await Mediator.Send(new List.Query{Params = param}));
        }

    }
}
