using System;
using CES.Domain.Models.Response;

namespace CES.DocManger.WebApi.Models.Response.DriverLicense
{
    public class GetDriverLicenseResponse : BaseModelDocument
    {
        public string Category { get; set; }
    }
}
