using AutoMapper;
using CES.Domain.Models.Request.Mes.Organization;
using CES.Domain.Models.Response.Mes.Organizations;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Organizations
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
            if (request is null)
            {
                throw new System.Exception("Запрос не может быть пустым");
            }

            if (request.OrganizationType == "" || !await _ctx.OrganizationTypes!.AnyAsync(x => x.Name == request.OrganizationType, cancellationToken))
            {

                throw new System.Exception("Запрос не может быть пустым");
            }


            if (string.IsNullOrWhiteSpace(request.Name))
            {
                throw new System.Exception("Заполните имя организации");
            }
            var existingName = await _ctx.OrganizationEntities!.FirstOrDefaultAsync(x => x.Name == request.Name, cancellationToken);
            if (existingName != null)
            {
                throw new System.Exception("Такая организация уже существует");
            }
            if (!string.IsNullOrWhiteSpace(request.PayerAccountNumber))
            {
                var existingPayerAccountNumber = await _ctx.OrganizationEntities!.FirstOrDefaultAsync(x => x.PayerAccountNumber == request.PayerAccountNumber, cancellationToken);
                if (existingPayerAccountNumber != null)
                {
                    throw new System.Exception("Такой УНП уже существует");
                }
            }
            var organization = _mapper.Map<OrganizationEntity>(request);
            organization.OrganizationType = await _ctx.OrganizationTypes!
                    .FirstOrDefaultAsync(x => x.Name.Trim() == request.OrganizationType.Trim(), cancellationToken);
            var addedOrganization = await _ctx.OrganizationEntities!.AddAsync(organization, cancellationToken);
            await _ctx.SaveChangesAsync(cancellationToken);
            return _mapper.Map<CreateOrganizationResponse>(addedOrganization.Entity);
        }
    }
}
