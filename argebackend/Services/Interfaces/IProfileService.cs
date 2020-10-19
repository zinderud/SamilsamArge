using System.Threading.Tasks;
using argebackend.Models;
using argebackend.ViewModels;

namespace argebackend.Services.Interfaces
{
    public interface IProfileService
    {
        Task<ProcessResult<ProfileViewModel>> GetProfileAsync();

    }
}