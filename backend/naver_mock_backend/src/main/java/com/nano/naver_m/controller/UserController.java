package com.nano.naver_m.controller;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.linkTo;
import static org.springframework.hateoas.mvc.ControllerLinkBuilder.methodOn;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.hateoas.Resource;
import org.springframework.hateoas.Resources;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.nano.naver_m.assemblers.UserResource;
import com.nano.naver_m.assemblers.UserResourceAssembler;
import com.nano.naver_m.exceptions.UserNotFoundException;
import com.nano.naver_m.models.User;
import com.nano.naver_m.repository.UserRepository;
import com.nano.naver_m.services.SignInService;
import com.nano.naver_m.services.SignUpService;
import com.nano.naver_m.services.TokenAuthenticationService;
@RestController
//@CrossOrigin
public class UserController {
	private final UserRepository repository;
	private final UserResourceAssembler assembler;
	
	UserController(UserRepository repository, UserResourceAssembler assembler){
		this.repository = repository;
		this.assembler = assembler;
	}
	
	@Autowired
	SignUpService signupService;
	SignInService signinService;
//	TokenAuthenticationService tokenService;
	//Aggregate root
	
	@GetMapping("/users")
	public
	Resources<Resource<User>> all(){
		//create new UserResource object for each user found by findall().
		//put them all in a List to use stream() on. Then do rest of the code.
//		List<User> users = new ArrayList<User>();
		
//		repository.findAll().stream()
//				.forEach((user)->{
//					UserResource userRes = new UserResource(user.getToken(),user, user.getId());
//					users.add(userRes);
//				});
		List<Resource<User>> user = repository.findAll().stream().map(assembler::toResource)
				.collect(Collectors.toList());
		
		return new Resources<>(user,
					linkTo(methodOn(UserController.class).all()).withSelfRel());
				
	}
	
//	@CrossOrigin(origins = "http://localhost:3000")
//	@CrossOrigin
	@PostMapping("/register")
	ResponseEntity<?> newUser(@RequestBody User newUser, HttpServletResponse res) throws URISyntaxException {

		User user = signupService.signup(res, newUser);
		String jWTtoken = TokenAuthenticationService.addAuthentication(newUser);
//		UserResource userResource = new UserResource(jWTtoken,user,user.getId()); 
		
		Resource<User> resource = assembler.toResource(user);
		return ResponseEntity
				.created(new URI(resource.getId().expand().getHref()))
				.body(resource);
	}
	
	@PostMapping("/login")
	ResponseEntity<?> signIn(HttpServletResponse res, @PathVariable String username,  @PathVariable String password) throws URISyntaxException{
		User user = signinService.signIn(res, username, password);
		String jWTtoken= TokenAuthenticationService.addAuthentication(user);
//		UserResource userResource = new UserResource(jWTtoken,user,user.getId()); 
		
		Resource<User> resource = assembler.toResource(user);

		return ResponseEntity
				.created(new URI(resource.getId().expand().getHref()))
				.body(resource);
	}
	
	//Single item
	
	@GetMapping("/users/{id}")
	public
	User one(@PathVariable Long id) {

		return repository.findById(id)
			.orElseThrow(() -> new UserNotFoundException(id));
	}
	
	@PutMapping("/users/{id}")
	User replaceUser(@RequestBody User newUser, @PathVariable Long id) {

		return repository.findById(id)
			.map(user -> {
				user.setName(newUser.getName());
				user.setUsername(newUser.getUsername());
				user.setPassword(newUser.getPassword());
				user.setEmail(newUser.getEmail());
				return repository.save(user);
			})
			.orElseGet(() -> {
				newUser.setId(id);
				return repository.save(newUser);
			});
	}

	@DeleteMapping("/users/{id}")
	void deleteUser(@PathVariable Long id) {
		repository.deleteById(id);
	}
	
}
