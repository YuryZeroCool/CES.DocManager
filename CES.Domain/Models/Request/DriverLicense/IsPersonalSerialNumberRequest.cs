using MediatR;

namespace CES.Domain.Models.Request.DriverLicense
{
    public class  IsPersonalSerialNumberRequest : IRequest<bool>
    {
        public  string SerialNumber { get; set; }
    }
}
