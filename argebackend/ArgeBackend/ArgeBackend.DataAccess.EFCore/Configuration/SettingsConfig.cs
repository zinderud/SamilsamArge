

using ArgeBackend.DataAccess.EFCore.Configuration.System;
using ArgeBackend.Entities;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace ArgeBackend.DataAccess.EFCore.Configuration
{
    public class SettingsConfig : BaseEntityConfig<Settings>
    {
        public SettingsConfig() : base("Settings")
        { }

        public override void Configure(EntityTypeBuilder<Settings> builder)
        {
            base.Configure(builder);

            builder.Property(obj => obj.ThemeName).IsRequired();
        }
    }
}
