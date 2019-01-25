package com.nano.naver_m.models;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

@Entity
public class Product {
	private @Id @GeneratedValue Long id;
	private String productName;
	private byte[] imageData;
	private String imageFileName;
	private int price;
	
	public Product() {
		
	}
	
	public Product(Long id, String productName, byte[] imageData, String imageFileName,int price) {
		super();
		this.id = id;
		this.productName = productName;
		this.imageData = imageData;
		this.imageFileName = imageFileName;
		this.price = price;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public byte[] getImageData() {
		return imageData;
	}

	public void setImageData(byte[] imageData) {
		this.imageData = imageData;
	}

	public String getImageFileName() {
		return imageFileName;
	}

	public void setImageFileName(String imageFileName) {
		this.imageFileName = imageFileName;
	}

	public int getPrice() {
		return price;
	}

	public void setPrice(int price) {
		this.price = price;
	}
	
	
	
}
