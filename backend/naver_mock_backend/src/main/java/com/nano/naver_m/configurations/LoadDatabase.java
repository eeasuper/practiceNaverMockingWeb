package com.nano.naver_m.configurations;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.nano.naver_m.models.User;
import com.nano.naver_m.repository.UserRepository;

@Configuration
public class LoadDatabase {
	Logger logger = LoggerFactory.getLogger(LoadDatabase.class);
	
	@Bean
	CommandLineRunner initDatabase(UserRepository repository) {
		logger.info("Preloading "+ repository.save(new User("name","username", "password","email@email.com")));
		return null;
	}
}
