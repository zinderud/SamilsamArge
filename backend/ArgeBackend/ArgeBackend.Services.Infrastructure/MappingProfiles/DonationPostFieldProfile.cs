using ArgeBackend.DTO;
using ArgeBackend.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class DonationPostFieldProfile : Profile
    {
        public DonationPostFieldProfile()
        {
            CreateMap<DonationPostField, DonationPostFieldDTO>().ReverseMap();
        }
    }
}
