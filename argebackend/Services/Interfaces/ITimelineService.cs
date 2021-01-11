using System.Collections.Generic;
using System.Threading.Tasks;
using argebackend.Models;
using argebackend.ViewModels;

namespace argebackend.Services.Interfaces
{
    public interface ITimelineService : ICrudService<Timeline, BaseFilter>
    {
        Task<ProcessResult<List<Timeline>>> SelectedBasvuruIdAsnc(long id);
    }
}