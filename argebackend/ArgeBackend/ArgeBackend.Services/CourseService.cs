using ArgeBackend.DTO;
using ArgeBackend.Entities;
using ArgeBackend.Services.Infrastructure;
using ArgeBackend.Services.Infrastructure.Repositories;
using ArgeBackend.Services.Infrastructure.Services;
using ArgeBackend.Utils;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ArgeBackend.Services
{
    public class CourseService<TCourse> : BaseService, ICourseService where TCourse : Course, new()
    {
        protected readonly ICourseRepository<TCourse> courseRepository;

        public CourseService(ICurrentContextProvider contextProvider, ICourseRepository<TCourse> courseRepository) : base(contextProvider)
        {
            this.courseRepository = courseRepository;
        }

        public async Task<IEnumerable<CourseDTO>> GetList(int? userId, string name, bool includeDeleted = false)
        {
            var entitiy = await courseRepository.GetList(userId, name, Session, includeDeleted);
            return entitiy.MapTo<IEnumerable<CourseDTO>>();
        }

        public async Task<bool> Delete(int id)
        {
            await courseRepository.Delete(id, Session);
            return true;
        }

        public async Task<CourseDTO> Edit(CourseDTO dto)
        {
            var course = dto.MapTo<TCourse>();
            await courseRepository.Edit(course, Session);
            return course.MapTo<CourseDTO>();
        }

        public async Task<CourseDTO> GetById(int id, bool includeDeleted = false)
        {
            var course = await courseRepository.Get(id, Session, includeDeleted);
            return course.MapTo<CourseDTO>();
        }

        public async Task<IEnumerable<CourseDTO>> GetByName(string name, bool includeDeleted = false)
        {
            var course = await courseRepository.GetByName(name, Session, includeDeleted);
            return course.MapTo<IEnumerable<CourseDTO>>();
        }

        public async Task<IEnumerable<CourseDTO>> GetByUserId(int userId, bool includeDeleted = false)
        {
            var course = await courseRepository.GetByUserId(userId, Session, includeDeleted);
            return course.MapTo<IEnumerable<CourseDTO>>();
        }
    }
}
