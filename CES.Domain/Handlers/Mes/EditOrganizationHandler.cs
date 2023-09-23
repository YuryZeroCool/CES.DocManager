using AutoMapper;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Response.Mes;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;

namespace CES.Domain.Handlers.Mes
{
    public class EditOrganizationHandler : IRequestHandler<EditOrganizationRequest, EditOrganizationResponse>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;

       public EditOrganizationHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<EditOrganizationResponse> Handle(EditOrganizationRequest request, CancellationToken cancellationToken)
        {
            var organization = _mapper.Map<OrganizationEntity>(request)
                ?? throw new System.Exception("Упс! Что-то пошло не так");

            if ( _ctx.OrganizationEntities.Any(x=> x.Id== request.Id))
            {
                var res = _ctx.OrganizationEntities.Update(organization);
                await _ctx.SaveChangesAsync(cancellationToken);

                return await Task.FromResult(_mapper.Map<EditOrganizationResponse>(res.Entity)
                    ?? throw new System.Exception("Такой организации не найдено"));
            }
            throw new System.Exception("Упс! Что-то пошло не так");
        }
    }
}
