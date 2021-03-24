using NLog;

using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using argebackend.Data;
using Microsoft.Extensions.DependencyInjection;

namespace argebackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var logger = LogManager.LoadConfiguration("nlog.config").GetCurrentClassLogger();

            var host = BuildWebHost(args);

            using (var scope = host.Services.CreateScope())
            {
                var services = scope.ServiceProvider;

                try
                {
                    var serviceProvider = services.GetRequiredService<IServiceProvider>();
                    var configuration = services.GetRequiredService<IConfiguration>();
                    var context = services.GetRequiredService<ApplicationDbContext>();
                    Seed.CreateRoles(serviceProvider, configuration).Wait();

                    try
                    {
                        Seed.Initialize(context);
                    }
                    catch (Exception ex)
                    {

                        logger.Error(ex, ex.Message);
                    }
                    logger.Debug("init main");
                    host.Run();


                }
                catch (Exception ex)
                {
                    logger.Error(ex, "Stopped program because of exception");
                    throw;
                }
            }
        }

        public static IWebHost BuildWebHost(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                 .UseUrls("https://*:5000")
                .UseStartup<Startup>().UseKestrel()
                .Build();
    }
}

/* 
       .UseStartup<Startup>()
                .UseUrls(YourWebAppUrls)
                .UseKestrel()
                .ConfigureKestrel(options =>
                {
                    options.ListenAnyIP(51934);  // whatever your port
                })
                .UseIIS() */
