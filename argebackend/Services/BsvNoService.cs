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
    public class BsvNoService : BaseService, IBsvNoService
    {
        public BsvNoService(UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor, ApplicationDbContext context, ILogger<BaseService> logger) : base(userManager, contextAccessor, context, logger)
        {

        }
        public async Task<ProcessResult> CreateAsync(BsvNo model)
        {
            Func<Task> action = async () =>
            {

                var BsvNoExist = await context.BsvNos.Where(x => x.BasvuruNo == model.BasvuruNo).CountAsync();

                if (BsvNoExist > 0)
                {
                    throw new InvalidOperationException("Bu isim mevcut");
                }

                var BsvNoEntity = await GetOrCreateEntityAsync(context.BsvNos, x => x.Id == model.Id);
                var BsvNo = BsvNoEntity.result;

                BsvNo.BasvuruNo = model.BasvuruNo;
                /*  BsvNo.PatientID = model.PatientID;
                 BsvNo.IllnessID = model.IllnessID; */
                await context.SaveChangesAsync();
            };
            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult<BsvNo>> RetrieveAsync(long id)
        {
            Func<Task<BsvNo>> action = async () =>
            {
                var result = await context.BsvNos.Where(x => x.Id == id).FirstAsync();
                return result;
            };

            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult> UpdateAsync(long id, BsvNo model)
        {
            model.Id = id;

            Func<Task> action = async () =>
            {
                var BsvNoExist = await context.BsvNos.Where(x => x.BasvuruNo == model.BasvuruNo && x.Id != model.Id).CountAsync();

                if (BsvNoExist > 0)
                {
                    throw new InvalidOperationException("Bu isim mevcut");
                }

                var BsvNoEntity = await GetOrCreateEntityAsync(context.BsvNos, x => x.Id == model.Id);
                var BsvNo = BsvNoEntity.result;

                BsvNo.BasvuruNo = model.BasvuruNo;

                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult> DeleteAsync(long id)
        {
            Func<Task> action = async () =>
            {
                var o = await context.BsvNos.Where(x => x.Id == id).SingleAsync();
                context.BsvNos.Remove(o);
                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }


        public async Task<ProcessResult<List<BsvNo>>> ListAsync(GetListViewModel<BaseFilter> getListModel)
        {
            IQueryable<BsvNo> q = context.BsvNos;
            q = SetIncludes(q);
            q = SetFilter(q, getListModel.filter);

            var countItems = await q.CountAsync();

            q = SetPaginator(q, getListModel.paginator);
            q = SetOrderBy(q, getListModel.orderBy);

            Func<Task<List<BsvNo>>> action = async () =>
            {
                var result = await q.ToListAsync();
                return result;
            };

            return await Process.RunAsync(action, countItems);
        }

        public async Task<ProcessResult<int>> CountAsync(BaseFilter filter)
        {
            IQueryable<BsvNo> q = context.BsvNos;
            q = SetFilter(q, filter);

            Func<Task<int>> action = async () =>
            {
                var countItems = await q.CountAsync();
                return countItems;
            };

            return await Process.RunAsync(action);
        }




        private IQueryable<BsvNo> SetIncludes(IQueryable<BsvNo> q)
        {
            return q;
        }

        private IQueryable<BsvNo> SetOrderBy(IQueryable<BsvNo> q, OrderBy ob)
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
                    q = q.OrderByDescending(s => s.BasvuruNo);
                }
                else
                {
                    q = q.OrderByDescending(s => s.Id);
                }
            }
            return q;
        }

        private IQueryable<BsvNo> SetFilter(IQueryable<BsvNo> q, BaseFilter f)
        {
            if (f == null)
            {
                return q;
            }
            if (f != null)
            {
                q = q.Where(s => s.BasvuruNo.ToString() == (f.searchString));
            }
            return q;
        }

        private IQueryable<BsvNo> SetPaginator(IQueryable<BsvNo> q, Paginator p)
        {
            if (p == null)
            {
                return q;
            }
            return q.Skip(p.offset).Take(p.limit);
        }

        public async Task<ProcessResult<BsvNo>> lastAsync()
        {
            Func<Task<BsvNo>> action = async () =>
            {

                var result = await context.BsvNos.LastAsync();

                return result;
            };

            return await Process.RunAsync(action);
        }


    }
}