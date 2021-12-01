using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CES.Domain.Models.Request.Employee
{
    public class GetIsValidNumberNumberRequest : IRequest<bool>
    {
        public int Id { get; set; }
    }
}
