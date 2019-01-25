package com.nano.naver_m.assemblers;

import org.springframework.hateoas.Resource;
import org.springframework.hateoas.ResourceAssembler;
import org.springframework.hateoas.ResourceSupport;
import org.springframework.stereotype.Component;

import static org.springframework.hateoas.mvc.ControllerLinkBuilder.*;

import com.nano.naver_m.controller.UserController;
import com.nano.naver_m.models.User;

@Component
public class UserResourceAssembler implements ResourceAssembler<UserResource, Resource<UserResource>> {


	@Override
	public Resource<UserResource> toResource(UserResource userResource) {
		Resource<UserResource> resource = new Resource<>(userResource, 
					linkTo(methodOn(UserController.class).one(userResource.userId)).withSelfRel(),
					linkTo(methodOn(UserController.class).all()).withRel("users"));

		return resource;
	}

	
}
