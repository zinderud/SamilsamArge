using System.ComponentModel.DataAnnotations;

namespace argebackend.ViewModels
{
    public class UserUpdateViewModel
    {
        public long Id { get; set; } = 0;
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Tc { get; set; }
        public string Password { get; set; }
    }
}