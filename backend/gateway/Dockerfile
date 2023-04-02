FROM openjdk:18
RUN mkdir /gateway
WORKDIR /gateway
ARG JAR_FILE=target/gateway-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} gateway.jar
CMD ["java", "-jar", "gateway.jar"]
#################################################################################################################################
# docker build -t gateway -f Dockerfile .                                                                                       #
# docker run -p 8080:8080 -d gateway                                                                                            #
# -t = tag                                                                                                                      #
# -f = Dockerfile                                                                                                               #
# -p = port -> ezt exposoljuk a www-nek                                                                                         #
# -d = detached -> background process, Dockerben lehet megnézni a service-t, ha simán írjuk, akkor elveszi a terminal sessionünk# 
#################################################################################################################################
