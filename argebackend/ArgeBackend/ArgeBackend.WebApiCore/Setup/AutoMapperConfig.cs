

using AutoMapper.Configuration;
using ArgeBackend.Services.Infrastructure.MappingProfiles;

namespace ArgeBackend.WebApiCore.Setup
{
    public static class AutoMapperConfig
    {
        public static void Configure(MapperConfigurationExpression config)
        {
            config.AllowNullCollections = false;

            config.AddProfile<UserProfile>();
            config.AddProfile<SettingsProfile>();

            config.AddProfile<FieldProfile>();
            config.AddProfile<CourseProfile>();
            config.AddProfile<CourseFieldProfile>();
            config.AddProfile<CourseRatingProfile>();
            config.AddProfile<CourseSessionProfile>();
            config.AddProfile<CourseTaskProfile>();
            config.AddProfile<NotificationProfile>();
            config.AddProfile<ProgressTaskProfile>();
            config.AddProfile<ApplicationForSessionProfile>();
            config.AddProfile<SessionTaskDateProfile>();
            config.AddProfile<DonationProfile>();
            config.AddProfile<DonationPostProfile>();
            config.AddProfile<DonationPostFieldProfile>();
        }
    }
}
