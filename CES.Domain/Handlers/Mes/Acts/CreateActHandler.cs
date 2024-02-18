using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Act;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Mes.Acts
{
    public class CreateActHandler : IRequestHandler<CreateActRequest, CreateActResponse>
    {
        private readonly DocMangerContext _ctx;

        private int _id = 0;

        private ActEntity _act;

        public CreateActHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<CreateActResponse> Handle(CreateActRequest request, CancellationToken cancellationToken)
        {
            if (_ctx is not null
                && _ctx.Act is not null
                && request.CompletedWorks is not null
                && _ctx.WorkPerformsAct is not null
                && _ctx.WorkNameInAct is not null
                && _ctx.PricesOfWorkInAct is not null
                && _ctx.NumberPlateOfCar is not null
                && _ctx.OrganizationEntities is not null
                && request.NotesWithoutAct is not null
                && _ctx.NoteEntities is not null
                && request.ActType is not null
                && _ctx.ActTypes is not null
                && _ctx.Employees is not null)
            {
                foreach (var completedWork in request.CompletedWorks)
                {
                    if (_ctx.PricesOfWorkInAct is not null)
                    {
                        if (completedWork.Price != 0 && !_ctx.PricesOfWorkInAct.Any(x =>
                        x.Price == completedWork.Price))
                        {
                            await _ctx.PricesOfWorkInAct.AddAsync(new Infra.Models.Mes.PriceOfWorkInActEntity()
                            {
                                Price = completedWork.Price,
                            }, cancellationToken);
                            await _ctx.SaveChangesAsync(cancellationToken);
                        }
                    }

                    if (_ctx.Units is not null)
                    {
                        if (completedWork.Unit is not null && !_ctx.Units.Any(x =>
                        x.Name == completedWork.Unit))
                        {
                            await _ctx.Units.AddAsync(new Infra.Models.MaterialReport.UnitEntity()
                            {
                                Name = completedWork.Unit,
                            }, cancellationToken);
                            await _ctx.SaveChangesAsync(cancellationToken);
                        }
                    }

                    if (decimal.TryParse(completedWork.Count.Replace(".", ","), out var count))
                    {
                        if (count != 0)
                        {
                            var workPerformsActName = await _ctx.WorkPerformsAct
                                                        .Include(x => x.Name)
                                                        .Include(y => y.Price)
                                                        .FirstOrDefaultAsync(x => x.Name.Name == completedWork.Name.Trim()
                                                        && x.Price.Price == completedWork.Price
                                                        && x.Count == count, cancellationToken);

                            if (!await _ctx.WorkPerformsAct.AnyAsync(x => x == workPerformsActName, cancellationToken))
                            {
                                await _ctx.WorkPerformsAct.AddAsync(new WorkPerformActEntity()
                                {
                                    Name = await _ctx.WorkNameInAct
                                    .FirstOrDefaultAsync(x => x.Name == completedWork.Name.Trim(), cancellationToken)
                                        ?? throw new System.Exception("Error"),
                                    Price = await _ctx.PricesOfWorkInAct!
                                    .FirstOrDefaultAsync(x => x.Price == completedWork.Price, cancellationToken)
                                        ?? throw new System.Exception("Error"),
                                    Count = count
                                }, cancellationToken);
                                await _ctx.SaveChangesAsync(cancellationToken);
                            }
                        }
                    }
                };

                var entityAct = await _ctx.Act.AddAsync(new ActEntity()
                {
                    ActDateOfCreation = DateTime.Now,
                    DateOfWorkCompletion = request.ActAdditionDate,
                    Employee = await _ctx.Employees
                    .FirstOrDefaultAsync(x => x.LastName+" "+x.FirstName == request.Driver, cancellationToken)
                    ?? throw new System.Exception("Error"),
                    Organization = await _ctx.OrganizationEntities
                    .FirstOrDefaultAsync(x => x.Name == request.Organization.Trim(), cancellationToken)
                    ?? throw new System.Exception("Error"),
                    NumberPlateOfCar = await _ctx.NumberPlateOfCar
                    .FirstOrDefaultAsync(x => request.Vehicle.Trim().Contains(x!.Number!),cancellationToken)
                    ?? throw new System.Exception("Error"),
                    Total = request.TotalActSumm,
                    Vat = request.Vat == 0 ? null : request.Vat,
                    ActType = await _ctx.ActTypes
                    .FirstOrDefaultAsync(x =>x.Name == request.ActType.Trim(),cancellationToken)
                    ?? throw new System.Exception("Error"),
                }, cancellationToken);

                await _ctx.SaveChangesAsync(cancellationToken);
                _id = entityAct.Entity.Id;

                foreach (var completedWork in request.CompletedWorks)
                {
                    if (completedWork.Count != "0")
                    {
                        var workNameInAct = await _ctx.WorkNameInAct
                            .FirstOrDefaultAsync(x => x.Name == completedWork.Name, cancellationToken);
                        if (workNameInAct is not null)
                        {
                            if (decimal.TryParse(completedWork.Count.Replace(".", ","), out var count))
                            {
                                var work = await _ctx.WorkPerformsAct.FirstOrDefaultAsync(x =>
                                x.Name == workNameInAct &&
                                x.Count == count &&
                                x.Price.Price == completedWork.Price,
                                cancellationToken);
                                if (_id != 0)
                                {
                                    _act = await _ctx.Act.FirstOrDefaultAsync(x => x.Id == _id, cancellationToken) 
                                        ?? throw new System.Exception("Error");
                                }
                                if (_act is not null && work is not null)
                                {
                                    work.Acts.Add(_act);
                                    _ctx.WorkPerformsAct.Update(work);
                                    await _ctx.SaveChangesAsync(cancellationToken);
                                }
                            }
                        }
                    }
                }
                foreach (var notesWithoutAct in request.NotesWithoutAct)
                {
                    var note = await _ctx.NoteEntities.FirstOrDefaultAsync(x => x.Id == notesWithoutAct.Id, cancellationToken);
                    if (note is not null)
                    {
                        if (note.ActId != null)
                        {
                            _ctx.Act.Remove(_act);
                            await _ctx.SaveChangesAsync();
                            throw new System.Exception("Error");
                        }
                        note.Act = _act;
                        _ctx.NoteEntities.Update(note);
                    }
                }
                await _ctx.SaveChangesAsync(cancellationToken);
                return await Task.FromResult(new CreateActResponse());
            }
            throw new NotImplementedException();
        }
    }
}
