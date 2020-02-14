package com.zininoid.hibernate.entities;

import java.util.Set;

public class HibernateDeveloper
{
	private int id;
	private String firstName;
	private String lastName;
	private String specialty;
	private int experience;
	private Set projects;

	public HibernateDeveloper()
	{
	}

	public HibernateDeveloper(String firstName, String lastName, String specialty, int experience, Set projects)
	{
		this.firstName = firstName;
		this.lastName = lastName;
		this.specialty = specialty;
		this.experience = experience;
		this.projects = projects;
	}

	public int getId()
	{
		return id;
	}

	public void setId(int id)
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

	public String getSpecialty()
	{
		return specialty;
	}

	public void setSpecialty(String specialty)
	{
		this.specialty = specialty;
	}

	public int getExperience()
	{
		return experience;
	}

	public void setExperience(int experience)
	{
		this.experience = experience;
	}

	public Set getProjects()
	{
		return projects;
	}

	public void setProjects(Set projects)
	{
		this.projects = projects;
	}
}
