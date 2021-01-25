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
    [Route("api/timeline")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(List<string>), 400)]
    public class TimelineController : BaseController
    {
        private readonly ITimelineService _TimelineService;
        private readonly ILogger<TimelineController> _logger;

        public TimelineController(UserManager<ApplicationUser> userManager,
                              ITimelineService TimelineService,
                              ILogger<TimelineController> logger)
            : base(userManager)
        {
            this._TimelineService = TimelineService;
            this._logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(typeof(string), 200)]
        /*    [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] Timeline model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _TimelineService.CreateAsync(model);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Timeline), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Retrieve([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _TimelineService.RetrieveAsync(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(typeof(string), 200)]
        /*   [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Update([FromRoute] long id, [FromBody] Timeline model)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _TimelineService.UpdateAsync(id, model);
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

            var result = await _TimelineService.DeleteAsync(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<Timeline>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> List([FromQuery] GetListViewModel<BaseFilter> listModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _TimelineService.ListAsync(listModel);
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

            var result = await _TimelineService.CountAsync(filter);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);

        }


        [HttpGet("selected/{id}")]
        [ProducesResponseType(typeof(List<Timeline>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> selected([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _TimelineService.SelectedBasvuruIdAsnc(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }


        [HttpGet("selecttedPrivate/{id}")]
        [ProducesResponseType(typeof(List<Timeline>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> selecselecttedPrivateed([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _TimelineService.SelectedselecttedPrivateBasvuruIdAsnc(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }
    }
}