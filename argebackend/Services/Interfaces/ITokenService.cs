using System.Collections.Generic;
using argebackend.Models;

namespace argebackend.Services.Interfaces
{
    public interface ITokenService
    {
        string Generate(ApplicationUser user, List<string> roles);
    }
}