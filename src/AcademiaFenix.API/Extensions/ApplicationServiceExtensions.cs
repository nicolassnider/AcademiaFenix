using AcademiaFenix.Application.Students;
using AcademiaFenix.Domain.Services;
using AcademiaFenix.Persistence;
using MediatR;
using Microsoft.OpenApi.Models;
using MongoDB.Driver;

namespace AcademiaFenix.API.Extensions
{
	public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration configuration)
        {
            // Retrieve MongoDb settings from configuration
            var mongoDbSettings = configuration.GetSection("MongoDbSettings");
            var connectionString = mongoDbSettings.GetValue<string>("ConnectionString");
            var databaseName = mongoDbSettings.GetValue<string>("DatabaseName");

            // Register the MongoDb client
            services.AddSingleton<IMongoClient>(new MongoClient(connectionString));

            // Register the MongoDb context
            services.AddScoped<IAcademiaFenixMongoDbContext>(sp =>
            {
                var mongoClient = sp.GetRequiredService<IMongoClient>();
                return new AcademiaFenixMongoDbContext(mongoClient, databaseName);
            });

            // Define the Swagger generator, defining one or more Swagger documents
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo { Title = "AcademiaFenix.API", Version = "v1" });
            });

            // Register Student service
            services.AddScoped<IStudentService, StudentService>();

            // TODO: Register Log service

            // Register AutoMapper service
            services.AddAutoMapper(typeof(List.Handler).Assembly);

            // Add MediatR and specify the assembly where the handlers are located
            services.AddMediatR(typeof(List.Handler).Assembly);

            // Add controllers
            services.AddControllers();			

            return services;

        }
    }
}
