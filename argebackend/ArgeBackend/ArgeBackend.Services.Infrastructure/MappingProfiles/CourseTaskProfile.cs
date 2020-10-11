using ArgeBackend.DTO;
using ArgeBackend.Entities;
using AutoMapper;

namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class CourseTaskProfile : Profile
    {
        public CourseTaskProfile()
        {
            CreateMap<CourseTask, CourseTaskDTO>().ReverseMap();
        }
    }
}
