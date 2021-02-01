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
    public class KontrolService : BaseService, IKontrolService
    {

        public KontrolService(UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor, ApplicationDbContext context, ILogger<BaseService> logger) : base(userManager, contextAccessor, context, logger)
        {

        }

        public async Task<ProcessResult> CreateAsync(Kontrol model)
        {
            Func<Task> action = async () =>
            {


                //   var KontrolExist = await context.kontrolis.Where(x => x.tc != model.tc).CountAsync();


                // if (KontrolExist > 0)
                //{
                //   throw new InvalidOperationException("Bu tc mevcut");
                //}
                var user = await this.userManager.FindByIdAsync(CurrentUser.Id.ToString());
                var KontrolEntity = await GetOrCreateEntityAsync(context.kontrols, x => x.Id == model.Id);
                var Kontrol = KontrolEntity.result;

                Kontrol.basvuruId = model.basvuruId;
                Kontrol.basvuru = model.basvuru;
                Kontrol.atayanUserId = model.atayanUserId;
                // Kontrol.atayanUser = model.atayanUser;
                Kontrol.atananUserId = model.atananUserId;
                //Kontrol.atananUser = model.atananUser;
                Kontrol.atamaTarih = model.atamaTarih;
                Kontrol.kontrolDurum = model.kontrolDurum;
                Kontrol.kurumUstYazi = model.kurumUstYazi;
                Kontrol.dilekceBasvurusuUygunmu = model.dilekceBasvurusuUygunmu;
                Kontrol.arastirmaBaslik = model.arastirmaBaslik;
                Kontrol.arastirmaStatu = model.arastirmaStatu;
                Kontrol.arastirmaci = model.arastirmaci;
                Kontrol.danisman = model.danisman;
                Kontrol.kurum = model.kurum;
                Kontrol.arastirmaAmac = model.arastirmaAmac;
                Kontrol.arastirmaTuru = model.arastirmaTuru;
                Kontrol.arastirmaYeri = model.arastirmaYeri;
                Kontrol.arastirmaEvreni = model.arastirmaEvreni;
                Kontrol.arastirmaHipotez = model.arastirmaHipotez;
                Kontrol.arastirmaYontem = model.arastirmaYontem;
                Kontrol.arastirmaZamanAralik = model.arastirmaZamanAralik;
                Kontrol.girisimselUygulama = model.girisimselUygulama;
                Kontrol.prospektifmi = model.prospektifmi;
                Kontrol.arastirmaBilimselYararAciklanmismi = model.arastirmaBilimselYararAciklanmismi;
                Kontrol.anketSorulariUygunmu = model.anketSorulariUygunmu;
                Kontrol.onizinformvarmi = model.onizinformvarmi;
                Kontrol.basvuruformvarmi = model.basvuruformvarmi;
                Kontrol.etikkurulvarmi = model.etikkurulvarmi;
                Kontrol.bakanlikOnayvarmi = model.bakanlikOnayvarmi;
                Kontrol.butceFormvarmi = model.butceFormvarmi;
                Kontrol.ozgecmisvarmi = model.ozgecmisvarmi;
                Kontrol.kullanilacakevraklarvarmi = model.kullanilacakevraklarvarmi;
                Kontrol.ucedetLitaratur = model.ucedetLitaratur;
                Kontrol.gorusler = model.gorusler;
                Kontrol.kontrolTarih = model.kontrolTarih;



                // oluştururken otomatik olarak false yaptık */

                await context.SaveChangesAsync();
            };
            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult<Kontrol>> RetrieveAsync(long id)
        {
            Func<Task<Kontrol>> action = async () =>
            {
                var result = await context.kontrols.Where(x => x.Id == id).FirstAsync();
                return result;
            };

            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult> UpdateAsync(long id, Kontrol model)
        {
            model.Id = id;

            Func<Task> action = async () =>
            {

                var user = await this.userManager.FindByIdAsync(CurrentUser.Id.ToString());


                var KontrolEntity = await GetOrCreateEntityAsync(context.kontrols, x => x.Id == model.Id);
                var Kontrol = KontrolEntity.result;
                Kontrol.basvuruId = model.basvuruId;
                Kontrol.basvuru = model.basvuru;
                Kontrol.atayanUserId = model.atayanUserId;
                // Kontrol.atayanUser = model.atayanUser;
                Kontrol.atananUserId = model.atananUserId;
                //Kontrol.atananUser = model.atananUser;
                Kontrol.atamaTarih = model.atamaTarih;
                Kontrol.kontrolDurum = model.kontrolDurum;
                Kontrol.kurumUstYazi = model.kurumUstYazi;
                Kontrol.dilekceBasvurusuUygunmu = model.dilekceBasvurusuUygunmu;
                Kontrol.arastirmaBaslik = model.arastirmaBaslik;
                Kontrol.arastirmaStatu = model.arastirmaStatu;
                Kontrol.arastirmaci = model.arastirmaci;
                Kontrol.danisman = model.danisman;
                Kontrol.kurum = model.kurum;
                Kontrol.arastirmaAmac = model.arastirmaAmac;
                Kontrol.arastirmaTuru = model.arastirmaTuru;
                Kontrol.arastirmaYeri = model.arastirmaYeri;
                Kontrol.arastirmaEvreni = model.arastirmaEvreni;
                Kontrol.arastirmaHipotez = model.arastirmaHipotez;
                Kontrol.arastirmaYontem = model.arastirmaYontem;
                Kontrol.arastirmaZamanAralik = model.arastirmaZamanAralik;
                Kontrol.girisimselUygulama = model.girisimselUygulama;
                Kontrol.prospektifmi = model.prospektifmi;
                Kontrol.arastirmaBilimselYararAciklanmismi = model.arastirmaBilimselYararAciklanmismi;
                Kontrol.anketSorulariUygunmu = model.anketSorulariUygunmu;
                Kontrol.onizinformvarmi = model.onizinformvarmi;
                Kontrol.basvuruformvarmi = model.basvuruformvarmi;
                Kontrol.etikkurulvarmi = model.etikkurulvarmi;
                Kontrol.bakanlikOnayvarmi = model.bakanlikOnayvarmi;
                Kontrol.butceFormvarmi = model.butceFormvarmi;
                Kontrol.ozgecmisvarmi = model.ozgecmisvarmi;
                Kontrol.kullanilacakevraklarvarmi = model.kullanilacakevraklarvarmi;
                Kontrol.ucedetLitaratur = model.ucedetLitaratur;
                Kontrol.gorusler = model.gorusler;
                Kontrol.kontrolTarih = model.kontrolTarih;

                var p = context.Update(Kontrol);

                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }



        public async Task<ProcessResult> DeleteAsync(long id)
        {
            Func<Task> action = async () =>
            {
                var o = await context.kontrols.Where(x => x.Id == id).SingleAsync();
                context.kontrols.Remove(o);
                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }


        public async Task<ProcessResult<List<Kontrol>>> ListAsync(GetListViewModel<BaseFilter> getListModel)
        {
            IQueryable<Kontrol> q = context.kontrols;
            q = SetIncludes(q);
            q = SetFilter(q, getListModel.filter);

            var countItems = await q.CountAsync();

            q = SetPaginator(q, getListModel.paginator);
            q = SetOrderBy(q, getListModel.orderBy);

            Func<Task<List<Kontrol>>> action = async () =>
            {
                var result = await q.ToListAsync();
                return result;
            };

            return await Process.RunAsync(action, countItems);
        }

        public async Task<ProcessResult<int>> CountAsync(BaseFilter filter)
        {
            IQueryable<Kontrol> q = context.kontrols;
            q = SetFilter(q, filter);

            Func<Task<int>> action = async () =>
            {
                var countItems = await q.CountAsync();
                return countItems;
            };

            return await Process.RunAsync(action);
        }

        private IQueryable<Kontrol> SetIncludes(IQueryable<Kontrol> q)
        {
            return q;
        }

        private IQueryable<Kontrol> SetOrderBy(IQueryable<Kontrol> q, OrderBy ob)
        {
            if (ob == null)
            {
                return q;
            }

            /*    if (!ob.desc)
               {
                   if (ob.by == q.basvuruId.ToString())
                   {
                       q = q.OrderBy(s => s.basvuruId);
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
               } */
            return q.OrderBy(s => s.Id);
        }

        private IQueryable<Kontrol> SetFilter(IQueryable<Kontrol> q, BaseFilter f)
        {
            if (f == null)
            {
                return q;
            }
            /*   if (!String.IsNullOrEmpty(f.searchString))
              {
                  q = q.Where(s => s.tc.Contains(f.searchString));
              } */
            return q;
        }

        private IQueryable<Kontrol> SetPaginator(IQueryable<Kontrol> q, Paginator p)
        {
            if (p == null)
            {
                return q;
            }
            return q.Skip(p.offset).Take(p.limit);
        }




    }
}