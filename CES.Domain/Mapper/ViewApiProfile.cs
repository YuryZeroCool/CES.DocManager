using System.Collections.Generic;
using AutoMapper;
using CES.Domain.Models.Request.DriverLicense;
using CES.Domain.Models.Request.DriverMedicalCertificate;
using CES.Domain.Models.Request.Employee;
using CES.Domain.Models.Response.Departments;
using CES.Domain.Models.Response.Employees;
using CES.Domain.Models.Response.Report;
using CES.Domain.Security.User.Registration;
using CES.Domain.Security.User.UpDateToken;
using CES.Infra.Models;
using CES.InfraSecurity.Models;
using CES.XmlFormat.Models;

namespace CES.Domain.Mapper
{
    public class ViewApiProfile : Profile
    {
        public ViewApiProfile()
        {
            // ReportController

            //FuelWorkAccountingCard => VehicleExpenseSheetResponse
            CreateMap<FuelWorkAccountingCard,VehicleExpenseSheetResponse > ();
                //.ForMember(dest=> dest., opt=> opt.MapFrom(src=>src[2]));
             

            //EmployeeController
            CreateMap<CreateEmployeeRequest, EmployeeEntity>()
               .ForMember(dest => dest.Id, opt => opt.Ignore())
               .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
               .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
               .ForMember(dest => dest.BthDate, opt => opt.MapFrom(src => src.DateBirth))
               .ForMember(dest => dest.DivisionNumber, opt => opt.Ignore())
               .ForMember(dest => dest.PersonnelNumber, opt => opt.MapFrom(src => src.PersonnelNumber));

            // EmployeeEntity => GetEmployeeFullNameResponse
            CreateMap<EmployeeEntity, GetEmployeeFullNameResponse>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => src.Id))
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));

            //DriverMedicalCertificateController 
            CreateMap<CreateMedicalCertificateRequest, DriverMedicalCertificateEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.SerialNumber, opt =>opt.MapFrom(src =>src.SerialNumber))
                .ForMember(dest => dest.IssueDate, opt => opt.MapFrom(src =>src.IssueDate))
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

            CreateMap<Division,GetDivisionNumberResponse>()
                .ForMember(dest => dest.DivisionNumber,opt=>opt.MapFrom(src=>src.Name));
            
            //Create User 
            CreateMap<UserModelRequest, UserEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.DisplayName, opt => opt.MapFrom(src => src.EmailAddress))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.UserName, opt => opt.MapFrom(src => src.UserName))
                .ForMember(dest => dest.PhoneNumber, opt => opt.MapFrom(src => src.PhoneNumber))
                .ForMember(dest => dest.Email, opt => opt.MapFrom(src => src.EmailAddress));


            //CreateMap<EmployeeEntity,GetEmployeeFirstLastNameResponse>()
            //    .ForMember(dest=> dest.Id, opt=>opt.Ignore())
            //    .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src=>src.FirstName))
            //    .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
            //    .ForMember(dest => dest.PersonnelNumber, opt => opt.MapFrom(src => src.PersonnelNumber))
            //    .ForMember(dest => dest.BthDate, opt => opt.MapFrom(src => src.BthDate));
        }
    }
}
