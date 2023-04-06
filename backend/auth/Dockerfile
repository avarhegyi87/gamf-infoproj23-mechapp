FROM openjdk:18
RUN mkdir /auth
WORKDIR /auth
ARG JAR_FILE=target/auth-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} auth.jar
CMD ["java", "-jar", "auth.jar"]
#################################################################################################################################
# docker build -t auth -f Dockerfile .                                                                                          #
# docker run -p 9501 -d auth                                                                                                    #
# -t = tag                                                                                                                      #
# -f = Dockerfile                                                                                                               #
# -p = port -> ezt exposoljuk a www-nek (itt 9501, mert a service gateway mögött van)                                           #
# -d = detached -> background process, Dockerben lehet megnézni a service-t, ha simán írjuk, akkor elveszi a terminal sessionünk# 
#################################################################################################################################
