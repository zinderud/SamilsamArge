

using System.Collections.Generic;

namespace ArgeBackend.Entities
{
    public class User : DeletableEntity
    {
        public string Login { get; set; }
        public string Password { get; set; }

        public string FirstName { get; set; }
        public string LastName { get; set; }

        public string Email { get; set; }
        public int? Age { get; set; }

        public string AddressStreet { get; set; }
        public string AddressCity { get; set; }
        public string AddressZipCode { get; set; }
        public double? AddressLat { get; set; }
        public double? AddressLng { get; set; }

        public string PhotoUrl { get; set; }
        public string role { get; set; }

        public virtual Settings Settings { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
        public virtual ICollection<UserClaim> Claims { get; set; }
        public virtual ICollection<Course> Courses { get; set; }
        public virtual ICollection<Notification> Notifications { get; set; }
        public virtual ICollection<ProgressTask> ProgressTasks { get; set; }
        public virtual ICollection<ApplicationForSession> ApplicationForSessions { get; set; }
    }
}
