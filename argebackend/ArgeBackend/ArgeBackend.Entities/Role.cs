

using System.Collections.Generic;

namespace ArgeBackend.Entities
{
    public class Role : BaseEntity
    {
        public string Name { get; set; }

        public virtual ICollection<UserRole> UserRoles { get; set; }
    }
}
