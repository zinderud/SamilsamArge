using ArgeBackend.DTO;
using ArgeBackend.Entities;
using AutoMapper;

namespace ArgeBackend.Services.Infrastructure.MappingProfiles
{
    public class NotificationProfile : Profile
    {
        public NotificationProfile()
        {
            CreateMap<Notification, NotificationDTO>().ReverseMap();
        }
    }
}
