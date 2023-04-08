(cd $PWD/service-discovery && mvn clean package && docker build -t service-discovery -f Dockerfile .)
(cd $PWD/gateway && mvn clean package && docker build -t gateway -f Dockerfile .) 
(cd $PWD/auth && mvn clean package && docker build -t auth -f Dockerfile .) 
(cd $PWD/customer && mvn clean package && docker build -t customer -f Dockerfile .) 
(cd $PWD/vehicles && mvn clean package && docker build -t vehicles -f Dockerfile .) 
docker compose up --detach
docker rmi $(docker images --filter "dangling=true" -q --no-trunc) 2>/dev/null
rm  ~/.docker/config.json 