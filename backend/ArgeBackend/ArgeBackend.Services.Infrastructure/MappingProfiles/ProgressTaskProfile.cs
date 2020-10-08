using ArgeBackend.DTO;
using ArgeBackend.Entities;
using AutoMapper;

namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class ProgressTaskProfile : Profile
    {
        public ProgressTaskProfile()
        {
            CreateMap<ProgressTask, ProgressTaskDTO>().ReverseMap();
        }
    }
}
