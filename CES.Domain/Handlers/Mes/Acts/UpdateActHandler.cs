using AutoMapper;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Response.Act;
using CES.Infra;
using CES.Infra.Models.Mes;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System.Text.Json;

namespace CES.Domain.Handlers.Mes.Acts
{
    public class UpdateActHandler : IRequestHandler<UpdateActRequest, Models.Response.Act.Act>
    {
        private readonly DocMangerContext _ctx;
        private readonly IMapper _mapper;

        public UpdateActHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }

        public async Task<Models.Response.Act.Act> Handle(UpdateActRequest request, CancellationToken cancellationToken)
        {
            if (_ctx?.Act is null
                || _ctx.NumberPlateOfCar is null
                || _ctx.NoteEntities is null
                || _ctx.ActTypes is null
                || _ctx.Employees is null
                || _ctx.Contracts is null
                || request.CompletedWorks is null
                || request.NotesWithoutAct is null)
            {
                throw new NotImplementedException();
            }

            var act = await _ctx.Act
                .Include(x => x.Contract)
                .ThenInclude(x => x!.Organization)
                .Include(x => x.NumberPlateOfCar)
                .Include(x => x.ActType)
                .Include(x => x.Employee)
                .FirstOrDefaultAsync(x => x.Id == request.ActId, cancellationToken)
                ?? throw new System.Exception("Акт не найден");

            var contract = await _ctx.Contracts
                .FirstOrDefaultAsync(x => x.Id == request.ContractId, cancellationToken)
                ?? throw new System.Exception("Договор не найден");

            foreach (var noteData in request.NotesWithoutAct)
            {
                var note = await _ctx.NoteEntities
                    .FirstOrDefaultAsync(x => x.Id == noteData.Id, cancellationToken);

                if (note is null)
                {
                    throw new System.Exception("Заявка не найдена");
                }

                if (note.ActId != null && note.ActId != act.Id)
                {
                    throw new System.Exception("Заявка уже привязана к другому акту");
                }
            }

            act.DateOfWorkCompletion = request.ActAdditionDate;
            act.Employee = await _ctx.Employees
                .FirstOrDefaultAsync(x => x.LastName.Trim() + " " + x.FirstName.Trim() == request.Driver, cancellationToken)
                ?? throw new System.Exception("Водитель не найден");
            act.NumberPlateOfCar = await _ctx.NumberPlateOfCar
                .FirstOrDefaultAsync(x => request.Vehicle.Trim().Contains(x!.Number!), cancellationToken)
                ?? throw new System.Exception("Машина не найдена");
            act.Total = request.TotalActSumm;
            act.Vat = request.Vat == 0 ? null : request.Vat;
            act.ActType = await _ctx.ActTypes
                .FirstOrDefaultAsync(x => x.Name.Trim() == request.ActType.Trim(), cancellationToken)
                ?? throw new System.Exception("Тип акта не найден");
            act.WorkPerformAct = JsonSerializer.Serialize(request.CompletedWorks);
            act.IsSigned = request.IsSigned;
            act.ContractId = contract.Id;

            var requestedNoteIds = request.NotesWithoutAct.Select(x => x.Id).ToHashSet();
            var currentNotes = await _ctx.NoteEntities
                .Where(x => x.ActId == act.Id)
                .ToListAsync(cancellationToken);

            foreach (var note in currentNotes.Where(x => !requestedNoteIds.Contains(x.Id)))
            {
                note.ActId = null;
                _ctx.NoteEntities.Update(note);
            }

            foreach (var noteData in request.NotesWithoutAct)
            {
                var note = await _ctx.NoteEntities
                    .FirstOrDefaultAsync(x => x.Id == noteData.Id, cancellationToken);

                if (note is not null && note.ActId != act.Id)
                {
                    note.ActId = act.Id;
                    _ctx.NoteEntities.Update(note);
                }
            }

            _ctx.Act.Update(act);
            await _ctx.SaveChangesAsync(cancellationToken);

            var updatedAct = await _ctx.Act
                .Include(x => x.Contract)
                .ThenInclude(x => x!.Organization)
                .Include(x => x.NumberPlateOfCar)
                .Include(x => x.ActType)
                .Include(x => x.Employee)
                .FirstAsync(x => x.Id == act.Id, cancellationToken);

            var actModel = _mapper.Map<Models.Response.Act.Act>(updatedAct);
            actModel.Works = JsonSerializer.Deserialize<List<CES.Domain.Models.Request.Mes.Acts.Work>>(updatedAct.WorkPerformAct!);

            var notes = await _ctx.NoteEntities
                .Include(p => p.Street)
                .Include(p => p.HouseNumber)
                .Include(p => p.Entrance)
                .Where(x => x.ActId == updatedAct.Id)
                .ToListAsync(cancellationToken);

            actModel.NotesWithoutAct = _mapper.Map<List<FullNoteData>>(notes);

            return actModel;
        }
    }
}
