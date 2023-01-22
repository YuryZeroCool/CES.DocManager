using CES.Domain.Models.Request.CommonInfo;
using CES.Domain.Models.Response.CommonInfo;
using CES.Infra;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CES.Domain.Handlers.CommonInfo
{
    public class GetCommonInfoHandler : IRequestHandler<GetCommonInfoRequest, IEnumerable<GetAllCommonInfoResponse>>
    {
        private readonly DocMangerContext _ctx;
        public GetCommonInfoHandler(DocMangerContext ctx)
        {
            _ctx = ctx;
        }

        public async Task<IEnumerable<GetAllCommonInfoResponse>> Handle(GetCommonInfoRequest request, CancellationToken cancellationToken)
        {
            var returnedData = new List<GetAllCommonInfoResponse>();
            var divisions = await _ctx.Divisions.ToListAsync(cancellationToken);
            if (divisions == null) throw new System.Exception("No divisions exist");
            var cars = await _ctx. VehicleBrands
                .Include(x=>x.VehiclesModels)
                .ToListAsync(cancellationToken);

            foreach (var division in divisions)
            {
                var data = await _ctx.Divisions
                     .Include(x => x.EmployeeEntities)
                     .ThenInclude(c => c.DriverLicense)
                     .Include(x => x.EmployeeEntities)
                     .ThenInclude(c => c.MedicalCertificates)
                     .Include(c => c.NumberPlateOfCars)
                     .FirstOrDefaultAsync(x => x.Name == division.Name, cancellationToken);
                var info = new List<GetCommonInfoResponse>();

                if (data == null || data.NumberPlateOfCars == null) throw new System.Exception("Error");

                foreach (var item in data.NumberPlateOfCars)
                {
                    var carModel = cars
                        .Select(x => x.VehiclesModels
                            .FirstOrDefault(c => c.Id == item.VehicleModelId))
                        .FirstOrDefault(el => el != null );
                    info.Add(new GetCommonInfoResponse()
                    {
                        Id = item.Id,
                        GarageNumber = item.GarageNumber,
                        NumberPlateOfCar = item.Number,
                        VehicleModel = carModel?.VehicleBrand?.Name + " " + carModel?.Name
                    });
                }

                foreach (var item in data.EmployeeEntities)
                {
                    foreach (var elem in info)
                    {
                        if (elem.Id == item.CarNumberId)
                        {
                            var name = item.FirstName.Split(" ");
                            elem.Fio = item.LastName + " " + name[0][..1] + "." + name[1][..1] + ".";
                            elem.PersonnelNumber = item.PersonnelNumber;
                            if (item.DriverLicense != null && item.DriverLicense.Count != 0)
                            {
                                elem.SerialNumberOfDriverLicense = item.DriverLicense.Last().SerialNumber;
                                elem.ExpiryDateOfDriverLicense = item.DriverLicense.Last().ExpiryDate;
                                elem.IsActiveDriverLicense = !(item.DriverLicense.Last().ExpiryDate <= DateTime.Now.AddMonths(1));
                            }
                            if (item.MedicalCertificates != null && item.MedicalCertificates.Count != 0)
                            {
                                elem.SerialNumberOfMedicalCertificate = item.MedicalCertificates.Last().SerialNumber;
                                elem.IsActiveMedicalCertificate = !(item.MedicalCertificates.Last().ExpiryDate <= DateTime.Now.AddMonths(1));
                                elem.ExpiryDateOfMedicalCertificate = item.MedicalCertificates.Last().ExpiryDate;
                            }
                        }
                    }
                }
                returnedData.Add(new GetAllCommonInfoResponse()
                {
                    Id = division.Id,
                    Division = division.Name,
                    CommonInfo = info
                });
            }
            return returnedData;
        }
    }
}
