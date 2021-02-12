using System.Collections.Generic;
using System.Threading.Tasks;
using argebackend.Models;
using argebackend.ViewModels;

namespace argebackend.Services.Interfaces
{
    public interface IBasvuruService : ICrudService<Basvuru, BasvuruFilter>
    {
        Task<ProcessResult> CreateBasvuruTuruneAsync(BasvuruTuru model);
        Task<ProcessResult<SelectedBasvuru>> SelectedBasvuruAsnc(long id);
        Task<ProcessResult<List<SelectedBasvuru>>> UseraddBassvuruListAsync(GetListViewModel<BasvuruFilter> getListModel);
        Task<ProcessResult<List<Basvuru>>> UserBasvuruListAsync(GetListViewModel<BasvuruFilter> getListModel);
        Task<ProcessResult> UpdateDurumAsync(long id, Basvuru model);
    }
}