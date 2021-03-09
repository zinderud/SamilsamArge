using System.Collections.Generic;
using System.Threading.Tasks;
using argebackend.Models;
using argebackend.ViewModels;

namespace argebackend.Services.Interfaces
{
    public interface IKontrolService : ICrudService<Kontrol, BaseFilter>
    {

        Task<ProcessResult<List<Kontrol>>> ListOnlyManagerAsync(GetListViewModel<BaseFilter> getListModel);
    }
}