using AcademiaFenix.Domain.Constants;
using AcademiaFenix.Domain.Entities;
using AcademiaFenix.Domain.Services;
using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;

namespace AcademiaFenix.Persistence
{
    public class Seed
    {
        public static async Task SeedData(
            IAcademiaFenixMongoDbContext context,
            IServiceProvider serviceProvider
        )
        {
            // Create a new instance of the StudentService using dependency injection
            var studentService = serviceProvider.GetRequiredService<IStudentService>();

            // Check if there are any students in database
            var existingStudents = await context.Students.Find(_ => true).AnyAsync();

            if (!existingStudents)
            {
                // Create a list of students to seed using the StudentService
                /*
                "name",
                "dateOfBirth",
                "belt",
                "email",
                "lastMedicExamDate",
                "trainingStartDate"
                */
                var studentsToSeed = new List<Student>
                {
                    studentService.CreateStudent(
                        "John Doe",
                        GetRandomDateInPastYears(),
                        TaekwondoBeltColorsEnum.White,
                        "john.doe@example.com"
                    ),
                    studentService.CreateStudent(
                        "Jane Doe",
                        GetRandomDateInPastYears(),
                        TaekwondoBeltColorsEnum.Blue,
                        "jane.doe@example.com"
                    ),
                    studentService.CreateStudent(
                        "Will Smith",
                        GetRandomDateInPastYears(),
                        TaekwondoBeltColorsEnum.Black,
                        "will.smith@example.com"
                    ),
                    studentService.CreateStudent(
                        "Jane Smith",
                        GetRandomDateInPastYears(),
                        TaekwondoBeltColorsEnum.Red,
                        "jane.smith@example.com"
                    )
                };
                await context.Students.InsertManyAsync(studentsToSeed);
            }
        }

        public static DateTime GetRandomDateInPastYears()
        {
            var random = new Random();
            var currentYear = DateTime.Now.Year;
            var range = 20;

            var randomYear = currentYear - random.Next(range);
            var randomMonth = random.Next(1, 13);
            var randomDay = random.Next(1, DateTime.DaysInMonth(randomYear, randomMonth));

            var randomDate = new DateTime(randomYear, randomMonth, randomDay);

            return randomDate;
        }
    }
}
