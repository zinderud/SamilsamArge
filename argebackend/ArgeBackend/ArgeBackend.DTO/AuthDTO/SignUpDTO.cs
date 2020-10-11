

namespace ArgeBackend.DTO
{
    public class SignUpDTO : LoginDTO
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ConfirmPassword { get; set; }
        public string role { get; set; }
    }
}