using AutoMapper;
using CES.Domain.Exception;
using CES.Domain.Models.Request.Division;
using CES.Domain.Models.Response.Division;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using System.Net;

namespace CES.Domain.Handlers.Division
{
    public class CreateDivisionHandler : IRequestHandler<CreateDivisionRequest, GetDivisionNumbersResponse>
    {
        private readonly DocMangerContext _docMangerContext;
        private readonly IMapper _mapper;

        public CreateDivisionHandler(IMapper mapper, DocMangerContext ctx )
        {
            _mapper = mapper;
            _docMangerContext = ctx;
        }
        public async Task<GetDivisionNumbersResponse> Handle(CreateDivisionRequest request, CancellationToken cancellationToken)
        {
            if (request.DivisionName == "") throw new RestException(HttpStatusCode.BadRequest, "Переданы некорректные даные");

            if (_docMangerContext.Divisions.Any(p => p.Name == request.DivisionName))
                throw new RestException(HttpStatusCode.OK, "Такая смена существует");

            _docMangerContext.Divisions.Add(_mapper.Map<CreateDivisionRequest, DivisionEntity>(request));
            await _docMangerContext.SaveChangesAsync(cancellationToken);

            var division = _docMangerContext.Divisions.FirstOrDefault(p => p.Name == request.DivisionName);
            if (division == null) throw new System.Exception("Error");
            return await Task.FromResult(_mapper.Map<DivisionEntity, GetDivisionNumbersResponse>(division));
        }
    }
}
