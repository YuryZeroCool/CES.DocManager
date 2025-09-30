using CES.Domain.Models.Request.Mes.Acts;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.Mes.Acts
{
    public class CreateActHandler : IRequestHandler<CreateActRequest, string>
    {
        private readonly DocMangerContext _ctx;

        public CreateActHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<string> Handle(CreateActRequest request, CancellationToken cancellationToken)
        {
            if (_ctx is not null
                && _ctx.Act is not null
                && request.CompletedWorks is not null
                && _ctx.NumberPlateOfCar is not null
                && _ctx.OrganizationEntities is not null
                && request.NotesWithoutAct is not null
                && _ctx.NoteEntities is not null
                && request.ActType is not null
                && _ctx.ActTypes is not null
                && _ctx.Employees is not null)
            {
                foreach (var notesWithoutAct in request.NotesWithoutAct)
                {
                    if (await _ctx.NoteEntities.AnyAsync(x => x.Id == notesWithoutAct.Id && x.Act != null, cancellationToken))
                    {
                        throw new System.Exception("Упс! Что-то пошло не так");
                    }
                }
                var entityAct = await _ctx.Act.AddAsync(new ActEntity()
                {
                    ActDateOfCreation = DateTime.Now,
                    DateOfWorkCompletion = request.ActAdditionDate,
                    Employee = await _ctx.Employees
                    .FirstOrDefaultAsync(x => x.LastName.Trim() + " " + x.FirstName.Trim() == request.Driver, cancellationToken)
                    ?? throw new System.Exception("Упс! Что-то пошло не так"),
                    Organization = await _ctx.OrganizationEntities
                    .FirstOrDefaultAsync(x => x.Name.Trim() == request.Organization.Trim(), cancellationToken)
                    ?? throw new System.Exception("Упс! Что-то пошло не так"),
                    NumberPlateOfCar = await _ctx.NumberPlateOfCar
                    .FirstOrDefaultAsync(x => request.Vehicle.Trim().Contains(x!.Number!), cancellationToken)
                    ?? throw new System.Exception("Упс! Что-то пошло не так"),
                    Total = request.TotalActSumm,
                    Vat = request.Vat == 0 ? null : request.Vat,
                    ActType = await _ctx.ActTypes
                    .FirstOrDefaultAsync(x => x.Name.Trim() == request.ActType.Trim(), cancellationToken)
                    ?? throw new System.Exception("Упс! Что-то пошло не так"),
                    WorkPerformAct = JsonSerializer.Serialize(request.CompletedWorks)
                    ?? throw new System.Exception("Упс! Что-то пошло не так"),
                    IsSigned = request.IsSigned,
                }, cancellationToken);
                await _ctx.SaveChangesAsync(cancellationToken);
                foreach (var notesWithoutAct in request.NotesWithoutAct)
                {
                    var note = await _ctx.NoteEntities.FirstOrDefaultAsync(x => x.Id == notesWithoutAct.Id, cancellationToken);
                    if (note is not null)
                    {
                        if (note.ActId != null)
                        {
                            _ctx.Act.Remove(entityAct.Entity);
                        }
                        else
                        {
                            note.Act = entityAct.Entity;
                            _ctx.NoteEntities.Update(note);
                        }
                    }
                }
                await _ctx.SaveChangesAsync(cancellationToken);
                return await Task.FromResult("ok");
            }
            throw new NotImplementedException();
        }
    }
}