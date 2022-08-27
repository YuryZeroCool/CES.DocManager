using MediatR;

namespace CES.Domain.Models.Request.DriverLicense
{
    public class GetIsPersonalSerialNumberRequest : IRequest<bool>
    {
        public string? SerialNumber { get; set; }
    }
}
