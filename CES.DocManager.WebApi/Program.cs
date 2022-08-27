using System.Text;
using CES.Domain.Handlers.Employees;
using CES.Domain.Security;
using CES.Infra;
using CES.InfraSecurity;
using CES.InfraSecurity.Models;
using MediatR;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.


builder.Services.AddTransient<JwtGeneratorAccessToken>();
builder.Services.AddTransient<JwtGeneratorRefreshToken>();


var assemblies = AppDomain.CurrentDomain.GetAssemblies().Where(x => x.FullName.Contains("CES")).ToArray();
builder.Services.AddAutoMapper(assemblies);


builder.Services.AddAuthentication(auth =>
    {
        auth.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.RequireHttpsMetadata = false;
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidIssuer = AuthOptions.ISSUER,

            ValidateAudience = true,
            ValidAudience = AuthOptions.AUDIENCE,
            ValidateLifetime = true,
            LifetimeValidator = AuthOptions.CustomLifetimeValidator,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["TokenKey:TOKEN_KEY"])),
            ValidateIssuerSigningKey = true
        };
        options.Events = new JwtBearerEvents
        {
            OnMessageReceived = context =>
            {
                context.Token = context.Request.Cookies["refreshToken"];
                return System.Threading.Tasks.Task.CompletedTask;
            }
        };
    });

string baseUrl = "https://localhost:3000";
builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy",
        builder =>
        {
            builder.WithOrigins(baseUrl)
                .WithMethods("PUT", "POST", "DELETE", "GET").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
        });
});
builder.Services.AddDbContext<DocMangerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CONNECTION_STRING")));

builder.Services.AddDbContext<DocMangerIdentityDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CONNECTION_STRING")));

builder.Services.AddIdentity<UserEntity, AppRoleEntity>(options => {
        options.User.RequireUniqueEmail = false;
    })
    .AddEntityFrameworkStores<DocMangerIdentityDbContext>()
    .AddRoleManager<RoleManager<AppRoleEntity>>()
    .AddDefaultTokenProviders()
    .AddSignInManager<SignInManager<UserEntity>>();
builder.Services.AddMediatR(typeof(GetIsPersonalNumberHandler));


//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.Configure<CookieAuthenticationOptions>(x => x.ExpireTimeSpan = TimeSpan.FromDays(2)); 
builder.Services.AddControllers();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(c =>
    {
        c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
    });
}

app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
app.UseRouting();
app.UseHttpsRedirection();

app.UseCors();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
});
//app.MapControllers();
app.Run();
