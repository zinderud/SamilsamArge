

using AutoMapper;
using ArgeBackend.DTO;
using ArgeBackend.Entities;

namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class SettingsProfile : Profile
    {
        public SettingsProfile()
        {
            CreateMap<Settings, SettingsDTO>().ReverseMap();
        }
    }
}
