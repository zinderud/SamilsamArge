using System.ComponentModel.DataAnnotations;

namespace argebackend.ViewModels
{
    public class RoleViewModel
    {
        public long Id { get; set; } = 0;
        [Required]
        public string Name { get; set; }
    }
}