

using ArgeBackend.Entities;

namespace ArgeBackend.Services.Infrastructure
{
    public interface ICurrentContextProvider
    {
        ContextSession GetCurrentContext();
    }
}
