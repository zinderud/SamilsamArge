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
    public class StatsService : BaseService, IStatsService
    {

        public StatsService(UserManager<ApplicationUser> userManager, IBsvNoService bsvNoService, IHttpContextAccessor contextAccessor, ApplicationDbContext context, ILogger<BaseService> logger) : base(userManager, contextAccessor, context, logger)
        {

        }

        public async Task<CountStats> BasvuruCountStats()
        {

            int toplamBasvuruSayisi, basvuru_kabul, basvuru_red, basvuru_yapildi, basvuru_on_kabul, On_inceleme_atama, basvuru_duzeltme, On_inceleme_tamam;

            On_inceleme_tamam = basvuru_on_kabul = On_inceleme_atama = basvuru_duzeltme = toplamBasvuruSayisi = basvuru_kabul = basvuru_red = basvuru_yapildi = 0;

            CountStats csys = new CountStats();
            IQueryable<Basvuru> q = context.Basvurus;
            toplamBasvuruSayisi = await q.CountAsync();


            await context.Basvurus.ForEachAsync(x =>
            {
                if (x.Durum == "basvuru_red") { ++basvuru_red; };
                if (x.Durum == "basvuru_kabul") { ++basvuru_kabul; };

                if (x.Durum == "basvuru_yapildi") { ++basvuru_yapildi; };

                if (x.Durum == "On_inceleme_atama") { ++On_inceleme_atama; };
                if (x.Durum == "basvuru_on_kabul") { ++basvuru_on_kabul; };
                if (x.Durum == "On_inceleme_tamam") { ++On_inceleme_tamam; };
                if (x.Durum == "basvuru_duzeltme") { ++basvuru_duzeltme; };

            });

            csys.yeniBasvuruSayisi = basvuru_yapildi;
            csys.rededilenBasvuruSayisi = basvuru_red;
            csys.toplamBasvuruSayisi = toplamBasvuruSayisi;
            csys.kabuledilenBasvuruSayisi = basvuru_kabul;
            csys.onIncelemeAtamaBasvuruSayisi = On_inceleme_atama;
            csys.duzeltmeAtamaBasvuruSayisi = basvuru_duzeltme;
            csys.yeniKontrolSayisi = On_inceleme_tamam; // todo burda  tamamlananla  yeniKontrolSayisi aynı düzlem  yaptık düzenlenecek
            return csys;


        }

        public async Task<ProcessResult<List<Basvuru>>> BasvuruSearchTimeAsync(string time)

        {
            DateTime? dt = string.IsNullOrEmpty(time) ? (DateTime?)null : DateTime.Parse(time);
            IQueryable<Basvuru> q = context.Basvurus.Include(x => x.User);
            if (!String.IsNullOrEmpty(dt.ToString()))
            {

                q = q.Where(x => x.basvuruBitisTarih > dt.Value);

            }
            var countItems = await q.CountAsync();

            Func<Task<List<Basvuru>>> action = async () =>
            {
                var result = await q.ToListAsync();
                return result;
            };

            return await Process.RunAsync(action, countItems);
        }




    }
}