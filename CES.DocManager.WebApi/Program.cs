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
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddTransient<JwtGeneratorAccessToken>();
builder.Services.AddTransient<JwtGeneratorRefreshToken>();


var assemblies = AppDomain.CurrentDomain.GetAssemblies().Where(x => x.FullName!.Contains("CES")).ToArray();
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
                if (context.Request.Cookies.TryGetValue("refreshToken", out var refreshToken)
                    && !string.IsNullOrEmpty(refreshToken))
                {
                    context.Token = refreshToken;
                }

                return System.Threading.Tasks.Task.CompletedTask;
            }
        };
    });

string[] paramHeader = { "X-Total-Count", "X-Total-Sum", "Content-Disposition" };
var siteDomain = builder.Configuration["Site:Domain"];
var allowedOrigins = new List<string>
{
    "https://localhost:3000",
    "http://localhost:3000"
};
if (!string.IsNullOrWhiteSpace(siteDomain))
{
    allowedOrigins.Add($"https://{siteDomain}");
}

builder.Services.AddCors(options =>
{
    options.AddPolicy("MyPolicy",
        policy =>
        {
            policy.WithOrigins(allowedOrigins.ToArray())
                .AllowAnyMethod()
                .AllowAnyHeader()
                .AllowCredentials()
                .WithExposedHeaders(paramHeader);
        });
});

if (builder.Environment.IsDevelopment())
{
    builder.Services.AddDbContext<DocMangerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CONNECTION_STRING_DEVELOPMENT")));

    builder.Services.AddDbContext<DocMangerIdentityDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("CONNECTION_STRING_DEVELOPMENT")));
}
else
{
    builder.Services.AddDbContext<DocMangerContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("CONNECTION_STRING_PRODUCTION")));

    builder.Services.AddDbContext<DocMangerIdentityDbContext>(options =>
        options.UseSqlServer(builder.Configuration.GetConnectionString("CONNECTION_STRING_PRODUCTION")));
}


builder.Services.AddIdentity<UserEntity, AppRoleEntity>(options =>
{
    options.User.RequireUniqueEmail = false;
})
    .AddEntityFrameworkStores<DocMangerIdentityDbContext>()
    .AddRoleManager<RoleManager<AppRoleEntity>>()
    .AddDefaultTokenProviders()
    .AddSignInManager<SignInManager<UserEntity>>();
builder.Services.AddMediatR(cfg => cfg.RegisterServicesFromAssembly(typeof(GetIsPersonalNumberHandler).Assembly));


//// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
//builder.Services.AddEndpointsApiExplorer();
//builder.Services.AddSwaggerGen();
builder.Services.Configure<CookieAuthenticationOptions>(x => x.ExpireTimeSpan = TimeSpan.FromDays(2));
builder.Services.AddControllers()
    .AddNewtonsoftJson();
//builder.Services.AddSpaStaticFiles(opt => opt.RootPath = "ClientApp/build");

var app = builder.Build();

// Configure the HTTP request pipeline.
//if (app.Environment.IsDevelopment())
//{
//    app.UseSwagger();
//    //app.UseSwaggerUI(c =>
//    //{
//    //    c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
//    //});
//}
app.UseRouting();
app.UseStaticFiles();
app.UseAuthentication();
app.UseAuthorization();
//app.UseHttpsRedirection();

app.UseCors();
app.UseEndpoints(endpoints =>
{
    endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
});
app.MapFallbackToFile("index.html");

app.Run();
