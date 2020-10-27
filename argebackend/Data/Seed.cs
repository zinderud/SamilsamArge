using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using argebackend.Models;
using argebackend.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

namespace argebackend.Data
{
    public static class Seed
    {
        public static async Task CreateRoles(IServiceProvider serviceProvider, IConfiguration Configuration)
        {
            // Adding customs roles
            var RoleManager = serviceProvider.GetRequiredService<RoleManager<ApplicationRole>>();
            var UserManager = serviceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            string[] roleNames = { "Admin", "Manager", "User" };
            IdentityResult roleResult;

            foreach (var roleName in roleNames)
            {
                // creating the roles and seeding them to the database
                var roleExist = await RoleManager.RoleExistsAsync(roleName);
                if (!roleExist)
                {
                    ApplicationRole role = new ApplicationRole();
                    role.Name = roleName;
                    roleResult = await RoleManager.CreateAsync(role);
                }
            }

            #region admin   

            // Creating a super user who could maintain the web app
            var poweruser = new ApplicationUser
            {
                UserName = Configuration["SuperUser:username"],
                Email = Configuration["SuperUser:email"],
                Firstname = Configuration["SuperUser:firstname"],
                Lastname = Configuration["SuperUser:lastname"],
                Tc = Configuration["SuperUser:TC"]
            };

            string userPassword = Configuration["SuperUser:password"];

            var user = await UserManager.FindByEmailAsync(Configuration["SuperUser:email"]);

            if (user == null)
            {
                var createPowerUser = await UserManager.CreateAsync(poweruser, userPassword);
                if (createPowerUser.Succeeded)
                {
                    // Here we assign the new user the "Admin" role 
                    await UserManager.AddToRoleAsync(poweruser, "Admin");
                }
            }

            #endregion
            #region manager   

            // Creating a manager who could maintain the web app
            var poweruser1 = new ApplicationUser
            {
                UserName = Configuration["Manager:username"],
                Email = Configuration["Manager:email"],
                Firstname = Configuration["Manager:firstname"],
                Lastname = Configuration["Manager:lastname"],
                Tc = Configuration["Manager:TC"]
            };

            string userPassword1 = Configuration["Manager:password"];

            var user1 = await UserManager.FindByEmailAsync(Configuration["Manager:email"]);

            if (user1 == null)
            {
                var createPowerUser = await UserManager.CreateAsync(poweruser1, userPassword1);
                if (createPowerUser.Succeeded)
                {
                    // Here we assign the new user the "Manager" role 
                    await UserManager.AddToRoleAsync(poweruser1, "Manager");
                }
            }

            #endregion

            #region User   

            // Creating a   user who could maintain the web app
            var poweruser2 = new ApplicationUser
            {
                UserName = Configuration["User:username"],
                Email = Configuration["User:email"],
                Firstname = Configuration["User:firstname"],
                Lastname = Configuration["User:lastname"],
                Tc = Configuration["User:TC"]
            };

            string userPassword2 = Configuration["User:password"];

            var user2 = await UserManager.FindByEmailAsync(Configuration["User:email"]);

            if (user2 == null)
            {
                var createPowerUser = await UserManager.CreateAsync(poweruser2, userPassword2);
                if (createPowerUser.Succeeded)
                {
                    // Here we assign the new user the "User" role 
                    await UserManager.AddToRoleAsync(poweruser2, "User");
                }
            }

            #endregion

        }

        public async static void Initialize(ApplicationDbContext context)
        {

            #region person
            List<Person> personList = new List<Person>();
            personList.Add(new Person
            {
                name = "Ahmet",
                surname = "Bilir",
                email = "sad@sade.com",
                phone = 55451211,
                unit = "Asarcık",
                title = "ATT",
                isArchived = false
            });
            personList.Add(new Person
            {
                name = "Cemal",
                surname = "Bilir",
                email = "sad1@sade.com",
                phone = 55451212,
                unit = "Kavak",
                title = "ATT",
                isArchived = false
            });
            personList.Add(new Person
            {
                name = "Kemal",
                surname = "Bilir",
                email = "sad2@sade.com",
                phone = 55451213,
                unit = "Havza",
                title = "ATT",
                isArchived = false
            });
            personList.Add(new Person
            {
                name = "İbrahim",
                surname = "Bilir",
                email = "sad3@sade.com",
                phone = 55451214,
                unit = "Havza",
                title = "Hekim",
                isArchived = false
            });

            personList.Add(new Person
            {
                name = "Busra",
                surname = "Bilir",
                email = "sad4@sade.com",
                phone = 554512111,
                unit = "Asarcık",
                title = "Hekim",
                isArchived = false
            });
            personList.Add(new Person
            {
                name = "İsa",
                surname = "Bilir",
                email = "sad5@sade.com",
                phone = 554512123,
                unit = "Kavak",
                title = "Hekim",
                isArchived = false
            });
            personList.Add(new Person
            {
                name = "Ceren",
                surname = "Bilir",
                email = "sad6@sade.com",
                phone = 554512143,
                unit = "Havza",
                title = "Hekim",
                isArchived = false
            });
            personList.Add(new Person
            {
                name = "İbrahim",
                surname = "Bilir",
                email = "sad7@sade.com",
                phone = 554512155,
                unit = "Havza",
                title = "Hekim",
                isArchived = false
            });


            if (!context.Persons.Any())
            {

                foreach (var item in personList)
                {
                    var personset = await context.Persons.AddAsync(item);
                    context.SaveChanges();
                }


            }
            #endregion




        }
    }
}