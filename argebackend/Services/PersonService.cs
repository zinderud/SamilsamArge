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

namespace argebackend.Services
{
    public class PersonService : BaseService, IPersonService
    {

        public PersonService(UserManager<ApplicationUser> userManager, IHttpContextAccessor contextAccessor, ApplicationDbContext context, ILogger<BaseService> logger) : base(userManager, contextAccessor, context, logger)
        {

        }

        public async Task<ProcessResult> CreateAsync(Person model)
        {
            Func<Task> action = async () =>
            {


                var PersonExist = await context.Persons.Where(x => x.email == model.email && x.Id != model.Id).CountAsync();


                if (PersonExist > 0)
                {
                    throw new InvalidOperationException("Bu email mevcut");
                }

                var PersonEntity = await GetOrCreateEntityAsync(context.Persons, x => x.Id == model.Id);
                var Person = PersonEntity.result;

                Person.name = model.name;
                Person.surname = model.surname;
                Person.email = model.email;

                Person.title = model.title;
                Person.phone = model.phone;
                Person.unit = model.unit;
                Person.departmentId = model.departmentId;
                Person.isArchived = false;// oluştururken otomatik olarak false yaptık

                await context.SaveChangesAsync();
            };
            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult<Person>> RetrieveAsync(long id)
        {
            Func<Task<Person>> action = async () =>
            {
                var result = await context.Persons.Where(x => x.Id == id).FirstAsync();
                return result;
            };

            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult> UpdateAsync(long id, Person model)
        {
            model.Id = id;

            Func<Task> action = async () =>
            {
                var PersonExist = await context.Persons.Where(x => x.email == model.email && x.Id != model.Id).CountAsync();

                if (PersonExist > 0)
                {
                    throw new InvalidOperationException("Bu email mevcut");
                }

                var PersonEntity = await GetOrCreateEntityAsync(context.Persons, x => x.Id == model.Id);
                var Person = PersonEntity.result;


                Person.name = model.name;
                Person.surname = model.surname;
                Person.email = model.email;
                Person.title = model.title;
                Person.phone = model.phone;
                Person.unit = model.unit;
                Person.departmentId = model.departmentId;
                Person.isArchived = Person.isArchived;
                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }

        public async Task<ProcessResult> DeleteAsync(long id)
        {
            Func<Task> action = async () =>
            {
                var o = await context.Persons.Where(x => x.Id == id).SingleAsync();
                context.Persons.Remove(o);
                await context.SaveChangesAsync();
            };

            return await Process.RunAsync(action);
        }


        public async Task<ProcessResult<List<Person>>> ListAsync(GetListViewModel<BaseFilter> getListModel)
        {
            IQueryable<Person> q = context.Persons;
            q = SetIncludes(q);
            q = SetFilter(q, getListModel.filter);

            var countItems = await q.CountAsync();

            q = SetPaginator(q, getListModel.paginator);
            q = SetOrderBy(q, getListModel.orderBy);

            Func<Task<List<Person>>> action = async () =>
            {
                var result = await q.ToListAsync();
                return result;
            };

            return await Process.RunAsync(action, countItems);
        }

        public async Task<ProcessResult<int>> CountAsync(BaseFilter filter)
        {
            IQueryable<Person> q = context.Persons;
            q = SetFilter(q, filter);

            Func<Task<int>> action = async () =>
            {
                var countItems = await q.CountAsync();
                return countItems;
            };

            return await Process.RunAsync(action);
        }

        private IQueryable<Person> SetIncludes(IQueryable<Person> q)
        {
            return q;
        }

        private IQueryable<Person> SetOrderBy(IQueryable<Person> q, OrderBy ob)
        {
            if (ob == null)
            {
                return q;
            }

            if (!ob.desc)
            {
                if (ob.by == "name")
                {
                    q = q.OrderBy(s => s.name);
                }
                else
                {
                    q = q.OrderBy(s => s.Id);
                }
            }
            else
            {
                if (ob.by == "name")
                {
                    q = q.OrderByDescending(s => s.name);
                }
                else
                {
                    q = q.OrderByDescending(s => s.Id);
                }
            }
            return q;
        }

        private IQueryable<Person> SetFilter(IQueryable<Person> q, BaseFilter f)
        {
            if (f == null)
            {
                return q;
            }
            if (!String.IsNullOrEmpty(f.searchString))
            {
                q = q.Where(s => s.name.Contains(f.searchString));
            }
            return q;
        }

        private IQueryable<Person> SetPaginator(IQueryable<Person> q, Paginator p)
        {
            if (p == null)
            {
                return q;
            }
            return q.Skip(p.offset).Take(p.limit);
        }




    }
}