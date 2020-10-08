

using ArgeBackend.Entities;
using System.Threading.Tasks;

namespace ArgeBackend.Services.Infrastructure
{
    public interface IRoleRepository<TRole> where TRole : Role
    {
        Task Delete(int id, ContextSession session);
        Task<TRole> Get(int id, ContextSession session);
        Task<TRole> Get(string name, ContextSession session);
        Task<TRole> Edit(TRole role, ContextSession session);
    }
}