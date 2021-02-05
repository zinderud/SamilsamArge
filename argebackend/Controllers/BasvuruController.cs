using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;
using System.Collections.Generic;
using argebackend.Models;
using argebackend.Services.Interfaces;
using argebackend.ViewModels;
using System;

namespace argebackend.Controllers
{
    [Route("api/basvuru")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(List<string>), 400)]
    public class BasvuruController : BaseController
    {
        private readonly IBasvuruService _BasvuruService;
        private readonly ILogger<BasvuruController> _logger;

        public BasvuruController(UserManager<ApplicationUser> userManager,
                              IBasvuruService BasvuruService,
                              ILogger<BasvuruController> logger)
            : base(userManager)
        {
            this._BasvuruService = BasvuruService;
            this._logger = logger;
        }

        [HttpPost]
        [ProducesResponseType(typeof(string), 200)]
        /*    [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Create([FromBody] BasvuruTuru model)
        {

            Console.WriteLine("ddddddddddddddddddddd" + model.basvuruTuru);
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _BasvuruService.CreateBasvuruTuruneAsync(model);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpGet("{id}")]
        [ProducesResponseType(typeof(Basvuru), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Retrieve([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _BasvuruService.RetrieveAsync(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpGet("selected/{id}")]
        [ProducesResponseType(typeof(Basvuru), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> selected([FromRoute] long id)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _BasvuruService.SelectedBasvuruAsnc(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }

        [HttpPatch("{id}")]
        [ProducesResponseType(typeof(string), 200)]
        /*   [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> Update([FromRoute] long id, [FromBody] Basvuru model)
        {


            if (!ModelState.IsValid)

                return BadRequest(ModelState);

            var result = await _BasvuruService.UpdateAsync(id, model);

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

            var result = await _BasvuruService.DeleteAsync(id);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }


        [HttpGet]
        [ProducesResponseType(typeof(List<Basvuru>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> List([FromQuery] GetListViewModel<BaseFilter> listModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _BasvuruService.ListAsync(listModel);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);

        }

        [HttpGet("useraddbasvuru")]
        [ProducesResponseType(typeof(List<Basvuru>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> UseraddBasvuruList([FromQuery] GetListViewModel<BaseFilter> listModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _BasvuruService.UseraddBassvuruListAsync(listModel);
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

            var result = await _BasvuruService.CountAsync(filter);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);

        }




        [HttpGet("userbasvurulist")]
        [ProducesResponseType(typeof(List<Basvuru>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> UserBasvuruList([FromQuery] GetListViewModel<BaseFilter> listModel)
        {
            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var result = await _BasvuruService.UserBasvuruListAsync(listModel);
            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);

        }


        [HttpPatch("updatedurum/{id}")]
        [ProducesResponseType(typeof(string), 200)]
        /*   [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> UpdateDurum([FromRoute] long id, [FromBody] string durum)
        {


            if (!ModelState.IsValid)

                return BadRequest(ModelState);

            var result = await _BasvuruService.UpdateDurumAsync(id, durum);

            if (!result.Succeeded)
                return BadRequest(result.Errors);

            return Ok(result);
        }


    }
}