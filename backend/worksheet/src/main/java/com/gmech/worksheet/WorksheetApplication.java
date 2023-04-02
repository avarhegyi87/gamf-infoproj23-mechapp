package com.gmech.worksheet;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;

@SpringBootApplication
@EnableDiscoveryClient
public class WorksheetApplication {

	public static void main(String[] args) {
		SpringApplication.run(WorksheetApplication.class, args);
	}

}
