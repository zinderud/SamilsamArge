using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Collections.Generic;
using argebackend.Models;
using argebackend.Services.Interfaces;
using argebackend.ViewModels;

namespace argebackend.Controllers
{
    [Route("api/kontrol")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(List<string>), 400)]
    public class KontrolController : BaseController
    {
        private readonly IKontrolService _KontrolService;
        private readonly ILogger<KontrolController> _logger;

        public KontrolController(UserManager<ApplicationUser> userManager,
                              IKontrolService KontrolService,
                              ILogger<KontrolController> logger)
            : base(userManager)
        {
            this._KontrolService = KontrolService;
            this._logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(typeof(string), 200)]
        /*    [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] Kontrol model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _KontrolService.CreateAsync(model);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Kontrol), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Retrieve([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _KontrolService.RetrieveAsync(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(typeof(string), 200)]
        /*   [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Update([FromRoute] long id, [FromBody] Kontrol model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _KontrolService.UpdateAsync(id, model);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpDelete("{id}")]
        [ProducesResponseType(typeof(string), 200)]
        /*   [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Delete([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _KontrolService.DeleteAsync(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<Kontrol>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> List([FromQuery] GetListViewModel<BaseFilter> listModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _KontrolService.ListAsync(listModel);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);

        }

        [HttpGet("listOnlyManager")]
        [ProducesResponseType(typeof(List<Kontrol>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> listOnlyManager([FromQuery] GetListViewModel<BaseFilter> listModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _KontrolService.ListOnlyManagerAsync(listModel);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);

        }

        [HttpGet("count")]
        [ProducesResponseType(typeof(int), 200)]
        [Authorize(Roles = "Admin")]
        [AllowAnonymous]
        public async Task<IActionResult> Count(BaseFilter filter)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _KontrolService.CountAsync(filter);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);

        }



    }
}