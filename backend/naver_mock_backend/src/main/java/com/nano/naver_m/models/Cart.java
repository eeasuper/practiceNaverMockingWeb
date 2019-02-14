//package com.nano.naver_m.models;
//
//import java.util.List;
//
//import javax.persistence.Entity;
//import javax.persistence.FetchType;
//import javax.persistence.GeneratedValue;
//import javax.persistence.Id;
//import javax.persistence.JoinColumn;
//import javax.persistence.ManyToOne;
//
//import org.springframework.hateoas.Identifiable;
//
//@Entity
//public class Cart implements Identifiable<Long>{
//	
//	private @Id @GeneratedValue Long id;
//	@ManyToOne(fetch=FetchType.LAZY)
//	@JoinColumn(name="USER_ID")
//	private User userId;
//	private List<OrderDetails> items;
//	
//	public Cart() {
//		
//	}
//	
//	public Cart(List<OrderDetails> items) {
//		super();
//		this.items = items;
//	}
//
//	public Cart(Long id, List<OrderDetails> items) {
//		super();
//		this.id = id;
//		this.items = items;
//	}
//
//	public User getUserId() {
//		return userId;
//	}
//
//	public void setUserId(User userId) {
//		this.userId = userId;
//	}
//
//	public Long getId() {
//		return id;
//	}
//
//	public void setId(Long id) {
//		this.id = id;
//	}
//
//	public List<OrderDetails> getItems() {
//		return items;
//	}
//
//	public void setItems(List<OrderDetails> items) {
//		this.items = items;
//	}
//	
//	
//}
