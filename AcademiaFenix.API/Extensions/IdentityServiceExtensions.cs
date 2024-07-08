using AcademiaFenix.API.Services;
using AcademiaFenix.Domain;
using AcademiaFenix.Infrastructure.Security;
using AcademiaFenix.Persistence;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.IdentityModel.Tokens;
using System.Formats.Tar;
using System.Text;

namespace AcademiaFenix.API.Extensions
{
    public static class IdentityServiceExtensions
    {
        public static IServiceCollection AddIdentityServices(
            this IServiceCollection services,
            IConfiguration config)
        {
            services.AddIdentityCore<AppUser>(opt =>
            {
                opt.Password.RequireNonAlphanumeric = false;                
                opt.Password.RequireLowercase = false;
                opt.Password.RequireUppercase = false;
                opt.Password.RequireDigit = false;
                opt.User.RequireUniqueEmail = true;
            })
                .AddEntityFrameworkStores<DataContext>();
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["TokenKey"])); // secret key
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(opt =>
                {
                    opt.TokenValidationParameters = new TokenValidationParameters{
                        ValidateIssuerSigningKey=true,
                        IssuerSigningKey=key,
                        ValidateIssuer=false,
                        ValidateAudience=false};
                    opt.Events = new JwtBearerEvents
                    {
                        OnMessageReceived = context =>
                        {
                            var accessToken = context.Request.Query["access_token"]; 
                            var path = context.HttpContext.Request.Path;
                            if(!string.IsNullOrEmpty(accessToken) && (path.StartsWithSegments("/chat")))
                            {
                                context.Token=accessToken;
                            }
                            return Task.CompletedTask;
                        }
                    };
                });

            services.AddAuthorization(opt =>
            {
                opt.AddPolicy("IsAdmin",policy =>
                {
                    policy.Requirements.Add(new IsAdminRequirement());
                });
            });
            services.AddTransient<IAuthorizationHandler,IsAdminRequirementHandler>();
            services.AddScoped<TokenService>();

            return services;
        }
    }
}
