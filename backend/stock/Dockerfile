FROM openjdk:18
RUN mkdir /stock
WORKDIR /stock
ARG JAR_FILE=target/stock-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} stock.jar
CMD ["java", "-jar", "stock.jar"]
#################################################################################################################################
# docker build -t stock -f Dockerfile .                                                                                          #
# docker run -p 9504 -d stock                                                                                                   #
# -t = tag                                                                                                                      #
# -f = Dockerfile                                                                                                               #
# -p = port -> ezt exposoljuk a www-nek (itt 9504, mert a service gateway mögött van)                                           #
# -d = detached -> background process, Dockerben lehet megnézni a service-t, ha simán írjuk, akkor elveszi a terminal sessionünk# 
#################################################################################################################################
