﻿using AutoMapper;
using CES.Domain.Models.Request.Mes.Organization;
using CES.Domain.Models.Response.Mes.Organizations;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Organizations
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


            if (_ctx is not null && _ctx.OrganizationEntities is not null)
            {
                if (await _ctx.OrganizationTypes!.AnyAsync(x => x.Name == request.Name, cancellationToken) || await _ctx.OrganizationEntities.AnyAsync(x => x.Id == request.Id, cancellationToken))
                {
                    organization.OrganizationType = await _ctx.OrganizationTypes!.FirstOrDefaultAsync(x => x.Name == request.OrganizationType, cancellationToken);
                    var res = _ctx.OrganizationEntities.Update(organization);
                    await _ctx.SaveChangesAsync(cancellationToken);

                    return await Task.FromResult(_mapper.Map<EditOrganizationResponse>(res.Entity)
                        ?? throw new System.Exception("Такой организации не найдено"));
                }
            }
            throw new System.Exception("Упс! Что-то пошло не так");
        }
    }
}
