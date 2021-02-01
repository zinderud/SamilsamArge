using System.Threading.Tasks;
using System.Collections.Generic;
using argebackend.Models;
using argebackend.ViewModels;

namespace argebackend.Services.Interfaces
{
    public interface IUserService
    {
        Task<ProcessResult<List<UserViewModel>>> GetListAsync(string sortOrder, string searchString, int pageIndex, int pageSize);
        Task<ProcessResult<int>> CountAsync(string searchString);
        Task<ProcessResult<IList<ApplicationUser>>> UsersInRole(string role);
    }
}