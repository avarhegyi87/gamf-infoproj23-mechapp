FROM openjdk:18
RUN mkdir /quotation
WORKDIR /quotation
ARG JAR_FILE=target/quotation-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} quotation.jar
CMD ["java", "-jar", "quotation.jar"]
#################################################################################################################################
# docker build -t quotation -f Dockerfile .                                                                                          #
# docker run -p 9505 -d stock                                                                                                   #
# -t = tag                                                                                                                      #
# -f = Dockerfile                                                                                                               #
# -p = port -> ezt exposoljuk a www-nek (itt 9505, mert a service gateway mögött van)                                           #
# -d = detached -> background process, Dockerben lehet megnézni a service-t, ha simán írjuk, akkor elveszi a terminal sessionünk# 
#################################################################################################################################
