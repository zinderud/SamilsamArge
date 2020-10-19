using System.Threading.Tasks;
using argebackend.Models;
using Microsoft.AspNetCore.Http;

namespace argebackend.Services.Interfaces
{
    public interface IFileService
    {
        Task<ProcessResult<string>> UploadAsync(IFormFile file);
    }
}