using System.Threading.Tasks;
using System.Collections.Generic;
using argebackend.Models;
using argebackend.ViewModels;

namespace argebackend.Services.Interfaces
{
    public interface IRoleService
    {
        Task<ProcessResult<List<RoleViewModel>>> GetListAsync(string sortOrder, string searchString, int pageIndex, int pageSize);
        Task<ProcessResult<int>> CountAsync(string searchString);

    }
}