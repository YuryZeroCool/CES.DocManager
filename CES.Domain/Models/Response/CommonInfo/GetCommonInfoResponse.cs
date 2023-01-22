namespace CES.Domain.Models.Response.CommonInfo
{
    public class GetCommonInfoResponse
    {
        public int Id { get; set; }

        public int GarageNumber { get; set; }

        public string? VehicleModel { get; set; }

        public string? NumberPlateOfCar { get; set; }

        public string? Fio { get; set; }

        public int PersonnelNumber { get; set; }

        public string? SerialNumberOfDriverLicense { get; set; }

        public DateTime ExpiryDateOfDriverLicense { get; set; }

        public bool IsActiveDriverLicense { get; set; }


        public string? SerialNumberOfMedicalCertificate { get; set; }

        public DateTime ExpiryDateOfMedicalCertificate { get; set; }

        public bool IsActiveMedicalCertificate { get; set; }
    }
}
