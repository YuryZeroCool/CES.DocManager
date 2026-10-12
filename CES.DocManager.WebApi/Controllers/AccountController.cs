using AutoMapper;
using CES.DocManager.WebApi.Models;
using CES.Domain.Exception;
using CES.Domain.Security.Login;
using CES.Domain.Security.Logout;
using CES.Domain.Security.Registration;
using CES.Domain.Security.Roles;
using CES.Domain.Security.UpDateToken;
using MediatR;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("account/")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        private const int LifeTimeToken = 2;

        private readonly string? _siteDomain;

        public AccountController(IMediator mediator, IMapper mapper, IConfiguration configuration)
        {
            _mediator = mediator;
            _mapper = mapper;
            _siteDomain = configuration["Site:Domain"];
        }

        [HttpPost("login")]
        [Produces(typeof(LoginViewModel))]
        public async Task<object> LoginAsync(LoginRequest query)
        {
            try
            {
                var result = await _mediator.Send(query);

                if (result.RefreshToken == null) throw new Exception("Упс! Что-то пошло не так");

                HttpContext.Response.Cookies.Append("refreshToken", result.RefreshToken, CreateRefreshCookieOptions());
                return _mapper.Map<LoginResponse, LoginViewModel>(result);
            }

            catch (RestException e)
            {
                DeleteRefreshCookie();
                HttpContext.Response.StatusCode = ((int)e.Code);
                return new
                {
                    Error = "Неверный пароль или логин"
                };
            }
            catch (Exception)
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
        public async Task<object> UpdateTokenPair([FromBody] string email)
        {
            try
            {
                var token = HttpContext.Request.Cookies["refreshToken"] ?? throw new TokenException(HttpStatusCode.ServiceUnavailable, "Токен не передан");
                var result = await _mediator.Send(new UpDateTokenRequest()
                {
                    EmailAddress = email,
                    RefreshToken = token
                });

                if (result.AccessToken == null) throw new SystemException("Упс! Что-то пошло не так");

                if (result.RefreshToken == null) throw new SystemException("Упс! Что-то пошло не так");

                HttpContext.Response.Cookies.Append("refreshToken", result.RefreshToken, CreateRefreshCookieOptions());
                return result.AccessToken;
            }

            catch (TokenException e)
            {
                DeleteRefreshCookie();

                HttpContext.Response.StatusCode = ((int)e.Code);
                return new
                {
                    Error = e.Errors.ToString()
                };
            }
            catch (Microsoft.Data.SqlClient.SqlException)
            {
                DeleteRefreshCookie();
                HttpContext.Response.StatusCode = 500;
                return new
                {
                    Error = "Sql server не доступен"
                };
            }
        }

        [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
        [HttpPost("logout")]
        public async Task LogoutAsync([FromBody] string email)
        {
            try
            {
                var model = new LogoutRequest
                {
                    EmailAddress = email,
                };
                await _mediator.Send(model);
                DeleteRefreshCookie();
                HttpContext.Response.StatusCode = 200;
            }
            catch (RestException e)
            {
                HttpContext.Response.StatusCode = ((int)e.Code);
                DeleteRefreshCookie();
            }
        }

        private CookieOptions CreateRefreshCookieOptions()
        {
            var isHttps = HttpContext.Request.IsHttps;
            var host = HttpContext.Request.Host.Host;
            var isSiteHost = !string.IsNullOrWhiteSpace(_siteDomain)
                && (host.Equals(_siteDomain, StringComparison.OrdinalIgnoreCase)
                    || host.EndsWith("." + _siteDomain, StringComparison.OrdinalIgnoreCase));

            return new CookieOptions
            {
                Expires = DateTimeOffset.Now.AddDays(LifeTimeToken),
                HttpOnly = true,
                Secure = isHttps,
                SameSite = isHttps ? SameSiteMode.None : SameSiteMode.Lax,
                Path = "/account/",
                Domain = isSiteHost ? _siteDomain : null
            };
        }

        private void DeleteRefreshCookie()
        {
            var options = CreateRefreshCookieOptions();
            options.Expires = null;
            HttpContext.Response.Cookies.Delete("refreshToken", options);
        }

        [HttpPost("registration")]
        public async Task<string> RegistrationAsync(UserModelRequest query)
        {
            return await _mediator.Send(query);
        }

        //https://stackoverflow.com/questions/53659247/using-aspnetusertokens-table-to-store-refresh-token-in-asp-net-core-web-api

        //[Authorize(AuthenticationSchemes =
        //    JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("role")]
        public async Task<string> CreateRoleAsync([FromBody] RoleViewModel query)
        {
            return await _mediator.Send(new AddRoleRequest { Name = query.Name });
        }

        //private string ipAddress()
        //{
        //    if (Request.Headers.ContainsKey("X-Forwarded-For"))
        //        return Request.Headers["X-Forwarded-For"];
        //    else
        //        return HttpContext.Connection.RemoteIpAddress.MapToIPv4().ToString();
        //}
    }
}
