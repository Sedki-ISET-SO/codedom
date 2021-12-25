package com.codedom.codedomserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@SpringBootApplication
@EnableJpaAuditing
public class CodedomServerApplication {

	public static void main(String[] args) {
		SpringApplication.run(CodedomServerApplication.class, args);
	}
}
