using AutoMapper;
using CES.DocManger.WebApi.Mapper;
using Microsoft.Extensions.DependencyInjection;

namespace CES.DocManger.WebApi.Extensions
{
    public static class AddMapperExtension
    {
        public static void AddMapper(this IServiceCollection services)
        {
            var mapperConfig = new MapperConfiguration(mc =>
            {
                mc.AddProfile(new WebApiProfile());
            });

            services.AddSingleton(mapperConfig.CreateMapper());
        }
    }
}
