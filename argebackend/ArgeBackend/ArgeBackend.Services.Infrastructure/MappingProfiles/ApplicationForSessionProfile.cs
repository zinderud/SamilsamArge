using ArgeBackend.DTO;
using ArgeBackend.Entities;
using AutoMapper;

namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class ApplicationForSessionProfile : Profile
    {
        public ApplicationForSessionProfile()
        {
            CreateMap<ApplicationForSession, ApplicationForSessionDTO>().ReverseMap();
        }
    }
}
