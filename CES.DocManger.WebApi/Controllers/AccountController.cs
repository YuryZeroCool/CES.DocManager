using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CES.Domain.Security.User.Login;
using CES.Domain.Security.User.Registration;
using CES.Domain.Security.User.Roles;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using CES.DocManger.WebApi.Models;
using CES.Domain.Security.User.UpDateToken;
using CES.Domain.Exception;
using System;
using Microsoft.AspNetCore.Http;
using AutoMapper;
using System.Net;
using CES.Domain.Security.User.Logout;

namespace CES.DocManger.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("account/")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        private readonly int lifeTimeToken = 2;

        public AccountController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        [HttpPost("login")]
        [Produces(typeof(LoginViewModel))]
        public async Task<object> LoginAsync(LoginRequest query)
        {
            try
            {
                var result =  await _mediator.Send(query);
                HttpContext.Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddDays(lifeTimeToken),
                    HttpOnly = true,
                    Secure = true,
                    Domain = "localhost",
                    Path = "/account/"
                });
                return _mapper.Map<LoginResponse,LoginViewModel>(result);
            }
               
            catch (RestException e)
            {
                HttpContext.Response.Cookies.Delete("refreshToken");
                HttpContext.Response.StatusCode = ((int)e.Code);
                return new
                {
                    Error = "Неверный пароль или логин"
                };
            }
            catch(Exception)
            {
                HttpContext.Response.StatusCode = 500;
                return new
                {
                    Error = "Произошла ошибка на сервере, авторизоваться позже"
                };
            }
        }

        [Authorize(AuthenticationSchemes =
        JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("updateTokenPair")]
        [Produces(typeof(string))]
        public async Task<object> UpdateTokenPairAsync([FromBody] string email)
        {
            try
            {
                var token = HttpContext.Request.Cookies["refreshToken"];

                if (token == null)  throw new TokenException(HttpStatusCode.ServiceUnavailable, "Токен не передан");

               var result = await _mediator.Send(new UpDateTokenRequest() 
               {
                   EmailAddress = email, 
                   RefreshToken = token
               });

                HttpContext.Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddDays(lifeTimeToken),
                    HttpOnly = true,
                    Secure = true,
                    Domain = "localhost",
                    Path = "/account/"
                });
                return result.AccessToken;
            }

            catch (TokenException e)
            {
                HttpContext.Response.Cookies.Delete("refreshToken");

                HttpContext.Response.StatusCode = ((int)e.Code);
                return new
                {
                    Error = e.Errors.ToString()
                };
            }
            catch(Microsoft.Data.SqlClient.SqlException)
            {
                HttpContext.Response.Cookies.Delete("refreshToken");
                HttpContext.Response.StatusCode = 500;
                return new 
                {
                    Error = "Sql server не доступен"
                };

            }
        }

        [Authorize(AuthenticationSchemes =
        JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("logout")]
        public async Task LogoutAsync([FromBody] string email)
        {
            try
            {
                var token = HttpContext.Request.Cookies["refreshToken"];
                if (token == null) throw new RestException(HttpStatusCode.Unauthorized);

                var model = new LogoutRequest
                {
                    EmailAddress = email,
                };
                await _mediator.Send(model);
                HttpContext.Response.Cookies.Delete("refreshToken", new CookieOptions
                {
                    Domain = "localhost",
                    Path = "/account/"
                });
                HttpContext.Response.StatusCode = 200;
            }
            catch (RestException e)
            {
                HttpContext.Response.StatusCode = ((int)e.Code);
                HttpContext.Response.Cookies.Delete("refreshToken");
            }
        }

        [HttpPost("registration")]
        public async Task<string> RegistrationAsync(UserModelRequest query)
        {
            return await _mediator.Send(query);
        }

        //https://stackoverflow.com/questions/53659247/using-aspnetusertokens-table-to-store-refresh-token-in-asp-net-core-web-api

        [Authorize(AuthenticationSchemes =
            JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("role")]
        public async Task<string> CreateRoleAsync([FromBody]RoleViewModel query)
        {

            return await _mediator.Send(new AddRoleRequest{ Name =query.Name});
        }

        private string ipAddress()
        {
            if (Request.Headers.ContainsKey("X-Forwarded-For"))
                return Request.Headers["X-Forwarded-For"];
            else
                return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        }
    }
}
