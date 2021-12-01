using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using CES.DocManger.WebApi.Models;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using MediatR;

namespace CES.DocManger.WebApi.Controllers
{
   // [EnableCors("MyPolicy")]

    [Route("api/[controller]")]
    [ApiController]
    public class DriverMedicalCertificateController : ControllerBase
    {
        private readonly IMediator _mediator;
        private readonly IMapper _mapper;

        public DriverMedicalCertificateController(IMediator mediator, IMapper mapper)
        {
            _mapper = mapper;
            _mediator = mediator;
        }
        [HttpPost]
        public async Task Post([FromBody] CreateMedicalCertificateViewModel model)
        {
            await _mediator.Send(_mapper.Map<CreateMedicalCertificateViewModel, CreateMedicalCertificateRequest>(model));
        }
    }
}
