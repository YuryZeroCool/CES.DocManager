using AutoMapper;
using CES.DocManger.WebApi.Models.Request;
using CES.DocManger.WebApi.Models.Response;
using CES.DocManger.WebApi.Models.Response.DriverLicense;
using CES.DocManger.WebApi.Models.Response.Employees;
using CES.Infra.Models;

namespace CES.DocManger.WebApi.Mapper
{
    public class WebApiProfile : Profile
    {
        public WebApiProfile()
        {
            CreateMap<EmployeeEntity, EmployeeView>()
                .ForMember(dest => dest.DivisionNumber, opt => opt.MapFrom(src => src.DivisionNumber.Name));

            CreateMap<EmployeeView, EmployeeEntity>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName))
                .ForMember(dest => dest.DivisionNumber, opt => opt.Ignore())
                .ForMember(dest => dest.PersonnelNumber, opt => opt.MapFrom(src => src.PersonnelNumber))
                .ForMember(dest => dest.BthDate, opt => opt.MapFrom(src => src.BthDate));

            CreateMap<Division, DivisionViewModel>().
                ForMember(des => des.DivisionNamber, opt => opt.MapFrom(src => src.Name));

            CreateMap<EmployeeFirstLastName, EmployeeEntity>()
                .ForMember(dest => dest.FirstName, opt => opt.MapFrom(src => src.FirstName))
                .ForMember(dest => dest.LastName, opt => opt.MapFrom(src => src.LastName));

            CreateMap<EmployeeEntity, DriverLicense>();
        }
    }
}
