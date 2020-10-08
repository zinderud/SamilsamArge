using AutoMapper;
using ArgeBackend.DTO;
using ArgeBackend.Entities;

namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class CourseRatingProfile : Profile
    {
        public CourseRatingProfile()
        {
            CreateMap<CourseRating, CourseRatingDTO>().ReverseMap();
        }
    }
}
