FROM mcr.microsoft.com/dotnet/core/sdk:3.1 AS build
LABEL author="zinderud"
ENV DOTNET_USE_POLLING_FILE_WATCHER=1
ENV ASPNETCORE_URLS=http://*:5000
WORKDIR /build
COPY . .
RUN dotnet restore
RUN dotnet publish -c Release -o /app

# Stage 2
FROM mcr.microsoft.com/dotnet/core/aspnet:3.1 AS final
WORKDIR /app
EXPOSE 5000
COPY --from=build /app .
ENTRYPOINT ["dotnet", "ArgeBackend.dll"]



# Start the dotnet application on port 5000.
#CMD ["dotnet", "run", "--server.urls", "http://localhost:5000"]

# docker build -t backend .
# docker run -d -p 5000:80 --link my-postgres:postgres backend

# docker run   -p 5000:5000 backend:latest

# Option 1
# Start PostgreSQL and ASP.NET Core (link ASP.NET core to ProgreSQL container with legacy linking)

# docker run -d  --name my-postgres -p 5432:5432  -e POSTGRES_PASSWORD=password  POSTGRES_USERNAME=postgres postgres 
# docker run -d -p 5432:5432 --name my-postgres -e POSTGRES_PASSWORD=password postgres
# docker run -d -p 5000:80 --link my-postgres:postgres backend



#docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -v postgres-db:/var/lib/postgresql/data postgres