

using argebackend.Profiles;
using AutoMapper.Configuration;

namespace argebackend.Profiles
{
    public static class AutoMapperConfig
    {
        public static void Configure(MapperConfigurationExpression config)
        {
            config.AllowNullCollections = false;

            //   config.AddProfile<ArastirmaProfile>();

        }
    }
}
