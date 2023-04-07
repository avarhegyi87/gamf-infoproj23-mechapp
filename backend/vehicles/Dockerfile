FROM openjdk:18
RUN mkdir /vehicles
WORKDIR /vehicles
ARG JAR_FILE=target/vehicles-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} vehicles.jar
CMD ["java", "-jar", "vehicles.jar"]
#################################################################################################################################
# docker build -t vehicles -f Dockerfile .                                                                                          #
# docker run -p 9503 -d vehicles                                                                                                   #
# -t = tag                                                                                                                      #
# -f = Dockerfile                                                                                                               #
# -p = port -> ezt exposoljuk a www-nek (itt 9503, mert a service gateway mögött van)                                           #
# -d = detached -> background process, Dockerben lehet megnézni a service-t, ha simán írjuk, akkor elveszi a terminal sessionünk# 
#################################################################################################################################
