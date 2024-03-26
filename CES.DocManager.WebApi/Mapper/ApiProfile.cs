using AutoMapper;
using CES.DocManager.WebApi.Models;
using CES.DocManager.WebApi.Models.Mes;
using CES.Domain.Models.Request.DriverLicense;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Request.MaterialReport;
using CES.Domain.Models.Request.Mes;
using CES.Domain.Models.Request.Mes.Acts;
using CES.Domain.Models.Request.Mes.Notes;
using CES.Domain.Models.Request.Mes.Organization;
using CES.Domain.Models.Response.CarMechanic;
using CES.Domain.Models.Response.Division;
using CES.Domain.Models.Response.MaterialReport;
using CES.Domain.Security.Login;
using CES.Infra.Models;

namespace CES.DocManager.WebApi.Mapper
{
    public class ApiProfile : Profile
    {
        public ApiProfile()
        {
            CreateMap<GetEmployeeViewModel, GetAllInformationEmployeeRequest>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));

            CreateMap<CreateEmployeeViewModel, CreateEmployeeRequest>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.DateBirth, opt => opt.MapFrom(src => src.DateBirth))
                .ForMember(dest => dest.DivisionNumber, opt => opt.MapFrom(src => src.DivisionNumber))
                .ForMember(dest => dest.PersonnelNumber, opt => opt.MapFrom(src => src.PersonnelNumber));

            CreateMap<CreateMedicalCertificateViewModel, CreateMedicalCertificateRequest>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.SerialNumber, opt => opt.MapFrom(src => src.SerialNumber))
                .ForMember(dest => dest.IssueDate, opt => opt.MapFrom(src => src.IssueDate))
                .ForMember(dest => dest.ExpiryDate, opt => opt.MapFrom(src => src.ExpiryDate));

            CreateMap<CreateDriverLicenseViewModel, CreateDriverLicenseRequest>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.Category, opt => opt.MapFrom(src => src.Category))
                .ForMember(dest => dest.SerialNumber, opt => opt.MapFrom(src => src.SerialNumber))
                .ForMember(dest => dest.IssueDate, opt => opt.MapFrom(src => src.IssueDate))
                .ForMember(dest => dest.ExpiryDate, opt => opt.MapFrom(src => src.ExpiryDate));

            CreateMap<GetDivisionNumbersResponse, GetDivisionViewModel>()
                .ForMember(dest => dest.Name, opt => opt.MapFrom(src => src.Division));

            //Controller Account
            CreateMap<LoginResponse, LoginViewModel>()
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.Email))
                .ForMember(dest => dest.AccessToken, opt => opt.MapFrom(src => src.AccessToken));

            CreateMap<CarMechanicEntity, GetAllCarMechanicResponse>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(dest => dest.FIO, opt => opt.MapFrom(src => src.FIO));

            CreateMap<UsedMaterial, AddUsedMaterialResponse>()
             .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
             .ForMember(dest => dest.NameMaterial, opt => opt.MapFrom(src => src.NameMaterial))
             .ForMember(dest => dest.Price, opt => opt.MapFrom(src => src.Price))
             .ForMember(dest => dest.Count, opt => opt.MapFrom(src => src.Count))
             .ForMember(dest => dest.PartyDate, opt => opt.MapFrom(src => src.PartyDate))
             .ForMember(dest => dest.Unit, opt => opt.MapFrom(src => src.Unit))
             .ForMember(dest => dest.NameParty, opt => opt.MapFrom(src => src.NameParty));

            CreateMap<NoteViewModel, CreateNoteRequest>()
               .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
               .ForMember(dest => dest.Comment, opt => opt.MapFrom(src => src.Comment))
               .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
               .ForMember(dest => dest.IsChecked, opt => opt.MapFrom(src => src.IsChecked));

            CreateMap<EditExistedNoteViewModel, EditExistedNoteRequest>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.Comment, opt => opt.MapFrom(src => src.Comment))
                .ForMember(dest => dest.Date, opt => opt.MapFrom(src => src.Date))
                .ForMember(dest => dest.IsChecked, opt => opt.MapFrom(src => src.IsChecked));

            CreateMap<ContactInfoViewModel, ContactInfoModel>();

            CreateMap<OrganizationViewModel, CreateOrganizationRequest>();
            CreateMap<OrganizationViewModel, EditOrganizationRequest>();

            CreateMap<ActViewModel, CreateActRequest>();
            CreateMap<Models.Mes.Work, Domain.Models.Request.Mes.Acts.Work>();
            CreateMap<Models.Mes.FullNoteData, Domain.Models.Request.Mes.Acts.FullNoteData>();
        }
    }
}