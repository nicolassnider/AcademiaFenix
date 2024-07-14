using AcademiaFenix.Application.Interfaces;
using AcademiaFenix.Application.Students;
using AcademiaFenix.Domain;
using AcademiaFenix.Domain.Enums;
using AcademiaFenix.Persistence;
using FluentAssertions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;
using System.ComponentModel.DataAnnotations;

namespace AcademiaFenix.Test.UnitTests.Features.Students
{
    public class CreateStudentTests
    {
        [Fact]
        public async Task AddStudent_SouldReturnUnit()
        {

            var mockUserAccessor = new Mock<IUserAccessor>();
            var options = new DbContextOptionsBuilder<DataContext>()
                .UseInMemoryDatabase(databaseName: Guid.NewGuid().ToString())
                .Options;

            var context = new DataContext(options);

            var mockMediator = new Mock<IMediator>();

            var studentToAdd = new Student // Create a new Student object
            {
                Id = new Guid(),
                Name= "Test Student",
                Email = "test.student@mail.com",
                Phone = "123-456-7890",
                Address = "calle test 123",
                ColorBelt = 0,
                Gender = 'M',
                DateOfBirth = System.DateOnly.Parse("2020-07-13"),
                AdmissionDate = System.DateOnly.Parse("2024-07-13"),
                DateOfLastBeltExam = System.DateOnly.Parse("2024-07-13"),
                DateOfLastMedicExam = System.DateOnly.Parse("2024-07-13"),
            };

            var command = new Create.Command(); // Assuming you have a command to add a student
            command.Student = studentToAdd;
            var handler = new Create.Handler(context, mockUserAccessor.Object);

            // Act
            var result = await handler.Handle(command, CancellationToken.None);
            result.Should().BeOfType(typeof(Application.Core.Result<Unit>));// Assert
            // Add assertions here to check if the student was added successfully
            // For example, you can check if the student exists in the database after adding
               
        }

        [Fact]
        public async Task AddStudentWithNullDanLevel_SouldReturnMessage_When_StudentIsBlackBelt()
        {          

            var studentToAdd = new Student // Create a new Student object
            {
                Id = new Guid(),
                Name= "Test Student",
                Email = "test.student@mail.com",
                Phone = "123-456-7890",
                Address = "calle test 123",
                ColorBelt = ColorBelt.BLACK,
                Gender = 'M',
                DateOfBirth = System.DateOnly.Parse("2020-07-13"),
                AdmissionDate = System.DateOnly.Parse("2024-07-13"),
                DateOfLastBeltExam = System.DateOnly.Parse("2024-07-13"),
                DateOfLastMedicExam = System.DateOnly.Parse("2024-07-13"),
                DanLevel = null
            };

            var validator = new StudentValidator();


            // Act

            var validationResult = validator.Validate(studentToAdd);

            // Assert
            validationResult.IsValid.Should().BeFalse();
            validationResult.Errors.Should().Contain(x => x.PropertyName == nameof(Student.DanLevel));
               
        }

    }
}
