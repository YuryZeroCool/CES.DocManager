using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Response.MaterialReport;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CES.Domain.Handlers.MaterialReport
{
    public class EditMaterialHandler : IRequestHandler<EditMaterialRequest, EditMaterialResponse>
    {
        private readonly DocMangerContext _ctx;

        public EditMaterialHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }
        public async Task<EditMaterialResponse> Handle(EditMaterialRequest request, CancellationToken cancellationToken)
        {
            var currentMaterial = await _ctx.Parties.FirstOrDefaultAsync(x => x.Id == request.PartyId, cancellationToken);
            if (currentMaterial == null) throw new System.Exception("Упс! Что-то пошло не так");

            var material = await _ctx.Products.FindAsync(currentMaterial.ProductId);

            if (material == null) throw new System.Exception("Упс! Что-то пошло не так");

            request.EditedMaterial!.ApplyTo(material);

            await _ctx.SaveChangesAsync(cancellationToken);

            var data = await _ctx.Products.FindAsync(currentMaterial.ProductId);
            if (data == null) throw new System.Exception("Упс! Что-то пошло не так");

            return new EditMaterialResponse
            {
                NameMaterial = data.Name,
                NameParty = data.Parties?.ToList()[0].Name,
                PartyDate = (DateTime)(data.Parties.ToList()[0].PartyDate),
                Count = data.Parties.ToList()[0].Count,
                Price = data.Parties.ToList()[0].Price
            };
        }
    }
}
