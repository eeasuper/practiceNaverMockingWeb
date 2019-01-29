package com.nano.naver_m.services;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
//import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import com.nano.naver_m.models.User;
import com.nano.naver_m.repository.UserRepository;

@Component
public class SignUpService {
	@Autowired
	UserRepository repository;
//	@Autowired
//	private BCryptPasswordEncoder passwordEncoder;
	
//	SignUpService(UserRepository repository){
//		this.repository = repository;
//	}
//    @Bean
//    public BCryptPasswordEncoder passwordEncoder() {
//        BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
//        return bCryptPasswordEncoder;
//    }
    
	public User signup(HttpServletResponse res, User user){
//		String encryptedPassword = this.passwordEncoder.encode(user.getPassword());
//		user.setPassword(encryptedPassword);

		repository.save(user);
		return user;
	}
		
}
