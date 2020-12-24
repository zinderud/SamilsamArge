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
    [Route("api/bsvno")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(List<string>), 400)]
    public class BsvNoController : BaseController
    {
        private readonly IBsvNoService _BsvNoService;
        private readonly ILogger<BsvNoController> _logger;

        public BsvNoController(UserManager<ApplicationUser> userManager,
                              IBsvNoService BsvNoService,
                              ILogger<BsvNoController> logger)
            : base(userManager)
        {
            this._BsvNoService = BsvNoService;
            this._logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(typeof(string), 200)]
        /*    [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] BsvNo model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _BsvNoService.CreateAsync(model);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(BsvNo), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Retrieve([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _BsvNoService.RetrieveAsync(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(typeof(string), 200)]
        /*   [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Update([FromRoute] long id, [FromBody] BsvNo model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _BsvNoService.UpdateAsync(id, model);
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

            var result = await _BsvNoService.DeleteAsync(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<BsvNo>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> List([FromQuery] GetListViewModel<BaseFilter> listModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _BsvNoService.ListAsync(listModel);
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

            var result = await _BsvNoService.CountAsync(filter);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);

        }



    }
}