﻿using AutoMapper;
using CES.Domain.Handlers.Comparers;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Response.Mes;
using CES.Infra;
using MediatR;

namespace CES.Domain.Handlers.Mes
{
    public class GetAllNotesHandler : IRequestHandler<GetAllNotesRequest, List<GetAllNotesResponse>>
    {
        private readonly DocMangerContext _ctx;

        private readonly IMapper _mapper; 
        public GetAllNotesHandler(DocMangerContext ctx, IMapper mapper)
        {
            _ctx = ctx;
            _mapper = mapper;
        }
        public async Task<List<GetAllNotesResponse>> Handle(GetAllNotesRequest request, CancellationToken cancellationToken)
        {
            var comparer = new DateComparer();

            var res = _ctx.NoteEntities
               .AsEnumerable()
               .Where(x => x.Address == null)
               .OrderByDescending(p => p, comparer)
               .ToList();

            return res == null
                ? throw new System.Exception("Error")
                : await Task.FromResult(res.Select(p => _mapper.Map<GetAllNotesResponse>(p)).ToList());
        }
    }
}