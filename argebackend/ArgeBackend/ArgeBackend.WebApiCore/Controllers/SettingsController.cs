

using ArgeBackend.DTO;
using ArgeBackend.Services.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace ArgeBackend.WebApiCore.Controllers
{
    [Route("settings")]
    public class SettingsController : BaseApiController
    {
        protected readonly ISettingsService settingsService;
        public SettingsController(ISettingsService settingsService)
        {
            this.settingsService = settingsService;
        }

        [HttpGet]
        [Route("current")]
        public async Task<IActionResult> GetCurrentSetting()
        {
            var currentUserId = User.GetUserId();
            if (currentUserId > 0)
            {
                var result = await settingsService.GetById(currentUserId);
                return Ok(result);
            }

            return Unauthorized();
        }

        [HttpPut]
        [Route("current")]
        public async Task<IActionResult> EditCurrentSetting(SettingsDTO dto)
        {
            if (string.IsNullOrWhiteSpace(dto.ThemeName))
            {
                return BadRequest();
            }

            var currentUserId = User.GetUserId();
            if (currentUserId > 0)
            {
                dto.Id = currentUserId;
                var result = await settingsService.Edit(dto);
                return Ok(result);
            }

            return Unauthorized();
        }
    }
}