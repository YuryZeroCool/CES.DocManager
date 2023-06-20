using AutoMapper;
using CES.Domain.Models;
using CES.Domain.Models.Request.Division;
using CES.Domain.Models.Request.DriverLicense;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Request.Vehicle;
using CES.Domain.Models.Response.Division;
using CES.Domain.Models.Response.Employees;
using CES.Domain.Models.Response.MaterialReport;
using CES.Domain.Models.Response.Mes;
using CES.Domain.Models.Response.Report;
using CES.Domain.Models.Response.Vehicle;
using CES.Domain.Security.Registration;
using CES.Infra.Models;
using CES.Infra.Models.Drivers;
using CES.Infra.Models.MaterialReport;
using CES.Infra.Models.Mes;
using CES.InfraSecurity.Models;
using CES.XmlFormat.Models;

namespace CES.Domain.Mapper
{
    public class ViewApiProfile : Profile
    {
        public ViewApiProfile()
        {
            //FuelWorkAccountingCard => VehicleExpenseSheetResponse
            CreateMap<FuelWorkAccountingCardEntity, GetVehicleExpenseSheetResponse>();

            //EmployeeController
            CreateMap<CreateEmployeeRequest, EmployeeEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.BthDate, opt => opt.MapFrom(src => src.DateBirth))
                .ForMember(dest => dest.DivisionNumber, opt => opt.Ignore())
                .ForMember(dest => dest.PersonnelNumber, opt => opt.MapFrom(src => src.PersonnelNumber));

            // EmployeeEntity => GetEmployeeFullNameResponse
            CreateMap<EmployeeEntity, GetEmployeesByDivisionResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));

            CreateMap<EmployeeEntity, CreateEmployeeResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.PersonnelNumber, opt => opt.MapFrom(src => src.PersonnelNumber))
                .ForMember(dest => dest.DateBirth, opt => opt.MapFrom(src => src.BthDate));

            //DriverMedicalCertificateController => DriverMedicalCertificateEntity
            CreateMap<CreateMedicalCertificateRequest, DriverMedicalCertificateEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.SerialNumber, opt => opt.MapFrom(src => src.SerialNumber))
                .ForMember(dest => dest.IssueDate, opt => opt.MapFrom(src => src.IssueDate))
                .ForMember(dest => dest.ExpiryDate, opt => opt.MapFrom(src => src.ExpiryDate))
                .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.EmployeeId))
                .ForMember(dest => dest.Employee, opt => opt.Ignore());

            //CreateDriverLicenseRequest => DriverLicenseEntity
            CreateMap<CreateDriverLicenseRequest, DriverLicenseEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.SerialNumber, opt => opt.MapFrom(src => src.SerialNumber))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.IssueDate, opt => opt.MapFrom(src => src.IssueDate))
                .ForMember(dest => dest.ExpiryDate, opt => opt.MapFrom(src => src.ExpiryDate))
                .ForMember(dest => dest.EmployeeId, opt => opt.MapFrom(src => src.EmployeeId))
                .ForMember(dest => dest.Employee, opt => opt.Ignore());

            // DivisionEntity => GetDivisionNumbersResponse
            CreateMap<DivisionEntity, GetDivisionNumbersResponse>()
                .ForMember(dest => dest.Division, opt => opt.MapFrom(src => src.Name));

            //Create User => UserEntity
            CreateMap<UserModelRequest, UserEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.EmailAddress))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.EmailAddress));

            //CreateVehicleBrandRequest => VehicleBrandEntity
            CreateMap<CreateVehicleBrandRequest, VehicleBrandEntity>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Brand));

            //VehicleBrandEntity => VehicleBrandResponse
            CreateMap<VehicleBrandEntity, GetVehicleBrandResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Brand, opt => opt.MapFrom(src => src.Name));

            //CreateMap<CreateDivisionRequest => DivisionEntity
            CreateMap<CreateDivisionRequest, DivisionEntity>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.DivisionName));

            // PartyEntity => PartyModel
            CreateMap<PartyEntity, PartyModel>()
                .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                .ForMember(dest => dest.Count, opt => opt.MapFrom(src => src.Count))
                .ForMember(dest => dest.PartyName, opt => opt.MapFrom(src => src.Name))
                .ForMember(dest => dest.PartyId, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.PartyDate, opt => opt.MapFrom(src => src.PartyDate))
                .ForMember(dest => dest.TotalSum, opt => opt.MapFrom(src => src.TotalSum));

            CreateMap<ProductGroupAccountEntity, GetAllProductsGroupAccountResponse>()
                  .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.AccountName));


            CreateMap<VehicleBrandEntity, GetAllBrandsResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.NameBrand, opt => opt.MapFrom(src => src.Name));

            CreateMap<NumberPlateOfCarEntity, GetAllNumbersPlateResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Number, opt => opt.MapFrom(src => src.Number));

            CreateMap<EnshrinedMaterialEntity, AddEnshrinedMaterialResponse>();
            CreateMap<EnshrinedMaterialEntity, EditEnshrinedMaterialResponse>();

            CreateMap<EnshrinedMaterialEntity, GetAllEnshrinedMaterialResponse>()
                 .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                 .ForMember(dest => dest.NameMaterial, opt => opt.MapFrom(src => src.NameMaterial))
                 .ForMember(dest => dest.NameParty, opt => opt.MapFrom(src => src.NameParty))
                 .ForMember(dest => dest.PartyDate, opt => opt.MapFrom(src => src.PartyDate))
                 .ForMember(dest => dest.Unit, opt => opt.MapFrom(src => src.Unit))
                 .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
                 .ForMember(dest => dest.Count, opt => opt.MapFrom(src => src.Count))
                 .ForMember(dest => dest.VehicleModel, opt => opt.MapFrom(src => src.VehicleModel))
                 .ForMember(dest => dest.VehicleBrand, opt => opt.MapFrom(src => src.VehicleBrand))
                 .ForMember(dest => dest.NumberPlateCar, opt => opt.MapFrom(src => src.NumberPlateCar));

            CreateMap<AddDecommissionedMaterial, EnshrinedMaterialEntity>();

            CreateMap<EnshrinedMaterialEntity, GetAllDecommissionedMaterialsResponse>();

            CreateMap<UsedMaterial, GetAllUsedMaterialsResponse>();

            CreateMap<AddNoteRequest, NoteEntity>();

            CreateMap<NoteEntity, GetSortedNotesResponse>();

            CreateMap<NoteEntity, GetAllNotesResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Comment, opt => opt.MapFrom(src => src.Comment))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
                .ForMember(dest => dest.IsChecked, opt => opt.MapFrom(src => src.IsChecked));

            CreateMap<CreateOrganizationRequest, OrganizationEntity>();

            CreateMap<OrganizationEntity, CreateOrganizationResponse>();

        }
    }
}
