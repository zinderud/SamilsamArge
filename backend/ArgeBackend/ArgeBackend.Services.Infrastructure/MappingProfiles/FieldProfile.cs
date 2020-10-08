using ArgeBackend.DTO;
using ArgeBackend.Entities;
using AutoMapper;

namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class FieldProfile : Profile
    {
        public FieldProfile()
        {
            CreateMap<Field, FieldDTO>().ReverseMap();
        }
    }
}
