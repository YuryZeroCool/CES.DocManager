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
using System.Linq;
using CES.Domain.Exception;
using System;
using Microsoft.AspNetCore.Http;
using AutoMapper;
using System.Net;

namespace CES.DocManger.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IMediator _mediator;

        private readonly IMapper _mapper;

        public AccountController(IMediator mediator, IMapper mapper)
        {
            _mediator = mediator;
            _mapper = mapper;
        }
        [HttpPost("/login")]
        public async Task<LoginViewModel> LoginAsync(LoginRequest query)
        {
            try
            {
                var result=  await _mediator.Send(query);
                HttpContext.Response.Cookies.Append("accessToken", result.AccessToken, new CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddMinutes(5),
                    HttpOnly = true,
                    Secure = true,
                    Domain= "localhost",
                    Path = "/login"
                }); 
                HttpContext.Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddDays(30),
                    HttpOnly = true,
                    Secure = true,
                    Domain = "localhost",
                    Path = "/login"

                });

                return _mapper.Map<LoginResponse,LoginViewModel>(result);
            }
               
            catch (RestException e)
            {
                HttpContext.Response.Cookies.Delete("accessToken");
                HttpContext.Response.Cookies.Delete("refreshToken");
                HttpContext.Response.StatusCode = ((int)e.Code);
                return new LoginViewModel 
                { 
                    Email =null,
                    UserName = null,
                    Error= "Неверный пароль или логин"
                };
            }
        }

        [HttpPost("/updateTokenPair")]
        public async Task<TokenPairResponse> UpdateTokenPairAsync(UpDateTokenRequest token)
        {
            try
            {
              
                token.RefreshToken = HttpContext.Request.Headers["Authorization"].ToString();

                if (token.RefreshToken == null)  throw new TokenException(HttpStatusCode.ServiceUnavailable, "Token null");
                token.RefreshToken = token.RefreshToken.Substring(7);

               var result = await _mediator.Send(token);

                HttpContext.Response.Cookies.Append("accessToken", result.AccessToken, new CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddMinutes(5),
                    HttpOnly = true
                });
                HttpContext.Response.Cookies.Append("refreshToken", result.RefreshToken, new CookieOptions
                {
                    Expires = DateTimeOffset.Now.AddDays(30),
                    HttpOnly = true
                });
                return result;
            }

            catch (TokenException e)
            {
                HttpContext.Response.Cookies.Delete("accessToken");
                HttpContext.Response.Cookies.Delete("refreshToken");

                HttpContext.Response.StatusCode = ((int)e.Code);
                return new TokenPairResponse()
                {
                    RefreshToken = e.Errors.ToString()
                };
            }

            catch(System.ArgumentOutOfRangeException)
            {
                HttpContext.Response.Cookies.Delete("accessToken");
                HttpContext.Response.Cookies.Delete("refreshToken");

                HttpContext.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                return new TokenPairResponse()
                {
                    RefreshToken =  "Header doesn`t have property Authorization"
                };
            }
        }

        [HttpPost("/revoke - token")]
        public async Task RevokeTokenAsync()
        {
        
        }

        [HttpPost("/registration")]
        public async Task<string> RegistrationAsync(UserModelRequest query)
        {
            return await _mediator.Send(query);
        }

        //https://stackoverflow.com/questions/53659247/using-aspnetusertokens-table-to-store-refresh-token-in-asp-net-core-web-api

        [Authorize(AuthenticationSchemes =
            JwtBearerDefaults.AuthenticationScheme, Roles = "admin")]
        [HttpPost("/role")]
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
