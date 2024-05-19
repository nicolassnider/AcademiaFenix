using AcademiaFenix.Domain.Entities;
using MongoDB.Driver;

namespace AcademiaFenix.Persistence
{
	public class Seed
    {
        public static async Task SeedData(IAcademiaFenixMongoDbContext context)
        {
            // Check if there are any students in database
            var existingStudents = await context.Students.Find(_=>true).AnyAsync();

            if (!existingStudents)
            {
                // Create a list of students to seed
                var studentsToSeed = new List<Student>
                {
                    new Student("Jhon Doe", "White"),

                };
            }
        }
    }
}
