package com.zininoid.hibernate.entities;


public class Phones
{
	private long id;
	private long employeeId;
	private String country;
	private String operator;
	private String phoneNumber;

	public Phones()
	{
	}

	public Phones(String country, String operator, String phoneNumber)
	{
		this.country = country;
		this.operator = operator;
		this.phoneNumber = phoneNumber;
	}

	public long getId()
	{
		return id;
	}

	public void setId(long id)
	{
		this.id = id;
	}

	public String getCountry()
	{
		return country;
	}

	public void setCountry(String country)
	{
		this.country = country;
	}

	public String getOperator()
	{
		return operator;
	}

	public void setOperator(String operator)
	{
		this.operator = operator;
	}

	public String getPhoneNumber()
	{
		return phoneNumber;
	}

	public void setPhoneNumber(String phoneNumber)
	{
		this.phoneNumber = phoneNumber;
	}

	public long getEmployeeId()
	{
		return employeeId;
	}

	public void setEmployeeId(long employeeId)
	{
		this.employeeId = employeeId;
	}

	@Override
	public String toString()
	{
		final StringBuffer sb = new StringBuffer("Phones{");
		sb.append("id=").append(id);
		sb.append(", imployeeId=").append(employeeId);
		sb.append(", country='").append(country).append('\'');
		sb.append(", operator='").append(operator).append('\'');
		sb.append(", phoneNumber='").append(phoneNumber).append('\'');
		sb.append('}');
		return sb.toString();
	}
}
