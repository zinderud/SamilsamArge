using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Collections.Generic;
using argebackend.Models;
using argebackend.Services.Interfaces;
using argebackend.ViewModels;
using Hangfire;
using System;

namespace argebackend.Controllers
{
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(List<string>), 400)]
    public class UserController : BaseController
    {

        private readonly IUserService _userService;
        private readonly ILogger<UserController> _logger;

        private readonly UserManager<ApplicationUser> _userManager;
        private readonly SignInManager<ApplicationUser> _signInManager;
        private readonly IEmailService _emailService;
        public UserController(UserManager<ApplicationUser> userManager,
                              IUserService userService,
                              IEmailService emailService,
                               SignInManager<ApplicationUser> signInManager,
                              ILogger<UserController> logger)
            : base(userManager)
        {
            this._userService = userService;
            this._userManager = userManager;
            this._signInManager = signInManager;
            this._logger = logger;
            this._emailService = emailService;
        }

        [HttpPost]
        [ProducesResponseType(typeof(string), 200)]
        /*   [Authorize(Roles = "Admin")] */
        public async Task<IActionResult> Create([FromBody] UserViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByEmailAsync(model.Email);
            var userTC = await _userManager.FindByEmailAsync(model.Tc);

            if (user != null)
                return BadRequest("Hata zaten bu e-postaya sahip bir kullanıcı var.");
            if (userTC != null)
                return BadRequest("Hata zaten bu Kimlik noya  sahip bir kullanıcı var.");

            var newUser = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Email,
                Firstname = model.Firstname,
                Lastname = model.Lastname,
                Tc = model.Tc

            };

            var result = await _userManager.CreateAsync(newUser, model.Password);

            if (result.Succeeded)
            {
                var resultrole = await _userManager.AddToRolesAsync(newUser, new List<string>() { "User" });
                if (!resultrole.Succeeded)
                    return BadRequest(result.Errors);
            }

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpPatch]
        [ProducesResponseType(typeof(string), 200)]
        /*  [Authorize(Roles = "Admin")] */
        public async Task<IActionResult> Update([FromBody] UserUpdateViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByIdAsync(model.Id.ToString());
            var userTC = await _userManager.FindByEmailAsync(model.Tc);

            if (user != null && user.Id != model.Id)
                return BadRequest("Bu kimlige ait bir kullanıcı mevcut");
            if (userTC != null)
                return BadRequest("Hata zaten bu Kimlik noya  sahip bir kullanıcı var.");

            if (user == null)
                return BadRequest("Rol bulunamadı");

            user.Email = model.Email;
            user.Firstname = model.Firstname;
            user.Lastname = model.Lastname;
            user.Tc = model.Tc;

            if (model.Password != "")
            {
                var newPassword = _userManager.PasswordHasher.HashPassword(user, model.Password);
                user.PasswordHash = newPassword;
            }

            var result = await _userManager.UpdateAsync(user);



            if (!result.Succeeded)
                return BadRequest(result.Errors);


            return Ok(result);
        }

        [HttpDelete]
        [ProducesResponseType(typeof(string), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> RemoveOrRestore(UserIdViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByIdAsync(model.Id.ToString());

            var result = await _userManager.DeleteAsync(user);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpGet]
        [ProducesResponseType(typeof(RoleViewModel), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetById(UserIdViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userManager.FindByIdAsync(model.Id.ToString());



            return Ok(result);
        }

        [HttpGet]
        [ProducesResponseType(typeof(RoleViewModel), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> GetRolesByUser(UserIdViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByIdAsync(model.Id.ToString());
            var result = await _userManager.GetRolesAsync(user);

            return Ok(result);
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<RoleViewModel>), 200)]
        [Authorize(Roles = "Admin,Manager")]
        public async Task<IActionResult> List(RoleFilterViewModel model)

        {
            _logger.Log(LogLevel.Information, "istek yapan {0}", CurrentUser);

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.GetListAsync(model.sortOrder, model.searchString, model.pageIndex, model.pageSize);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            var countItems = await _userService.CountAsync(model.searchString);

            return Ok(result);

        }

        [HttpGet]
        [ProducesResponseType(typeof(int), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> Count()
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.CountAsync("");
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            var countItems = await _userService.CountAsync("");

            return Ok(result);

        }

        [HttpPost]
        [ProducesResponseType(typeof(int), 200)]
        [Authorize(Roles = "Admin")]
        public async Task<IActionResult> AddRole([FromBody] AddRoleToUserViewModel model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var user = await _userManager.FindByIdAsync(model.UserId.ToString());

            if (user == null)
                return BadRequest("Kullanıcı bulunamadı");

            var roles = await _userManager.GetRolesAsync(user);

            await _userManager.RemoveFromRolesAsync(user, roles);

            var result = await _userManager.AddToRolesAsync(user, model.roles);


            if (!result.Succeeded)
                return BadRequest("Rol ekleme hatası");

            return Ok(result);

        }

        [HttpPost]
        [AllowAnonymous]
        [ProducesResponseType(typeof(string), 200)]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                if (user != null)
                {
                    var token = await _userManager.GeneratePasswordResetTokenAsync(user);

                    // var passwordResetLink = Url.Action("ResetPassword", "Account", new { email = model.Email, token = token }, Request.Scheme);
                    string passwordResetLink = Url.Action("ConfirmEmail", "Account", new { userid = user.Id, token = token });

                    /*   _logger.Log(LogLevel.Warning, passwordResetLink); */

                    /*    BackgroundJob.Enqueue<IEmailService>(x => x.SendEmailAsync(user.UserName, user.Email, "Şifre Sıfırlama",
                          $"<a href=\"{passwordResetLink}\">Şifreyi sıfırlamak için linke tıklayın.</a>"));
    */

                    await this._emailService.SendEmailAsync(user.UserName, user.Email, "Şifre Sıfırlama",
                                         $"<a href=\"{passwordResetLink}\">Şifreyi sıfırlamak için linke tıklayın.</a>");
                    Console.WriteLine("token" + token + "passwordResetLink" + passwordResetLink);
                    return Ok(passwordResetLink + " res" + "token=" + token); ;
                }

                return Ok("Şifre Sıfırlama");
            }

            return Ok("Şifre Sıfırlama 1");
        }



        [HttpPost]
        [AllowAnonymous]
        public async Task<IActionResult> ResetPassword(ResetPasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.FindByEmailAsync(model.Email);

                if (user != null)
                {
                    var result = await _userManager.ResetPasswordAsync(user, model.Token, model.Password);

                    if (result.Succeeded)
                    {
                        if (await _userManager.IsLockedOutAsync(user))
                        {
                            await _userManager.SetLockoutEndDateAsync(user, DateTimeOffset.UtcNow);
                        }

                        return View("ResetPasswordConfirmation");
                    }

                    foreach (var error in result.Errors)
                    {
                        ModelState.AddModelError("", error.Description);
                    }

                    return View(model);
                }

                return View("ResetPasswordConfirmation");
            }

            return View(model);
        }


        [HttpPost]
        public async Task<IActionResult> ChangePassword(ChangePasswordViewModel model)
        {
            if (ModelState.IsValid)
            {
                var user = await _userManager.GetUserAsync(User);

                if (user == null)
                {
                    return RedirectToAction("Login");
                }

                var result = await _userManager.ChangePasswordAsync(user, model.CurrentPassword, model.NewPassword);

                if (result.Succeeded)
                {
                    await _signInManager.RefreshSignInAsync(user);
                    return View("ChangePasswordConfirmation");
                }

                foreach (var error in result.Errors)
                {
                    ModelState.AddModelError("", error.Description);
                }

                return View();
            }

            return View(model);
        }



        [HttpGet()]
        [ProducesResponseType(typeof(IList<ApplicationUser>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Usersroles(string role = "Manager")
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _userService.UsersInRole(role);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);

        }

    }

}