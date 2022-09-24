using AutoMapper;
using CES.DocManager.WebApi.Models;
using CES.Domain.Models.Request.DriverLicense;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Division;
using CES.Domain.Security.Login;

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
                .ForMember(dest => dest.DivisionNumber, opt => opt.MapFrom(src => src.Division))
                .ForMember(dest => dest.PersonnelNumber, opt => opt.MapFrom(src => src.PersonNumber));

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
        }
    }

}