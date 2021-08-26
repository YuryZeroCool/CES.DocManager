using AutoMapper;
using CES.DocManger.WebApi.Models.Response;
using CES.Infra;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;


namespace CES.DocManger.WebApi.Controllers
{
    [EnableCors("MyPolicy")]
    [Route("api/[controller]")]
    [ApiController]
    public class DivisionController : ControllerBase
    {
        private readonly IMapper _mapper;

        private readonly DocMangerContex _docMangerContex;

       public DivisionController(DocMangerContex context, IMapper mapper)
        {
            _mapper = mapper;
            _docMangerContex = context;
        }

        [HttpGet]
        public ICollection<DivisionViewModel> aetAllDivisions()
        {
            var data = _docMangerContex.Divisions.ToList();
            return _mapper.Map<List<DivisionViewModel>>(data);
        }
    }
}
