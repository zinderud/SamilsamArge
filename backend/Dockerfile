

FROM mcr.microsoft.com/dotnet/core/aspnet:3.1-buster-slim AS base

LABEL author="zinderud"
WORKDIR /app
EXPOSE 80
EXPOSE 3001

FROM mcr.microsoft.com/dotnet/core/sdk:3.1-buster AS build
WORKDIR /src
COPY ["ArgeBackend/ArgeBackend.WebApiCore/ArgeBackend.WebApiCore.csproj", "ArgeBackend/ArgeBackend.WebApiCore/"]
COPY ["ArgeBackend/ArgeBackend.Utils/ArgeBackend.Utils.csproj", "ArgeBackend/ArgeBackend.Utils/"]
COPY ["ArgeBackend/ArgeBackend.Services.Infrastructure/ArgeBackend.Services.Infrastructure.csproj", "ArgeBackend/ArgeBackend.Services.Infrastructure/"]
COPY ["ArgeBackend/ArgeBackend.Services/ArgeBackend.Services.csproj", "ArgeBackend/ArgeBackend.Services/"]
COPY ["ArgeBackend/ArgeBackend.IdentityManagementCore/ArgeBackend.IdentityManagementCore.csproj", "ArgeBackend/ArgeBackend.IdentityManagementCore/"]
COPY ["ArgeBackend/ArgeBackend.Entities/ArgeBackend.Entities.csproj", "ArgeBackend/ArgeBackend.Entities/"]
COPY ["ArgeBackend/ArgeBackend.DTO/ArgeBackend.DTO.csproj", "ArgeBackend/ArgeBackend.DTO/"]
COPY ["ArgeBackend/ArgeBackend.DIContainerCore/ArgeBackend.DIContainerCore.csproj", "ArgeBackend/ArgeBackend.DIContainerCore/"]
COPY ["ArgeBackend/ArgeBackend.DataAccess.EFCore/ArgeBackend.DataAccess.EFCore.csproj", "ArgeBackend/ArgeBackend.DataAccess.EFCore/"]

RUN dotnet restore "ArgeBackend/ArgeBackend.WebApiCore/ArgeBackend.WebApiCore.csproj"
COPY . .
#WORKDIR "/ArgeBackend/ArgeBackend/ArgeBackend.WebApiCore"
RUN dotnet build "ArgeBackend/ArgeBackend.WebApiCore//ArgeBackend.WebApiCore.csproj" -c Release -o /app/build

FROM build AS publish
RUN dotnet publish "ArgeBackend/ArgeBackend.WebApiCore/ArgeBackend.WebApiCore.csproj" -c Release -o /app/publish

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .
ENTRYPOINT ["dotnet", "ArgeBackend.WebApiCore.dll"]


#docker build -t argebackend .
#docker run -d -p 5000:5000 --link my-postgres:postgres backend