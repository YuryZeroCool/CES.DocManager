using AutoMapper;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Response.Mes;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes
{
    public class CreateOrganizationHandler : IRequestHandler<CreateOrganizationRequest, CreateOrganizationResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;
        public CreateOrganizationHandler(DocMangerContext ctx, IMapper mapper) 
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<CreateOrganizationResponse> Handle(CreateOrganizationRequest request, CancellationToken cancellationToken)
        {       
            if (request is not null)
            {
                if (request.Name is not null && request.Name.Trim() == "") throw new System.Exception("Заполните имя организации");

                var PayerAccountNumber = await _ctx.OrganizationEntities.FirstOrDefaultAsync(x => x.PayerAccountNumber == request.PayerAccountNumber, cancellationToken);
                if (PayerAccountNumber != null) throw new System.Exception("Такой УНП Существует в базе");

                var name = await _ctx.OrganizationEntities.FirstOrDefaultAsync(x => x.Name == request.Name, cancellationToken);
                if (name != null) throw new System.Exception("Такая организация существует в базе");

                var organization = await _ctx.OrganizationEntities.AddAsync(_mapper.Map<OrganizationEntity>(request), cancellationToken);
                await _ctx.SaveChangesAsync(cancellationToken);
                return await Task.FromResult(_mapper.Map<CreateOrganizationResponse>(organization.Entity));
            }

            throw new System.Exception();
        }
    }
}
