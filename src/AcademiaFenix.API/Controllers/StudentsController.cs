using AcademiaFenix.Application;
using AcademiaFenix.Application.Dtos;
using AcademiaFenix.Application.Students;
using AcademiaFenix.Domain.Constants;
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

        [HttpGet("{id:guid}")]
        public async Task<IActionResult> GetStudent(Guid id)
        {
            var query = new GetById.Query { Id = id };

            var result = await _mediator.Send(query);

            return HandleResult(result);
        }

        [HttpPost]
        public async Task<IActionResult> CreateStudent([FromBody] Create.Command command)
        {
            return HandleResult(await _mediator.Send(command));
        }

        [HttpPut("{id:guid}")]
        public async Task<IActionResult> UpdateStudent(
            [FromRoute] Guid id,
            [FromBody] StudentDto studentDto
        )
        {
            if (id != studentDto.Id)
            {
                return BadRequest("The provided ID does not match the ID in the request body.");
            }

            var existingStudent = await _mediator.Send(new GetById.Query { Id = id });

            if (existingStudent == null)
            {
                return NotFound();
            }

            existingStudent.Value.Name = studentDto.Name ?? existingStudent.Value.Name;
            existingStudent.Value.Email = studentDto.Email ?? existingStudent.Value.Email;
            existingStudent.Value.DateOfBirth = studentDto.DateOfBirth.Equals(
                existingStudent.Value.DateOfBirth
            )
                ? studentDto.DateOfBirth
                : existingStudent.Value.DateOfBirth;
            if (studentDto.Belt != null)
            {
                existingStudent.Value.Belt = studentDto.Belt;
            }
            existingStudent.Value.LastMedicExamDate =
                studentDto.LastMedicExamDate ?? existingStudent.Value.LastMedicExamDate;
            existingStudent.Value.LastExamDate =
                studentDto.LastExamDate ?? existingStudent.Value.LastExamDate;
            existingStudent.Value.TrainingStartDate =
                studentDto.TrainingStartDate == DateTime.MinValue
                    ? existingStudent.Value.TrainingStartDate
                    : studentDto.TrainingStartDate;

            var result = await _mediator.Send(
                new Update.Command { StudentDto = existingStudent.Value }
            );
            return HandleResult(result);
        }
    }
}
