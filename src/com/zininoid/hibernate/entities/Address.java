package com.zininoid.hibernate.entities;

public class Address
{
	private String street;
	private String city;
	private String state;
	private String zipcode;

	public Address()
	{
	}

	public Address(String street, String city, String state, String zipcode)
	{
		this.street = street;
		this.city = city;
		this.state = state;
		this.zipcode = zipcode;
	}

	public String getStreet()
	{
		return street;
	}

	public void setStreet(String street)
	{
		this.street = street;
	}

	public String getCity()
	{
		return city;
	}

	public void setCity(String city)
	{
		this.city = city;
	}

	public String getState()
	{
		return state;
	}

	public void setState(String state)
	{
		this.state = state;
	}

	public String getZipcode()
	{
		return zipcode;
	}

	public void setZipcode(String zipcode)
	{
		this.zipcode = zipcode;
	}

	@Override
	public String toString()
	{
		final StringBuffer sb = new StringBuffer("Address{");
		sb.append("street='").append(street).append('\'');
		sb.append(", city='").append(city).append('\'');
		sb.append(", state='").append(state).append('\'');
		sb.append(", zipcode='").append(zipcode).append('\'');
		sb.append('}');
		return sb.toString();
	}
}

