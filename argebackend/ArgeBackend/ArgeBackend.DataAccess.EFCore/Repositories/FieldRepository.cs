using ArgeBackend.Entities;
using ArgeBackend.Services.Infrastructure.Repositories;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArgeBackend.DataAccess.EFCore.Repositories
{
    public class FieldRepository : BaseDeletableRepository<Field, DataContext>, IFieldRepository<Field>
    {
        public FieldRepository(DataContext context) : base(context)
        {
        }
    }
}
