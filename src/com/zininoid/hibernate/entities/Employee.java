package com.zininoid.hibernate.entities;

import java.util.List;

public class Employee
{
	private long id = -1;
	private String firstName;
	private String lastName;
	private int salary;
	private Address address;
	private List<Phones> phones;

	public Employee()
	{
	}

	/**
	 * ctor
	 * @param firstName - firstName
	 * @param lastname - lastname
	 * @param salary - salary
	 * @param address - address
	 */
	public Employee(String firstName, String lastname, int salary, Address address, List<Phones> phones)
	{
		this.firstName = firstName;
		this.lastName = lastname;
		this.salary = salary;
		this.address = address;
		this.phones = phones;
	}


	public long getId()
	{
		return id;
	}

	public void setId(long id)
	{
		this.id = id;
	}

	public String getFirstName()
	{
		return firstName;
	}

	public void setFirstName(String firstName)
	{
		this.firstName = firstName;
	}

	public String getLastName()
	{
		return lastName;
	}

	public void setLastName(String lastName)
	{
		this.lastName = lastName;
	}

	public int getSalary()
	{
		return salary;
	}

	public void setSalary(int salary)
	{
		this.salary = salary;
	}

	public Address getAddress()
	{
		return address;
	}

	public void setAddress(Address address)
	{
		this.address = address;
	}

	public List<Phones> getPhones()
	{
		return phones;
	}

	public void setPhones(List<Phones> phones)
	{
		this.phones = phones;
	}

	@Override
	public String toString()
	{
		final StringBuffer sb = new StringBuffer("Employee{");
		sb.append("firstName='").append(firstName).append('\'');
		sb.append(", lastName='").append(lastName).append('\'');
		sb.append(", salary=").append(salary);
		sb.append(", address=").append(address);
		sb.append('}');
		return sb.toString();
	}
}
