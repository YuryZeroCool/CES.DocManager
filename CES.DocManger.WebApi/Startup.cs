using CES.DocManger.WebApi.Security;
using CES.Domain.Handlers.Employees;
using CES.Infra;
using CES.InfraSecurity.Models;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using MediatR;
using System;
using System.Linq;
using System.Text;
using CES.Domain.Interfaces;
using CES.Domain.Security;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.OAuth;
using Microsoft.AspNetCore.CookiePolicy;

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
            services.AddTransient<JwtGeneratorAccessToken>();
            services.AddTransient<JwtGeneratorRefreshToken>();

            var assemblies = AppDomain.CurrentDomain.GetAssemblies().Where(x => x.FullName.Contains("CES")).ToArray();
            services.AddAutoMapper(assemblies);

            services.AddAuthentication(auth =>
                {
                    auth.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>                     //JwtBearerDefaults.AuthenticationScheme,
                {

                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateLifetime = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,

                        ValidIssuer = AuthOptions.ISSUER,
                        ValidAudience = AuthOptions.AUDIENCE,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["TokenKey:TOKEN_KEY_AccessToken"]))
                    };
                });

            // string baseUrl = "https://del24061988-001-site1.btempurl.com";
            string baseUrl = "https://localhost:3000";
            services.AddCors(options =>
            {
                options.AddPolicy("MyPolicy",
                    builder =>
                    {
                        builder.WithOrigins(baseUrl)
                                .WithMethods("PUT", "POST", "DELETE", "GET").AllowAnyMethod().AllowAnyHeader().AllowCredentials();
                    });
            });
            services.AddDbContext<DocMangerContext>(options =>
            options.UseSqlServer(Configuration.GetConnectionString("CONNECTION_STRING")));
            //services.AddDbContext<DocMangerContex>();

            services.AddDbContext<DocMangerIdentityDbContext>(options =>
              options.UseSqlServer(Configuration.GetConnectionString("CONNECTION_STRING")));

      
            services.AddIdentity<UserEntity, AppRoleEntity>(options => {

                options.User.RequireUniqueEmail = false;
              

            })
                .AddEntityFrameworkStores<DocMangerIdentityDbContext>()
                .AddRoleManager<RoleManager<AppRoleEntity>>()

             .AddDefaultTokenProviders()
                .AddSignInManager<SignInManager<UserEntity>>();

            // services.GetRequiredService<UserManager<User>>();
            services.AddMediatR(typeof ( GetIsPersonalNumberHandler));

            services.AddSwaggerGen();
            services.Configure<CookieAuthenticationOptions>(x => x.ExpireTimeSpan = TimeSpan.FromDays(2));
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });
       
  
            services.AddControllers();
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

            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

           app.UseCors();

            app.UseAuthentication();
            app.UseAuthorization();
        
            app.UseHttpsRedirection();
           

            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "API V1");
            });
            
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
