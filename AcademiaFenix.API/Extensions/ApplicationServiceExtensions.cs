using AcademiaFenix.Application.Core;
using AcademiaFenix.Application.Interfaces;
using AcademiaFenix.Application.Students;
using AcademiaFenix.Infrastructure.Security;
using AcademiaFenix.Persistence;
using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace AcademiaFenix.API.Extensions
{
    public static class ApplicationServiceExtensions
    {
        public static IServiceCollection AddApplicationServices(
            this IServiceCollection services,
            IConfiguration config)
        {
            // EF Core DataContext configuration
            services.AddDbContext<DataContext>(opt =>
            {
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

            // Add SignalR
            services.AddSignalR();

            // Swagger configuration
            services.AddEndpointsApiExplorer();
            services.AddSwaggerGen();

            // Other configurations can go here
            services.AddAutoMapper(typeof(MappingProfiles).Assembly);
            services.AddFluentValidationAutoValidation();
            services.AddValidatorsFromAssemblyContaining<Create>();
            services.AddHttpContextAccessor();
            services.AddScoped<IUserAccessor, UserAccessor>();
            //services.AddScoped<IPhotoAccessor, PhotoAccessor>();
            //services.Configure<CloudinarySettings>(config.GetSection("Cloudinary"));
            services.AddSignalR();

            return services;
        }
    }
}