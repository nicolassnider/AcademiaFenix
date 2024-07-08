using AcademiaFenix.Domain;
using AcademiaFenix.Domain.Enums;
using Microsoft.AspNetCore.Identity;

namespace AcademiaFenix.Persistence
{
    public class Seed
    {
        public static async Task SeedData(
            DataContext context,
            UserManager<AppUser> userManager
            )
        {
            if(!userManager.Users.Any() && !context.Students.Any())
            {
                var users = new List<AppUser>
                {
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "1uO4A@example.com",
                        IsAdmin = false
                        },
                    
                    new AppUser
                    {
                        DisplayName = "Bob",
                        UserName = "bob",
                        Email = "1uO4A@example.com",
                        IsAdmin = true
                        },

                };

                foreach (var user in users)
                {
                    await userManager.CreateAsync(user, "Pa$$w0rd");
                }

                var students = new List<Student>
                {
                    new Student
                    {
                        Id = Guid.NewGuid(),
                        Name = "Alice",
                        Email = "alice@example.com",
                        Phone = "555-1234",
                        Address = "123 Main St",
                        ColorBelt = ColorBelt.BLACK,
                        Gender = 'F',
                        IsActive = true,
                        DateOfBirth = new DateOnly(1990, 1, 1),
                        AdmissionDate = DateOnly.FromDateTime(DateTime.Now),
                        DateOfLastBeltExam = new DateOnly(2021, 10, 15),
                        DateOfLastMedicExam = null,
                        DanLevel = DanLevel.I
                        },
                    new Student
                    {
                        Id = Guid.NewGuid(),
                        Name = "Bob",
                        Email = "bob@example.com",
                        Phone = "555-5678",
                        Address = "456 Elm St",
                        ColorBelt = ColorBelt.BLUE,
                        Gender = 'M',
                        IsActive = true,
                        DateOfBirth = new DateOnly(1995, 5, 10),
                        AdmissionDate = DateOnly.FromDateTime(DateTime.Now),
                        DateOfLastBeltExam = new DateOnly(2020, 8, 20),
                        DateOfLastMedicExam = new DateOnly(2021, 3, 5),
                        DanLevel = null,
                        }
                    };
                await context.Students.AddRangeAsync(students);
                await context.SaveChangesAsync();
                }
            } 
        } 
    }
