#dockerfile kullanımı

docker build -t backend .

docker image ls
docker run  --name backend --env ASPNETCORE_ENVIRONMENT=Development -p 5000:5000 backend:lastest

dotnet run --server.urls=http://10.55.25.197:5000

docker run -d --name postgres -p 5432:5432 -e POSTGRES_PASSWORD=password -v postgres-db:/var/lib/postgresql/data postgres


docker run -it --rm -p 127.0.0.1:8080:8080 -p 127.0.0.1:25482:25482  --link postgres:postgres  taivokasper/omnidb 
