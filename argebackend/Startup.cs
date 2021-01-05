using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Hangfire;
using Swashbuckle.AspNetCore.Swagger;
using System.Text;
using Microsoft.AspNetCore.Http;
using argebackend.Models;
using argebackend.Services;
using argebackend.Services.Interfaces;
using System.Collections.Generic;
using Microsoft.OpenApi.Models;
using NLog;
using NLog.Extensions.Logging;
using NLog.Web;
using Hangfire.PostgreSql;
using AutoMapperConfiguration = AutoMapper.Configuration;
using argebackend.Profiles;
using Microsoft.AspNetCore.Server.Kestrel.Core;
using Microsoft.Extensions.FileProviders;
using System.IO;
using System.Linq;

namespace argebackend
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        private readonly string EnabledCORS = "_EnabledCORS";

        protected void ConfigureMapping(AutoMapperConfiguration.MapperConfigurationExpression config)
        {
            AutoMapperConfig.Configure(config);
        }
        public void ConfigureServices(IServiceCollection services)
        {

            RegisterMapping();
            services.AddControllers().AddNewtonsoftJson();

            services.AddMvc(options => options.EnableEndpointRouting = false);
            /*    services.AddDbContext<ApplicationDbContext>(
                               options => options.UseSqlServer(Configuration["Data:DbContext:DefaultConnection"])); */

            services.AddEntityFrameworkNpgsql()
               .AddDbContext<ApplicationDbContext>(options =>
                   options.UseNpgsql(Configuration["Data:DbContext:ConnectionString"]));

            services.AddMvc();
            ConfigureCustomServices(services);
            services.AddCors();
            services.AddCors(options =>
      {
          options.AddPolicy(EnabledCORS,
              builder =>
              {
                  // builder.WithOrigins("http://localhost:4201").AllowAnyHeader().AllowAnyMethod();
                  builder.AllowAnyOrigin().AllowAnyHeader().AllowAnyMethod();
              });
      });
            services.AddIdentity<ApplicationUser, ApplicationRole>(options =>
                 {
                     options.Password.RequiredLength = 6;
                     options.Password.RequireLowercase = false;
                     options.Password.RequireUppercase = false;
                     options.Password.RequireNonAlphanumeric = false;
                     options.Password.RequireDigit = false;
                     options.User.RequireUniqueEmail = true;

                 })
                 .AddEntityFrameworkStores<ApplicationDbContext>()
                 .AddDefaultTokenProviders();

            services.AddAuthentication(options =>
                {
                    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                })
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;

                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateIssuerSigningKey = true,
                        ValidateLifetime = true,

                        ValidIssuer = Configuration["JWT:ValidIssuer"],
                        ValidAudience = Configuration["JWT:ValidAudience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(Configuration["JWT:SecretKey"])),
                    };
                });
            /* 
                        services.AddHangfire(config =>
                                    config.UsePostgreSqlStorage(Configuration["Data:DbContext:ConnectionString"])); */

            /*            services.AddSwaggerGen(c =>
                       {
                           c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                           {
                               Description = "JWT Authorization header using the Bearer scheme. Example: \"Authorization: Bearer {token}\"",
                               Name = "Authorization",

                           });


                           c.SwaggerDoc("v1", new OpenApiInfo
                           {
                               Title = "RestFull API",
                               Version = "v1",
                               Contact = new OpenApiContact { Name = "zinderud", Email = "mokosam@gmail.com" }
                           });

                       }); */

            services.Configure<KestrelServerOptions>(options =>
{
    options.Limits.MaxRequestBodySize = int.MaxValue; // if don't set default value is: 30 MB
});
            services.Configure<IISServerOptions>(options =>
            {
                options.MaxRequestBodySize = int.MaxValue;
            });




        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {

            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();




            app.UseDefaultFiles();
            app.UseStaticFiles();
            app.UseStaticFiles(new StaticFileOptions()
            {
                OnPrepareResponse = ctx =>
                 {
                     ctx.Context.Response.Headers.Append(new KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>("Access-Control-Allow-Origin", "*"));
                     ctx.Context.Response.Headers.Append(new KeyValuePair<string, Microsoft.Extensions.Primitives.StringValues>("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept"));


                 },

                FileProvider = new PhysicalFileProvider(
           Path.Combine(Directory.GetCurrentDirectory(), @"Uploads")),
                RequestPath = new PathString("/Uploads")
            });
            app.UseCors(EnabledCORS);


            /*       app.UseSwagger();


                  app.UseSwaggerUI(c =>
                  {
                      c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
                  });
       */

            app.UseEndpoints(endpoints =>
           {
               endpoints.MapControllers();

           });
            /*      app.UseHangfireServer();
                 app.UseHangfireDashboard(); */

        }


        private void ConfigureCustomServices(IServiceCollection services)

        {

            services.AddSingleton<IEmailConfiguration>(Configuration.GetSection("EmailConfiguration").Get<EmailConfiguration>());
            services.AddTransient<IEmailService, EmailService>();
            services.AddTransient<IProfileService, ProfileService>();
            services.AddTransient<IFileService, FileService>();


            services.AddTransient<IUserService, UserService>();
            services.AddTransient<IRoleService, RoleService>();
            services.AddTransient<IPersonService, PersonService>();

            services.AddTransient<IOzgecmisService, OzgecmisService>();
            services.AddTransient<IBasvuruService, BasvuruService>();
            services.AddTransient<IBsvNoService, BsvNoService>();
            services.AddSingleton<ITokenService, TokenService>();
            services.AddSingleton<IHttpContextAccessor, HttpContextAccessor>();
            services.AddLogging(builder => builder.AddNLog());

        }


        private void RegisterMapping()
        {
            var config = new AutoMapperConfiguration.MapperConfigurationExpression();
            AutoMapperConfig.Configure(config);
            ConfigureMapping(config);
            AutoMapper.Mapper.Initialize(config);
        }
    }
}
