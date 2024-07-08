using AcademiaFenix.API.Extensions;
using AcademiaFenix.API.Middlewares;

using AcademiaFenix.Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.EntityFrameworkCore;
using AcademiaFenix.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Add authorization services
builder.Services.AddAuthorization();

// Add controller services
builder.Services.AddControllers(opt =>
{
    var policy = new AuthorizationPolicyBuilder()
    .RequireAuthenticatedUser()
    .Build();
    opt.Filters.Add(new AuthorizeFilter(policy));
});

// Add customized services
builder.Services.AddApplicationServices(builder.Configuration);
builder.Services.AddIdentityServices(builder.Configuration);


var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseMiddleware<ExceptionMiddleware>();

if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseRouting();

app.UseCors("CorsPolicy");

app.UseAuthorization();

app.UseDefaultFiles();
app.UseStaticFiles();

// Map controller routes
using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try
{
    // Apply database migrations
    var context = services.GetRequiredService<DataContext>();
    var userManager = services.GetRequiredService<UserManager<AppUser>>();
    await context.Database.MigrateAsync();
    await Seed.SeedData(context, userManager);
}
catch (Exception)
{
    // Log migration exceptions
    var logger = services.GetRequiredService<ILogger<Program>>();
    logger.LogError("An error occurred during migration");
}

app.Run();
