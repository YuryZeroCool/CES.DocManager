using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using CES.Domain.Models.Response.Departments;
using MediatR;

namespace CES.Domain.Models.Request.Departments
{
    public class GetDivisionNumberRequest : IRequest<IEnumerable<GetDivisionNumberResponse>> { }
}
