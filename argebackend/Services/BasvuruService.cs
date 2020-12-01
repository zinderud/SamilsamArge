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
    public class BasvuruService : BaseService, IBasvuruService
    {

        public BasvuruService(UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor, ApplicationDbContext context, ILogger<BaseService> logger) : base(userManager, contextAccessor, context, logger)
        {

        }

        public async Task<ProcessResult> CreateAsync(Basvuru model)
        {
            Func<Task> action = async () =>
            {


                //   var BasvuruExist = await context.Basvurus.Where(x => x.tc != model.tc).CountAsync();


                // if (BasvuruExist > 0)
                //{
                //   throw new InvalidOperationException("Bu tc mevcut");
                //}
                var user = await this.userManager.FindByIdAsync(CurrentUser.Id.ToString());
                var BasvuruEntity = await GetOrCreateEntityAsync(context.Basvurus, x => x.Id == model.Id);
                var Basvuru = BasvuruEntity.result;
                Basvuru.UserId = user.Id;
                Basvuru.User = user;
                Basvuru.BasvuruNo = model.BasvuruNo;
                Basvuru.Tarih = model.Tarih;
                Basvuru.Durum = model.Durum;
                Basvuru.DurumId = model.DurumId;
                Basvuru.BasvuruTuruId = model.BasvuruTuruId;
                Basvuru.BasvuruTuru = model.BasvuruTuru;
                Basvuru.BasvuruForm = model.BasvuruForm;


                // oluştururken otomatik olarak false yaptık */

                await context.SaveChangesAsync();
            };
            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult<Basvuru>> RetrieveAsync(long id)
        {
            Func<Task<Basvuru>> action = async () =>
            {
                var result = await context.Basvurus.Where(x => x.Id == id).FirstAsync();
                return result;
            };

            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult> UpdateAsync(long id, Basvuru model)
        {
            model.Id = id;

            Func<Task> action = async () =>
            {

                var user = await this.userManager.FindByIdAsync(CurrentUser.Id.ToString());


                var BasvuruEntity = await GetOrCreateEntityAsync(context.Basvurus, x => x.Id == model.Id);
                var Basvuru = BasvuruEntity.result;
                Basvuru.UserId = user.Id;
                Basvuru.User = user;

                Basvuru.UserId = user.Id;
                Basvuru.User = user;
                Basvuru.BasvuruNo = model.BasvuruNo;
                Basvuru.Tarih = model.Tarih;
                Basvuru.Durum = model.Durum;
                Basvuru.DurumId = model.DurumId;
                Basvuru.BasvuruTuruId = model.BasvuruTuruId;
                Basvuru.BasvuruTuru = model.BasvuruTuru;
                Basvuru.BasvuruForm = model.BasvuruForm;
                var p = context.Update(Basvuru);

                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }



        public async Task<ProcessResult> DeleteAsync(long id)
        {
            Func<Task> action = async () =>
            {
                var o = await context.Basvurus.Where(x => x.Id == id).SingleAsync();
                context.Basvurus.Remove(o);
                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }


        public async Task<ProcessResult<List<Basvuru>>> ListAsync(GetListViewModel<BaseFilter> getListModel)
        {
            IQueryable<Basvuru> q = context.Basvurus;
            q = SetIncludes(q);
            q = SetFilter(q, getListModel.filter);

            var countItems = await q.CountAsync();

            q = SetPaginator(q, getListModel.paginator);
            q = SetOrderBy(q, getListModel.orderBy);

            Func<Task<List<Basvuru>>> action = async () =>
            {
                var result = await q.ToListAsync();
                return result;
            };

            return await Process.RunAsync(action, countItems);
        }

        public async Task<ProcessResult<int>> CountAsync(BaseFilter filter)
        {
            IQueryable<Basvuru> q = context.Basvurus;
            q = SetFilter(q, filter);

            Func<Task<int>> action = async () =>
            {
                var countItems = await q.CountAsync();
                return countItems;
            };

            return await Process.RunAsync(action);
        }

        private IQueryable<Basvuru> SetIncludes(IQueryable<Basvuru> q)
        {
            return q;
        }

        private IQueryable<Basvuru> SetOrderBy(IQueryable<Basvuru> q, OrderBy ob)
        {
            if (ob == null)
            {
                return q;
            }

            if (!ob.desc)
            {
                if (ob.by == "BasvuruNo")
                {
                    q = q.OrderBy(s => s.BasvuruNo);
                }
                else
                {
                    q = q.OrderBy(s => s.Id);
                }
            }
            else
            {
                if (ob.by == "BasvuruNo")
                {
                    q = q.OrderBy(s => s.BasvuruNo);
                }
                else
                {
                    q = q.OrderByDescending(s => s.Id);
                }
            }
            return q;
        }

        private IQueryable<Basvuru> SetFilter(IQueryable<Basvuru> q, BaseFilter f)
        {
            if (f == null)
            {
                return q;
            }
            if (!String.IsNullOrEmpty(f.searchString))
            {

                q = q.Where(x => x.BasvuruNo == (Convert.ToInt64(f.searchString)));
            }
            return q;
        }

        private IQueryable<Basvuru> SetPaginator(IQueryable<Basvuru> q, Paginator p)
        {
            if (p == null)
            {
                return q;
            }
            return q.Skip(p.offset).Take(p.limit);
        }




    }
}