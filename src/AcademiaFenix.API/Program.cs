using AcademiaFenix.API.Extensions;
using AcademiaFenix.Persistence;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container
builder.Services.AddApplicationServices(builder.Configuration);


var app = builder.Build();

using var scope = app.Services.CreateScope();
var services = scope.ServiceProvider;

try{
	var context = services.GetRequiredService<IAcademiaFenixMongoDbContext>();
	await Seed.SeedData(context,services);
}
catch (Exception ex){
	var logger = services.GetRequiredService<ILogger<Program>>();
	logger.LogError(ex, "An error occurred during seeding");
}


app.UseSwagger();
app.UseSwaggerUI();

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();