using ChatApp.Hubs;
using server.Database;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSingleton(new InMemoryDB());
builder.Services.AddSignalR();

builder.Services.AddCors(options =>
{
    options.AddPolicy("App", builder =>
    {
        builder.WithOrigins("http://localhost:5173")
               .AllowAnyHeader()
               .AllowAnyMethod()
               .AllowCredentials();
    });
});


var app = builder.Build();
app.UseCors("App");
// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

   

app.UseHttpsRedirection();
app.MapHub<ChatHub>("/chat");
app.MapControllers();

app.Run();
