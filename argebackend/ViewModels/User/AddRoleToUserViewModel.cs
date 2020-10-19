using System.Collections.Generic;

namespace argebackend.ViewModels
{
    public class AddRoleToUserViewModel
    {
        public long UserId { get; set; }
        public List<string> roles { get; set; }
    }
}