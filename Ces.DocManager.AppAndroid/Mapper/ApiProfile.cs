using AutoMapper;
using Ces.DocManager.AppAndroid.Models;

namespace Ces.DocManager.AppAndroid.Mapper
{
    public class ApiProfile : Profile
    {
        public ApiProfile()
        {
            CreateMap<NoteBase, NoteModel>()
              .ForMember(dest => dest.Id, opt => opt.Ignore());
        }
    }
}
