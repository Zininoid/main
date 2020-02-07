package com.zininoid.hibernate.entities;

public class Project
{
	private long id;
	private String projectName;
	private String company;
	private int developerId;

	public Project()
	{
	}

	public Project(String projectName, String company)
	{
		this.projectName = projectName;
		this.company = company;
	}

	public long getId()
	{
		return id;
	}

	public void setId(long id)
	{
		this.id = id;
	}

	public String getProjectName()
	{
		return projectName;
	}

	public void setProjectName(String projectName)
	{
		this.projectName = projectName;
	}

	public String getCompany()
	{
		return company;
	}

	public void setCompany(String company)
	{
		this.company = company;
	}

	public int getDeveloperId()
	{
		return developerId;
	}

	public void setDeveloperId(int developerId)
	{
		this.developerId = developerId;
	}
}
