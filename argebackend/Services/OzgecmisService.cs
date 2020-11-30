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
    public class OzgecmisService : BaseService, IOzgecmisService
    {

        public OzgecmisService(UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor, ApplicationDbContext context, ILogger<BaseService> logger) : base(userManager, contextAccessor, context, logger)
        {

        }

        public async Task<ProcessResult> CreateAsync(Ozgecmis model)
        {
            Func<Task> action = async () =>
            {


                var OzgecmisExist = await context.ozgecmisis.Where(x => x.Id != model.Id).CountAsync();


                if (OzgecmisExist > 0)
                {
                    throw new InvalidOperationException("Bu email mevcut");
                }

                var OzgecmisEntity = await GetOrCreateEntityAsync(context.ozgecmisis, x => x.Id == model.Id);
                var Ozgecmis = OzgecmisEntity.result;

                Ozgecmis.sorumlu = model.sorumlu;
                Ozgecmis.tc = model.tc;
                Ozgecmis.ad = model.ad;
                Ozgecmis.soyad = model.soyad;
                Ozgecmis.dogumYeri = model.dogumYeri;
                Ozgecmis.yabanciDil = model.yabanciDil;
                Ozgecmis.eposta = model.eposta;
                Ozgecmis.unvans = model.unvans;
                Ozgecmis.arastirmas = model.arastirmas;
                Ozgecmis.deneyims = model.deneyims;
                Ozgecmis.egitims = model.egitims;
                // oluştururken otomatik olarak false yaptık */

                await context.SaveChangesAsync();
            };
            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult<Ozgecmis>> RetrieveAsync(long id)
        {
            Func<Task<Ozgecmis>> action = async () =>
            {
                var result = await context.ozgecmisis.Where(x => x.Id == id).Include(x => x.unvans).Include(z => z.arastirmas).Include(y => y.deneyims).Include(e => e.egitims).FirstAsync();
                return result;
            };

            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult> UpdateAsync(long id, Ozgecmis model)
        {
            model.Id = id;

            Func<Task> action = async () =>
            {



                /*   var k = await ozgecmisUnvansUpdate(model); */
                var z = await ozgecmisSelfUpdate(model);

                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }
        public async Task<ProcessResult> ozgecmisUnvansUpdate(Ozgecmis model)
        {
            Func<Task> action = async () =>
      {

          foreach (var item in model.unvans)
          {

              var sEntity = await GetOrCreateEntityAsync(context.Unvans, x => x.Id == item.Id);

              var s = sEntity.result;

              s.aciklama = item.aciklama;
              s.icerik = item.icerik;
              s.tarih = item.tarih;
              // var il = context.Update(iln);
              var il = context.Update(s);

          }
      };
            return await Process.RunAsync(action);
        }


        public async Task<EntityEntry<Ozgecmis>> ozgecmisSelfUpdate(Ozgecmis model)
        {

            var OzgecmisEntity = await GetOrCreateEntityAsync(context.ozgecmisis, x => x.Id == model.Id);
            var Ozgecmis = OzgecmisEntity.result;

            Ozgecmis.sorumlu = model.sorumlu;
            Ozgecmis.tc = model.tc;
            Ozgecmis.ad = model.ad;
            Ozgecmis.soyad = model.soyad;
            Ozgecmis.dogumYeri = model.dogumYeri;
            Ozgecmis.yabanciDil = model.yabanciDil;
            Ozgecmis.eposta = model.eposta;
            Ozgecmis.unvans = model.unvans;
            Ozgecmis.arastirmas = model.arastirmas;
            Ozgecmis.deneyims = model.deneyims;
            Ozgecmis.egitims = model.egitims;
            var p = context.Update(Ozgecmis);

            return p;

        }
        public async Task<ProcessResult> DeleteAsync(long id)
        {
            Func<Task> action = async () =>
            {
                var o = await context.ozgecmisis.Where(x => x.Id == id).SingleAsync();
                context.ozgecmisis.Remove(o);
                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }


        public async Task<ProcessResult<List<Ozgecmis>>> ListAsync(GetListViewModel<BaseFilter> getListModel)
        {
            IQueryable<Ozgecmis> q = context.ozgecmisis.Include(x => x.unvans).Include(z => z.arastirmas).Include(y => y.deneyims).Include(e => e.egitims);
            q = SetIncludes(q);
            q = SetFilter(q, getListModel.filter);

            var countItems = await q.CountAsync();

            q = SetPaginator(q, getListModel.paginator);
            q = SetOrderBy(q, getListModel.orderBy);

            Func<Task<List<Ozgecmis>>> action = async () =>
            {
                var result = await q.ToListAsync();
                return result;
            };

            return await Process.RunAsync(action, countItems);
        }

        public async Task<ProcessResult<int>> CountAsync(BaseFilter filter)
        {
            IQueryable<Ozgecmis> q = context.ozgecmisis;
            q = SetFilter(q, filter);

            Func<Task<int>> action = async () =>
            {
                var countItems = await q.CountAsync();
                return countItems;
            };

            return await Process.RunAsync(action);
        }

        private IQueryable<Ozgecmis> SetIncludes(IQueryable<Ozgecmis> q)
        {
            return q;
        }

        private IQueryable<Ozgecmis> SetOrderBy(IQueryable<Ozgecmis> q, OrderBy ob)
        {
            if (ob == null)
            {
                return q;
            }

            if (!ob.desc)
            {
                if (ob.by == "tc")
                {
                    q = q.OrderBy(s => s.tc);
                }
                else
                {
                    q = q.OrderBy(s => s.Id);
                }
            }
            else
            {
                if (ob.by == "tc")
                {
                    q = q.OrderBy(s => s.tc);
                }
                else
                {
                    q = q.OrderByDescending(s => s.Id);
                }
            }
            return q;
        }

        private IQueryable<Ozgecmis> SetFilter(IQueryable<Ozgecmis> q, BaseFilter f)
        {
            if (f == null)
            {
                return q;
            }
            if (!String.IsNullOrEmpty(f.searchString))
            {
                q = q.Where(s => s.tc.Contains(f.searchString));
            }
            return q;
        }

        private IQueryable<Ozgecmis> SetPaginator(IQueryable<Ozgecmis> q, Paginator p)
        {
            if (p == null)
            {
                return q;
            }
            return q.Skip(p.offset).Take(p.limit);
        }




    }
}