using CES.Domain.Models.Request.Report;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.FuelReport
{
    public class DeleteDivisionWorkScheduleHandler : IRequestHandler<DeleteDivisionWorkScheduleRequest,int>
    {
        private readonly DocMangerContext _ctx;

        public DeleteDivisionWorkScheduleHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<int> Handle(DeleteDivisionWorkScheduleRequest request, CancellationToken cancellationToken)
        {
            var date = _ctx.WorkCardDivisions.FirstOrDefault(p => p.Id == request.IdDivison);
            if (date == null) throw new System.Exception("Упс! Что-то пошло не так");

            _ctx.WorkCardDivisions.Remove(date);
            await _ctx.SaveChangesAsync(cancellationToken);

            return await Task.FromResult(request.IdDivison);
        }
    }
}
