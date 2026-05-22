using AutoMapper;
using CES.DocManager.WebApi.Models.Mes;
using CES.DocManager.WebApi.Services;
using CES.Domain.Models.Request.Mes.Contracts;
using CES.Domain.Models.Request.Mes.Organization;
using CES.Domain.Models.Response.Mes.Contracts;
using CES.Domain.Models.Response.Mes.Organizations;
using MediatR;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace CES.DocManager.WebApi.Controllers
{
  [EnableCors("MyPolicy")]
  [Route("mes/contracts/")]
  [ApiController]

    public class ContractController : ControllerBase
    {
      private readonly IMediator _mediator;

      private readonly IMapper _mapper;

      public ContractController(IMediator mediator, IMapper mapper)
      {
        _mediator = mediator;
        _mapper = mapper;
      }

      [HttpGet()]
      [Produces(typeof(GetContractsResponse))]
      public async Task<object> GetContracts(string min, string max, string? contractType, string? filter, string? searchValue)
      {
        try
        {
          return await _mediator.Send(new GetContractsRequest()
          {
            Min = DateTimeConverter.ConvertToDateTime(min, "yyyy-MM-dd HH:mm:ss"),
            Max = DateTimeConverter.ConvertToDateTime(max, "yyyy-MM-dd HH:mm:ss"),
            ContractType = (contractType ?? string.Empty).Trim(),
            Filter = (filter ?? string.Empty).Trim(),
            SearchValue = (searchValue ?? string.Empty).Trim(),
          });
        }
        catch (Exception e)
        {
          HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
          return new ErrorResponse(e.Message);
        }
      }

      [HttpGet("searchByOrganization")]
      [Produces(typeof(GetContractsByOrganizationResponse))]
      public async Task<object> GetContractsByOrganization(
        string organizationName,
        string date,
        string? street = null,
        string? houseNumber = null)
      {
        try
        {
          return await _mediator.Send(new GetContractsByOrganizationRequest()
          {
            OrganizationName = organizationName?.Trim() ?? string.Empty,
            Date = DateTimeConverter.ConvertToDateTime(date, "yyyy-MM-dd HH:mm:ss"),
            Street = street?.Trim(),
            HouseNumber = houseNumber?.Trim(),
          });
        }
        catch (Exception e)
        {
          HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
          return new ErrorResponse(e.Message);
        }
      }

      [HttpGet("{id}/print")]
      public async Task<IActionResult> PrintContract(int id)
      {
        try
        {
          var result = await _mediator.Send(new PrintContractRequest { ContractId = id });
          return File(result.FileContent, result.ContentType, result.FileName);
        }
        catch (Exception e)
        {
          return NotFound(new ErrorResponse(e.Message));
        }
      }

      [HttpPatch("{id}/printed")]
      public async Task<IActionResult> MarkContractPrinted(int id)
      {
        try
        {
          await _mediator.Send(new MarkContractPrintedRequest { ContractId = id });
          return Ok();
        }
        catch (Exception e)
        {
          return NotFound(new ErrorResponse(e.Message));
        }
      }

      [HttpPost]
      [Produces(typeof(CreateContractResponse))]
      public async Task<object> CreateContract([FromBody] ContractViewModel contract)
      {
        try
        {
          var res = await _mediator.Send(_mapper.Map<CreateContractRequest>(contract));
          HttpContext.Response.StatusCode = ((int)HttpStatusCode.Created);
          return res;
        }
        catch (Exception e)
        {
          HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
          return new ErrorResponse(e.Message);
        }
      }

      [HttpPut("{id}")]
      [Produces(typeof(UpdateContractResponse))]
      public async Task<object> UpdateContract(int id, [FromBody] ContractViewModel contract)
      {
        try
        {
          var request = _mapper.Map<UpdateContractRequest>(contract);
          request.ContractId = id;
          return await _mediator.Send(request);
        }
        catch (Exception e)
        {
          HttpContext.Response.StatusCode = ((int)HttpStatusCode.NotFound);
          return new ErrorResponse(e.Message);
        }
      }
    }
}
