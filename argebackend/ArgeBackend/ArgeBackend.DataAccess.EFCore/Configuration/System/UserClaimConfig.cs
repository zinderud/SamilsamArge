

using ArgeBackend.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArgeBackend.DataAccess.EFCore.Configuration.System
{
    public class UserClaimConfig : BaseEntityConfig<UserClaim>
    {
        public UserClaimConfig() : base("UserClaims") { }

        public override void Configure(EntityTypeBuilder<UserClaim> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.ClaimType).IsRequired();
            builder.Property(obj => obj.ClaimValue).IsRequired();

            builder.Ignore(obj => obj.User);
        }
    }
}
