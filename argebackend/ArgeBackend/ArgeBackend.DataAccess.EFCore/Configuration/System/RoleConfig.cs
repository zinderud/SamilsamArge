

using ArgeBackend.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArgeBackend.DataAccess.EFCore.Configuration.System
{
    public class RoleConfig : BaseEntityConfig<Role>
    {
        public RoleConfig() : base("Roles") { }

        public override void Configure(EntityTypeBuilder<Role> builder)
        {
            base.Configure(builder);
            builder.Property(obj => obj.Name);

            builder
                .HasMany(r => r.UserRoles)
                .WithOne()
                .HasForeignKey(ur => ur.RoleId)
                .IsRequired();
        }
    }
}
