using System.ComponentModel.DataAnnotations;

namespace argebackend.ViewModels
{
    public class ForgotPasswordViewModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; }
    }
}