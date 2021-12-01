//using AutoMapper;
//using CES.DocManger.WebApi.Security;
//using CES.InfraSecurity.Models;
//using Microsoft.AspNetCore.Cors;
//using Microsoft.AspNetCore.Identity;
//using Microsoft.AspNetCore.Mvc;
//using System;
//using System.Threading.Tasks;

//namespace CES.DocManger.WebApi.Controllers
//{
//    [EnableCors("MyPolicy")]
//    [Route("api/[controller]")]
//    [ApiController]
//    public class AccountController : Controller
//    {

//        private readonly IMapper _mapper;

//        private readonly DocMangerIdentityDbContext _docMangerContex;

//        private readonly JwtGenerator _jwt;

//        private readonly SignInManager<IdentityUser> _signInManager;

//        private readonly UserManager<IdentityUser> _userManager;

//        private readonly IServiceProvider _provider;

//        public AccountController(DocMangerIdentityDbContext context, IMapper mapper, 
//            JwtGenerator jwt, UserManager<IdentityUser> userManager, SignInManager<IdentityUser> signInManager, 
//            IServiceProvider provider)
//        {
//            _mapper = mapper;
//            _docMangerContex = context;
//            _jwt = jwt;
//            _userManager = userManager;
//            _signInManager = signInManager;
//            _provider = provider;
//        }
//        [HttpPost("login")]
//        public async Task<User> LoginAsync(LoginQuery query)
//        {
//            var user = await _userManager.FindByEmailAsync(query.Email);
//            var result = await _signInManager.CheckPasswordSignInAsync(user, query.Password, false);
//            if (result.Succeeded)
//            {
//                return new User
//                {
//                    // DisplayName = user.DisplayName,
//                    Token = _jwt.CreateToken(),
//                    UserName = user.UserName,
//                    Image = null
//                };
//            }
//            throw new Exception();
//        }
//        [HttpGet]
//        public async  Task GetAllDivisions()
//        {
//                    await ServiceCollection.EnsureSeeeData(_provider, _userManager);
          
//        }
//    }
//}
