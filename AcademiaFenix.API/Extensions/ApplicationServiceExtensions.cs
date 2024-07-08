using AcademiaFenix.Application.Core;
using AcademiaFenix.Application.Students;
using AcademiaFenix.Persistence;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using AcademiaFenix.Application.Interfaces;
using AcademiaFenix.Infrastructure.Security;

namespace AcademiaFenix.API.Extensions
{
    public static class ApplicationServiceExtensions
    {

        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config)
        {
            // Swagger configuration
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            // EF Core DataContext configuration
            // configure for sql server
            services.AddDbContext<DataContext>(opt =>
            {
                // To add migrations. 
                // dotnet ef migrations add InitialMigration --project AcademiaFenix.Persistence --startup-project AcademiaFenix.API
                opt.UseSqlServer(config.GetConnectionString("DefaultConnection"));
            });

            // CORS configuration
            services.AddCors(opt =>
            {
                opt.AddPolicy("CorsPolicy", policy =>
                {
                    policy
                    .AllowAnyHeader()
                    .AllowAnyMethod()
                    .AllowCredentials()
                    //.WithOrigins(config.GetSection("AllowedOrigins").Get<string[]>());
                    .WithOrigins("http://localhost:3000");
                    });
            });

            // MediatR configuration
            services.AddMediatR(cfg =>
            {
                cfg.RegisterServicesFromAssemblies(typeof(List.Handler).Assembly);
            });
            
            // AutoMapper configuration
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);

            // FluentValidation configuration
            services.AddFluentValidationAutoValidation();
            //services.AddValidatorsFromAssemblyContaining(Create);
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor,UserAccessor>();
            // TODO: services.AddScoped<IPhotoAccessor,PhotoAccessor>();
            // TODO:  services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddSignalR();

            return services;
        }
    }
}
