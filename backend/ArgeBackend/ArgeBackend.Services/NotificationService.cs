using ArgeBackend.DTO;
using ArgeBackend.Entities;
using ArgeBackend.Services.Infrastructure;
using ArgeBackend.Services.Infrastructure.Repositories;
using ArgeBackend.Services.Infrastructure.Services;
using ArgeBackend.Utils;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ArgeBackend.Services
{
    public class NotificationService<TNotification> : BaseService, INotificationService where TNotification : Notification, new()
    {
        protected readonly INotificationRepository<TNotification> notificationRepository;
        public NotificationService(ICurrentContextProvider contextProvider, INotificationRepository<TNotification> notificationRepository) : base(contextProvider)
        {
            this.notificationRepository = notificationRepository;
        }

        public async Task<IEnumerable<NotificationDTO>> GetList(int? userId, DateTime? date, bool includeDeleted = false)
        {
            var entitiy = await notificationRepository.GetList(userId, date, Session, includeDeleted);
            return entitiy.MapTo<IEnumerable<NotificationDTO>>();
        }

        public async Task<bool> Delete(int id)
        {
            await notificationRepository.Delete(id, Session);
            return true;
        }

        public async Task<NotificationDTO> Edit(NotificationDTO dto)
        {
            var notification = dto.MapTo<TNotification>();
            await notificationRepository.Edit(notification, Session);
            return notification.MapTo<NotificationDTO>();
        }

        public async Task<NotificationDTO> GetByDate(DateTime date, bool includeDeleted = false)
        {
            var notification = await notificationRepository.GetByDate(date, Session, includeDeleted);
            return notification.MapTo<NotificationDTO>();
        }

        public async Task<NotificationDTO> GetById(int id, bool includeDeleted = false)
        {
            var notification = await notificationRepository.Get(id, Session, includeDeleted);
            return notification.MapTo<NotificationDTO>();
        }

        public async Task<NotificationDTO> GetByUserId(int userId, bool includeDeleted = false)
        {
            var notification = await notificationRepository.GetByUserId(userId, Session, includeDeleted);
            return notification.MapTo<NotificationDTO>();
        }
    }
}
