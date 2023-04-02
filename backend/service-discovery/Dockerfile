FROM openjdk:18
RUN mkdir /service-discovery
WORKDIR /service-discovery
ARG JAR_FILE=target/service-discovery-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} service-discovery.jar
CMD ["java", "-jar", "service-discovery.jar"]
#################################################################################################################################
# docker build -t service-discovery -f Dockerfile .                                                                             #
# docker run -p 8761:8761 -d service-discovery                                                                                  #
# -t = tag                                                                                                                      #
# -f = Dockerfile                                                                                                               #
# -p = port -> ezt exposoljuk a www-nek                                                                                         #
# -d = detached -> background process, Dockerben lehet megnézni a service-t, ha simán írjuk, akkor elveszi a terminal sessionünk# 
#################################################################################################################################
