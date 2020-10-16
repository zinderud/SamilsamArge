using System.Collections.Generic;
using System.Threading.Tasks;
using backend.Models;
using backend.ViewModels;

namespace backend.Services.Interfaces
{
    public interface IPersonService : ICrudService<Person, BaseFilter>
    {

    }
}