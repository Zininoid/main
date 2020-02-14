package com.zininoid.hibernate.entities;


@SuppressWarnings("JpaAttributeTypeInspection")
public class User
{
	private long id;
	private String name;
	private String password;
	private Address address;

	public User(String name, String password, Address address)
	{
		this.name = name;
		this.password = password;
		this.address = address;
	}

	public User()
	{
	}

	public long getId()
	{
		return id;
	}

	public void setId(long id)
	{
		this.id = id;
	}

	public String getName()
	{
		return name;
	}

	public void setName(String name)
	{
		this.name = name;
	}

	public String getPassword()
	{
		return password;
	}

	public void setPassword(String password)
	{
		this.password = password;
	}

	public Address getAddress()
	{
		return address;
	}

	public void setAddress(Address address)
	{
		this.address = address;
	}
}
