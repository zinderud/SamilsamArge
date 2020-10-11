

using ArgeBackend.WebApiCore.Identity;
using ArgeBackend.DIContainerCore;
using ArgeBackend.Entities;
using ArgeBackend.Services.Infrastructure;
using Microsoft.Extensions.DependencyInjection;

namespace ArgeBackend.WebApiCore.Setup
{
    public class DependenciesConfig
    {
        public static void ConfigureDependencies(IServiceCollection services, string connectionString)
        {
            services.AddHttpContextAccessor();

            services.AddScoped<ICurrentContextProvider, CurrentContextProvider>();

            services.AddSingleton<JwtManager>();

            ContainerExtension.Initialize(services, connectionString);

            services.AddTransient<IAuthenticationService, AuthenticationService<User>>();
            services.AddTransient<IRoleService, RoleService<User, Role>>();
        }
    }
}
