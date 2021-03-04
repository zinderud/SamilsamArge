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

        private readonly IBsvNoService _bsvNoService;
        public BasvuruService(UserManager<ApplicationUser> userManager, IBsvNoService bsvNoService, IHttpContextAccessor contextAccessor, ApplicationDbContext context, ILogger<BaseService> logger) : base(userManager, contextAccessor, context, logger)
        {
            this._bsvNoService = bsvNoService;
        }

        public async Task<ProcessResult> CreateBasvuruTuruneAsync(BasvuruTuru model)
        {

            var bsvno = context.BsvNos.AsEnumerable().LastOrDefault();

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

                Basvuru.BasvuruNo = bsvno.BasvuruNo + 1;
                Basvuru.Tarih = DateTime.Now;
                Basvuru.Durum = "basvuru_yapildi";
                Basvuru.DurumId = 1;

                Basvuru.BasvuruTuru = model.basvuruTuru;
                Basvuru.BasvuruForm = "";
                Basvuru.basvuruBaslangicTarih = model.basvuruBaslangicTarih;
                Basvuru.basvuruBitisTarih = model.basvuruBitisTarih;




                BsvNo bsvNo = new BsvNo();
                bsvNo.BasvuruNo = Basvuru.BasvuruNo;
                var bsvNoresult = await _bsvNoService.CreateAsync(bsvNo);

                await context.SaveChangesAsync();
            };
            return await Process.RunAsync(action);
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
                var bsvno = await _bsvNoService.lastAsync();

                // var user = await this.userManager.FindByIdAsync(CurrentUser.Id.ToString());
                var BasvuruEntity = await GetOrCreateEntityAsync(context.Basvurus, x => x.Id == model.Id);
                var Basvuru = BasvuruEntity.result;
                Basvuru.UserId = CurrentUser.Id;
                Basvuru.User = CurrentUser;
                Basvuru.BasvuruNo = bsvno.Value.BasvuruNo + 1;
                Basvuru.Tarih = DateTime.Now;
                Basvuru.Durum = "basvuru_yapildi";
                Basvuru.DurumId = 1;
                //  Basvuru.BasvuruTuruId = model.BasvuruTuruId;
                Basvuru.BasvuruTuru = model.BasvuruTuru;
                Basvuru.BasvuruForm = "";
                Basvuru.basvuruBaslangicTarih = model.basvuruBaslangicTarih;
                Basvuru.basvuruBitisTarih = model.basvuruBitisTarih;


                // oluştururken otomatik olarak false yaptık */

                await context.SaveChangesAsync();
            };
            return await Process.RunAsync(action);
        }




        /* TODO var results = context.Products
                .Include("ProductSubcategory")
                .Where(p => p.Name.Contains(searchTerm)
                            && p.DiscontinuedDate == null)
                .Select(p => new
                                {
                                    p.ProductID,
                                    ProductSubcategoryName = p.ProductSubcategory.Name,
                                    p.Name,
                                    p.StandardCost
                                })
                .AsEnumerable()
                .Select(p => new AutoCompleteData
                                    {
                                        Id = p.ProductID,
                                        Text = BuildAutoCompleteText(p.Name,
                                            p.ProductSubcategoryName, p.StandardCost)
                                    })
                .ToArray(); */
        public async Task<ProcessResult<SelectedBasvuru>> SelectedBasvuruAsnc(long id)
        {
            Func<Task<SelectedBasvuru>> action = async () =>
            {
                var result = await context.Basvurus.Where(x => x.Id == id).Include(x => x.User)
                .Select(p => new SelectedBasvuru
                {
                    UserId = p.User.Id,
                    Firstname = p.User.Firstname,
                    Lastname = p.User.Lastname,
                    Tc = p.User.Tc,
                    BasvuruNo = p.BasvuruNo,
                    Tarih = p.Tarih,
                    Durum = p.Durum,
                    DurumId = p.DurumId,
                    BasvuruTuru = p.BasvuruTuru,
                    BasvuruForm = p.BasvuruForm,
                    BasvuruBaslangicTarih = p.basvuruBaslangicTarih,
                    BasvuruBitisTarih = p.basvuruBitisTarih
                }

                )
                .FirstAsync();
                return result;
            };

            return await Process.RunAsync(action);
        }
        public async Task<ProcessResult<Basvuru>> RetrieveAsync(long id)
        {
            Func<Task<Basvuru>> action = async () =>
            {
                var result = await context.Basvurus.Where(x => x.Id == id).Include(x => x.User).FirstAsync();
                return result;
            };

            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult> UpdateAsync(long id, Basvuru model)
        {
            model.Id = id;

            Func<Task> action = async () =>
            {




                var user = await this.userManager.FindByIdAsync(model.UserId.ToString());


                var BasvuruEntity = await GetOrCreateEntityAsync(context.Basvurus, x => x.Id == model.Id);
                var Basvuru = BasvuruEntity.result;
                Basvuru.UserId = model.UserId;
                /*   Basvuru.User = user; */

                Basvuru.UserId = user.Id;
                Basvuru.User = user;
                Basvuru.BasvuruNo = model.BasvuruNo;
                /*  Basvuru.BasvuruNo = model.BasvuruNo; */
                Basvuru.Tarih = model.Tarih;
                Basvuru.Durum = model.Durum;
                Basvuru.DurumId = model.DurumId;
                // Basvuru.BasvuruTuruId = model.BasvuruTuruId;
                Basvuru.BasvuruTuru = model.BasvuruTuru;
                Basvuru.BasvuruForm = model.BasvuruForm;
                Basvuru.basvuruBaslangicTarih = model.basvuruBaslangicTarih;
                Basvuru.basvuruBitisTarih = model.basvuruBitisTarih;
                Basvuru.basvuruBaslangicTarih = model.basvuruBaslangicTarih;
                Basvuru.basvuruBitisTarih = model.basvuruBitisTarih;
                var p = context.Update(Basvuru);

                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult> UpdateDurumAsync(long id, Basvuru model)
        {


            Func<Task> action = async () =>
            {

                var user = await this.userManager.FindByIdAsync(CurrentUser.Id.ToString());


                var BasvuruEntity = await GetOrCreateEntityAsync(context.Basvurus, x => x.Id == id);
                var Basvuru = BasvuruEntity.result;

                Basvuru.Durum = model.Durum;

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


        public async Task<ProcessResult<List<Basvuru>>> ListAsync(GetListViewModel<BasvuruFilter> getListModel)
        {
            IQueryable<Basvuru> q = context.Basvurus.Include(x => x.User);
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

        public async Task<ProcessResult<List<Basvuru>>> UserBasvuruListAsync(GetListViewModel<BasvuruFilter> getListModel)
        {
            IQueryable<Basvuru> q = context.Basvurus.Include(x => x.User).Where(x => x.User.Id == CurrentUser.Id);
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
        public async Task<ProcessResult<List<SelectedBasvuru>>> UseraddBassvuruListAsync(GetListViewModel<BasvuruFilter> getListModel)
        {
            IQueryable<SelectedBasvuru> q = context.Basvurus.Include(x => x.User)
            .Select(p => new SelectedBasvuru
            {
                Firstname = p.User.Firstname,
                Lastname = p.User.Lastname,
                Tc = p.User.Tc,
                BasvuruNo = p.BasvuruNo,
                Tarih = p.Tarih,
                Durum = p.Durum,
                DurumId = p.DurumId,
                BasvuruTuru = p.BasvuruTuru,
                BasvuruForm = p.BasvuruForm,
                BasvuruBaslangicTarih = p.basvuruBaslangicTarih,
                BasvuruBitisTarih = p.basvuruBitisTarih
            }

                );

            q = SetaddUserFilter(q, getListModel.filter);

            var countItems = await q.CountAsync();

            q = SetaddUserPaginator(q, getListModel.paginator);
            q = SetaddUserOrderBy(q, getListModel.orderBy);

            Func<Task<List<SelectedBasvuru>>> action = async () =>
            {

                //TODO BUG ÇÖZÜLECEK
                var result = await q.ToListAsync();

                return result;
            };
            Console.WriteLine("qqqqqqqqqqqqqqqqqqq");
            return await Process.RunAsync(action, countItems);
        }

        public async Task<ProcessResult<int>> CountAsync(BasvuruFilter filter)
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

        private IQueryable<Basvuru> SetFilter(IQueryable<Basvuru> q, BasvuruFilter f)
        {
            /*    DateTime? dt = string.IsNullOrEmpty(f.basvuruBitisTarih) ? (DateTime?)null : DateTime.Parse(f.basvuruBitisTarih); */

            if (f == null)
            {
                return q;
            }
            if (!String.IsNullOrEmpty(f.searchString))
            {

                q = q.Where(x => x.Durum == f.searchString);
            }
            if (!String.IsNullOrEmpty(f.BasvuruTuru))
            {
                q = q.Where(c => (c.BasvuruTuru == f.BasvuruTuru));

            }

            /*         if (!String.IsNullOrEmpty(dt.ToString()))
                    {
                        Console.WriteLine("ddsad das" + dt.ToString());
                        q = q.Where(x => x.basvuruBitisTarih > dt.Value);
                        //q = q.Where(c => c.basvuruBitisTarih >= dt);
                        //q = q.Where(s => (Convert.ToDateTime(s.basvuruBitisTarih) <= dt));
                    }
         */

            if (!String.IsNullOrEmpty(f.UserId))
            {
                q = q.Where(c => c.UserId == Convert.ToInt32(f.UserId));
            }


            return q;
        }








        private IQueryable<SelectedBasvuru> SetaddUserOrderBy(IQueryable<SelectedBasvuru> q, OrderBy ob)
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
        private IQueryable<Basvuru> SetPaginator(IQueryable<Basvuru> q, Paginator p)
        {
            if (p == null)
            {
                return q;
            }
            return q.Skip(p.offset).Take(p.limit);
        }

        private IQueryable<SelectedBasvuru> SetaddUserFilter(IQueryable<SelectedBasvuru> q, BasvuruFilter f)
        {
            if (f == null)
            {
                return q;
            }
            if (!String.IsNullOrEmpty(f.searchString))
            {

                q = q.Where(x => x.Durum == f.searchString);
            }

            return q;
        }


        private IQueryable<SelectedBasvuru> SetaddUserPaginator(IQueryable<SelectedBasvuru> q, Paginator p)
        {
            if (p == null)
            {
                return q;
            }
            return q.Skip(p.offset).Take(p.limit);
        }




    }
}