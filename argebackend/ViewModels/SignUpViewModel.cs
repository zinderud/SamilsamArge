using System.ComponentModel.DataAnnotations;

namespace argebackend.ViewModels
{
    public class SignUpViewModel
    {
        [Required]
        public string Firstname { get; set; }
        [Required]
        public string Lastname { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Password { get; set; }

    }
}