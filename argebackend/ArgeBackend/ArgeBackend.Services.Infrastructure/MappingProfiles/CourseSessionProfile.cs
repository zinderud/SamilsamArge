using ArgeBackend.DTO;
using ArgeBackend.Entities;
using AutoMapper;

namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class CourseSessionProfile : Profile
    {
        public CourseSessionProfile()
        {
            CreateMap<CourseSession, CourseSessionDTO>().ReverseMap();
        }
    }

}
