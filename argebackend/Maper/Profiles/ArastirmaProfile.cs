
using argebackend.Dto;
using argebackend.Models;
using AutoMapper;

namespace argebackend.Profiles
{
    public class ArastirmaProfile : Profile
    {
        public ArastirmaProfile()
        {
            CreateMap<Arastirma, ArastirmaDto>().ReverseMap();
        }
    }

}
