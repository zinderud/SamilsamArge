using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading.Tasks;
using System.Linq;
using System.Collections.Generic;
using argebackend.Models;
using argebackend.Services.Interfaces;
using argebackend.ViewModels;
using Microsoft.Extensions.Logging;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace argebackend.Services
{
    public class TimelineService : BaseService, ITimelineService
    {

        public TimelineService(UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor, ApplicationDbContext context, ILogger<BaseService> logger) : base(userManager, contextAccessor, context, logger)
        {

        }

        public async Task<ProcessResult> CreateAsync(Timeline model)
        {
            Func<Task> action = async () =>
            {



                var user = await this.userManager.FindByIdAsync(CurrentUser.Id.ToString());
                var TimelineEntity = await GetOrCreateEntityAsync(context.timelines, x => x.Id == model.Id);
                var Timeline = TimelineEntity.result;
                Timeline.userId = user.Id;
                Timeline.user = user;
                Timeline.BasvuruId = model.BasvuruId;
                Timeline.basvuru = model.basvuru;
                Timeline.tarih = model.tarih;
                Timeline.durum = model.durum;
                Timeline.not = model.not;


                await context.SaveChangesAsync();
            };
            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult<Timeline>> RetrieveAsync(long id)
        {
            Func<Task<Timeline>> action = async () =>
            {
                var result = await context.timelines.Where(x => x.Id == id).FirstAsync();
                return result;
            };

            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult> UpdateAsync(long id, Timeline model)
        {
            model.Id = id;

            Func<Task> action = async () =>
            {

                var user = await this.userManager.FindByIdAsync(CurrentUser.Id.ToString());


                var TimelineEntity = await GetOrCreateEntityAsync(context.timelines, x => x.Id == model.Id);
                var Timeline = TimelineEntity.result;
                Timeline.userId = user.Id;
                Timeline.user = user;
                Timeline.BasvuruId = model.BasvuruId;
                Timeline.basvuru = model.basvuru;
                Timeline.tarih = model.tarih;
                Timeline.durum = model.durum;
                Timeline.not = model.not;

                var p = context.Update(Timeline);

                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }



        public async Task<ProcessResult> DeleteAsync(long id)
        {
            Func<Task> action = async () =>
            {
                var o = await context.timelines.Where(x => x.Id == id).SingleAsync();
                context.timelines.Remove(o);
                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }


        public async Task<ProcessResult<List<Timeline>>> ListAsync(GetListViewModel<BaseFilter> getListModel)
        {
            IQueryable<Timeline> q = context.timelines;
            q = SetIncludes(q);
            q = SetFilter(q, getListModel.filter);

            var countItems = await q.CountAsync();

            q = SetPaginator(q, getListModel.paginator);
            q = SetOrderBy(q, getListModel.orderBy);

            Func<Task<List<Timeline>>> action = async () =>
            {
                var result = await q.ToListAsync();
                return result;
            };

            return await Process.RunAsync(action, countItems);
        }

        public async Task<ProcessResult<int>> CountAsync(BaseFilter filter)
        {
            IQueryable<Timeline> q = context.timelines;
            q = SetFilter(q, filter);

            Func<Task<int>> action = async () =>
            {
                var countItems = await q.CountAsync();
                return countItems;
            };

            return await Process.RunAsync(action);
        }

        private IQueryable<Timeline> SetIncludes(IQueryable<Timeline> q)
        {
            return q;
        }

        private IQueryable<Timeline> SetOrderBy(IQueryable<Timeline> q, OrderBy ob)
        {
            if (ob == null)
            {
                return q;
            }

            if (!ob.desc)
            {
                if (ob.by == "id")
                {
                    q = q.OrderBy(s => s.Id);
                }
                else
                {
                    q = q.OrderBy(s => s.Id);
                }
            }
            else
            {
                if (ob.by == "id")
                {
                    q = q.OrderBy(s => s.Id);
                }
                else
                {
                    q = q.OrderByDescending(s => s.Id);
                }
            }
            return q;
        }

        private IQueryable<Timeline> SetFilter(IQueryable<Timeline> q, BaseFilter f)
        {
            if (f == null)
            {
                return q;
            }
            if (!String.IsNullOrEmpty(f.searchString))
            {
                q = q.Where(s => s.Id.ToString().Contains(f.searchString));
            }
            return q;
        }

        private IQueryable<Timeline> SetPaginator(IQueryable<Timeline> q, Paginator p)
        {
            if (p == null)
            {
                return q;
            }
            return q.Skip(p.offset).Take(p.limit);
        }


        public async Task<ProcessResult<List<Timeline>>> SelectedBasvuruIdAsnc(long id)
        {
            Func<Task<List<Timeline>>> action = async () =>
            {
                var result = await context.timelines.Where(x => x.BasvuruId == id).Include(x => x.user).OrderBy(x => x.Id).ToListAsync();
                return result;
            };

            return await Process.RunAsync(action);
        }

    }
}