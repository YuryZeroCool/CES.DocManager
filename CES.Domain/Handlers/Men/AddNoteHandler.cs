using AutoMapper;
using CES.Domain.Models.Request.Men;
using CES.Infra;
using CES.Infra.Models.Men;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CES.Domain.Handlers.Men
{
    public class AddNoteHandlerIRequestHandler : IRequestHandler<AddNoteRequest>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper;   
        public AddNoteHandlerIRequestHandler(DocMangerContext ctx, IMapper mapper) 
        {
            _ctx = ctx;

            _mapper = mapper;
        }
        public async Task<Unit> Handle(AddNoteRequest request, CancellationToken cancellationToken)
        {
            var note = _mapper.Map<NoteEntity>(request);
            note.Id = 0;
            await _ctx.NoteEntities.AddAsync(note);
            await _ctx.SaveChangesAsync();

            return await Task.FromResult(new Unit());
        }
    }
}
