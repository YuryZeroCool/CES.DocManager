using CES.DocManger.WebApi.Security;
using CES.Domain.Handlers.Employees;
using CES.Infra;
using CES.InfraSecurity.Models;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using MediatR;
using System;
using System.Linq;

namespace CES.DocManger.WebApi
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {
            var assemblies = AppDomain.CurrentDomain.GetAssemblies().Where(x => x.FullName.Contains("CES")).ToArray();
            services.AddAutoMapper(assemblies);
            //string baseUrl = "http://del24061988-001-site1.btempurl.com";
            //string baseUrl = "http://localhost:3000";
            //services.AddCors(options =>
            //{
            //    options.AddPolicy(name: "MyPolicy",
            //        builder =>
            //        {
            //            builder.WithOrigins(baseUrl)
            //                    .WithMethods("PUT", "POST", "DELETE", "GET").AllowAnyMethod().AllowAnyHeader();
            //        });
            //});
            services.AddDbContext<DocMangerContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("CONNECTION_STRING")));
            //services.AddDbContext<DocMangerContex>();

            services.AddDbContext<DocMangerIdentityDbContext>(options =>
              options.UseSqlServer(Configuration.GetConnectionString("CONNECTION_STRING")));

            services.AddIdentity<IdentityUser, IdentityRole>()
                .AddEntityFrameworkStores<DocMangerIdentityDbContext>();

            //services.AddScoped<JwtGenerator>();
            //services.GetRequiredService<UserManager<User>>()

            services.AddMediatR(typeof ( GetIsPersonalNumberHandler));

            services.AddControllersWithViews();
            services.AddSwaggerGen();
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
     

            //services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            //    .AddJwtBearer(opt =>
            //    {
            //        opt.RequireHttpsMetadata = false;
            //        opt.TokenValidationParameters = new TokenValidationParameters
            //        {
            //            ValidateIssuer = false,
            //            // строка, представляющая издателя
            //            ValidIssuer = AuthOptions.ISSUER,

            //            // будет ли валидироваться потребитель токена
            //            ValidateAudience = false,
            //            // установка потребителя токена
            //            ValidAudience = AuthOptions.AUDIENCE,
            //            // будет ли валидироваться время существования
            //            ValidateLifetime = true,

            //            // установка ключа безопасности
            //            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey:TOKEN_KEY"])),
            //            // валидация ключа безопасности
            //            ValidateIssuerSigningKey = false,
            //        };
            //    });
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
           
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
            });

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            //app.UseAuthentication();
            //app.UseAuthorization(); 
          


            app.UseCors();
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute("default", "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";
                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });
        }
    }
}
