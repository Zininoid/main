package com.zininoid.hibernate.entities;

public class Agent
{
	private int id;
	private String firstName;
	private String lastName;
	private int salary;
	private AgentAddress address;

	public Agent() {}

	public Agent(String fname, String lname, int salary, AgentAddress address ) {
		this.firstName = fname;
		this.lastName = lname;
		this.salary = salary;
		this.address = address;
	}

	public int getId() {
		return id;
	}

	public void setId( int id ) {
		this.id = id;
	}

	public String getFirstName() {
		return firstName;
	}

	public void setFirstName( String first_name ) {
		this.firstName = first_name;
	}

	public String getLastName() {
		return lastName;
	}

	public void setLastName( String last_name ) {
		this.lastName = last_name;
	}

	public int getSalary() {
		return salary;
	}

	public void setSalary( int salary ) {
		this.salary = salary;
	}

	public AgentAddress getAddress() {
		return address;
	}

	public void setAddress( AgentAddress address ) {
		this.address = address;
	}
}
