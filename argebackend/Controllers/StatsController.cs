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
    [Route("api/stats")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(List<string>), 400)]
    public class StatsController : BaseController
    {
        private readonly IStatsService _StatsService;
        private readonly ILogger<StatsController> _logger;

        public StatsController(UserManager<ApplicationUser> userManager,
                              IStatsService StatsService,
                              ILogger<StatsController> logger)
            : base(userManager)
        {
            this._StatsService = StatsService;
            this._logger = logger;
        }



        [HttpGet("basvuruCountStats")]
        [ProducesResponseType(typeof(List<CountStats>), 200)]
        /*  [Authorize(Roles = "Admin")] */
        [AllowAnonymous]
        public async Task<IActionResult> UseraddStatsList()
        {

            var result = await _StatsService.BasvuruCountStats();


            return Ok(result);

        }




    }
}