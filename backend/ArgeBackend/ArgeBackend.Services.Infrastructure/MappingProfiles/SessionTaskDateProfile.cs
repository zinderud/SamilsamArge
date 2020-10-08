using ArgeBackend.DTO;
using ArgeBackend.Entities;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Text;

namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class SessionTaskDateProfile : Profile
    {
        public SessionTaskDateProfile()
        {
            CreateMap<SessionTaskDate, SessionTaskDateDTO>().ReverseMap();
        }
    }
}
