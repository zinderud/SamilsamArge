

using ArgeBackend.DTO;
using System.Threading.Tasks;

namespace ArgeBackend.Services.Infrastructure
{
    public interface ISettingsService
    {
        Task<SettingsDTO> GetById(int id);

        Task<SettingsDTO> Edit(SettingsDTO settings);
    }
}