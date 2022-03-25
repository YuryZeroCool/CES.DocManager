using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CES.Domain.Models.Request.Departments;
using CES.Domain.Models.Response.Departments;
using CES.Infra;
using CES.Infra.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.Department
{
    public class GetDivisionNumberHandler : IRequestHandler<GetDivisionNumberRequest, IEnumerable<GetDivisionNumberResponse>>
    {
        private readonly DocMangerContext _context;
        private readonly IMapper _mapper;

        public GetDivisionNumberHandler(DocMangerContext context, IMapper mappper)
        {
            _context = context;
            _mapper = mappper;
        }

        public async  Task<IEnumerable<GetDivisionNumberResponse>> Handle(GetDivisionNumberRequest request, CancellationToken cancellationToken)
        {
            IEnumerable <DivisionEntity>  data= await _context.Divisions.ToListAsync();
            return    _mapper.Map<IEnumerable<GetDivisionNumberResponse>>(data);
          
        }
    }
}
