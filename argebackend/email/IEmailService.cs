using System.Threading.Tasks;

namespace argebackend
{
    public interface IEmailService
    {
        Task SendEmailAsync(string toName,
                            string toEmailAddress,
                            string subject,
                            string message);
    }
}
