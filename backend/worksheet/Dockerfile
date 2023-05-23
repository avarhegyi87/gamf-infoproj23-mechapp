FROM openjdk:18
RUN mkdir /worksheet
WORKDIR /worksheet
ARG JAR_FILE=target/worksheet-0.0.1-SNAPSHOT.jar
ADD ${JAR_FILE} worksheet.jar
CMD ["java", "-jar", "worksheet.jar"]
#################################################################################################################################
# docker build -t worksheet -f Dockerfile .                                                                                          #
# docker run -p 9506 -d worksheet                                                                                                   #
# -t = tag                                                                                                                      #
# -f = Dockerfile                                                                                                               #
# -p = port -> ezt exposoljuk a www-nek (itt 9505, mert a service gateway mögött van)                                           #
# -d = detached -> background process, Dockerben lehet megnézni a service-t, ha simán írjuk, akkor elveszi a terminal sessionünk# 
#################################################################################################################################
