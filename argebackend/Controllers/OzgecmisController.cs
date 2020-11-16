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
    [Route("api/Ozgecmiss")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(List<string>), 400)]
    public class OzgecmisController : BaseController
    {
        private readonly IOzgecmisService _OzgecmisService;
        private readonly ILogger<OzgecmisController> _logger;

        public OzgecmisController(UserManager<ApplicationUser> userManager,
                              IOzgecmisService OzgecmisService,
                              ILogger<OzgecmisController> logger)
            : base(userManager)
        {
            this._OzgecmisService = OzgecmisService;
            this._logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(typeof(string), 200)]
        /*    [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] Ozgecmis model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _OzgecmisService.CreateAsync(model);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Ozgecmis), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Retrieve([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _OzgecmisService.RetrieveAsync(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(typeof(string), 200)]
        /*   [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Update([FromRoute] long id, [FromBody] Ozgecmis model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _OzgecmisService.UpdateAsync(id, model);
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

            var result = await _OzgecmisService.DeleteAsync(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<Ozgecmis>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> List([FromQuery] GetListViewModel<BaseFilter> listModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _OzgecmisService.ListAsync(listModel);
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

            var result = await _OzgecmisService.CountAsync(filter);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);

        }



    }
}