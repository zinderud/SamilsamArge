using AutoMapper;
using ArgeBackend.DTO;
using ArgeBackend.Entities;


namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class CourseProfile : Profile
    {
        public CourseProfile()
        {
            CreateMap<Course, CourseDTO>().ReverseMap();
        }
    }
}
