(cd $PWD/service-discovery && mvn clean package && docker build -t service-discovery -f Dockerfile .)
(cd $PWD/gateway && mvn clean package && docker build -t gateway -f Dockerfile .) 
(cd $PWD/auth && mvn clean package && docker build -t auth -f Dockerfile .) 
(cd $PWD/customer && mvn clean package && docker build -t customer -f Dockerfile .) 
docker compose up --detach
