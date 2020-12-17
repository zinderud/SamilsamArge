
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using System.Collections.Generic;
using argebackend.Models;
using argebackend.Services.Interfaces;
using Microsoft.Extensions.Hosting;
using System.IO;
using System;
using Microsoft.AspNetCore.StaticFiles;

namespace argebackend.Controllers
{
    [Authorize]
    [Route("api/[controller]/[action]")]
    [Produces("application/json")]
    [ProducesResponseType(typeof(List<string>), 400)]
    public class UploadDownloadController : ControllerBase
    {
        private const string UPLOADS_FOLDER = "Uploads";

        private readonly IHostEnvironment _hostEnvironment;

        public UploadDownloadController(IHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost]
        public async Task<ActionResult<IEnumerable<FileResponseModel>>> Upload()
        {
            var files = Request.Form.Files;
            string upload = Path.Combine(_hostEnvironment.ContentRootPath, UPLOADS_FOLDER);
            if (!Directory.Exists(upload))
                Directory.CreateDirectory(upload);

            var fileNames = new List<FileResponseModel>();
            foreach (var file in files)
            {
                if (file.Length > 0)
                {
                    string fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
                    string filePath = Path.Combine(upload, fileName);

                    using FileStream fileStream = new FileStream(filePath, FileMode.Create);
                    await file.CopyToAsync(fileStream);

                    fileNames.Add(new FileResponseModel { FileName = fileName });
                }
                else
                {
                    return BadRequest();
                }
            }
            return fileNames;

        }

        [HttpGet]
        public async Task<ActionResult<FileStream>> Download(string fileName, string downloadName)
        {
            string upload = Path.Combine(_hostEnvironment.ContentRootPath, UPLOADS_FOLDER);
            string file = Path.Combine(upload, fileName);

            if (!System.IO.File.Exists(file))
                return NotFound();

            MemoryStream memory = new MemoryStream();
            using FileStream stream = new FileStream(file, FileMode.Open);
            await stream.CopyToAsync(memory);
            memory.Position = 0;

            return File(memory, GetContentType(file), downloadName);
        }

        private static string GetContentType(string file)
        {
            FileExtensionContentTypeProvider provider = new FileExtensionContentTypeProvider();
            if (!provider.TryGetContentType(file, out string contentType))
            {
                contentType = "application/octet-stream";
            }
            return contentType;
        }
    }
}
