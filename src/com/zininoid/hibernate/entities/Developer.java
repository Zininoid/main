package com.zininoid.hibernate.entities;

import java.util.Map;

public class Developer
{
	private long id;
	private String firstName;
	private String lastName;
	private String speciality;
	private int expirience;
	private Map<String, Project> projectMap;

	public Developer()
	{
	}

	public Developer(String firstName, String lastName, String speciality, int expirience, Map<String, Project> projectMap)
	{
		this.firstName = firstName;
		this.lastName = lastName;
		this.speciality = speciality;
		this.expirience = expirience;
		this.projectMap = projectMap;
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

	public int getExpirience()
	{
		return expirience;
	}

	public void setExpirience(int expirience)
	{
		this.expirience = expirience;
	}

	public String getSpeciality()
	{
		return speciality;
	}

	public void setSpeciality(String speciality)
	{
		this.speciality = speciality;
	}

	public Map<String, Project> getProjectMap()
	{
		return projectMap;
	}

	public void setProjectMap(Map<String, Project> projectMap)
	{
		this.projectMap = projectMap;
	}

	@Override
	public String toString()
	{
		final StringBuffer sb = new StringBuffer("Developers{/n");
		sb.append("id=").append(id).append("/n");
		sb.append(", firstName='").append(firstName).append("/n");
		sb.append(", lastName='").append(lastName).append("/n");
		sb.append(", speciality='").append(speciality).append("/n");
		sb.append(", expirience=").append(expirience).append("/n");
		sb.append(", projectMap=").append(projectMap).append("/n");
		sb.append('}');
		return sb.toString();
	}
}
