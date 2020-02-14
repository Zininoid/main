package com.zininoid.hibernate.entities;

public class HibernateProject
{
	private int id;
	private String projectName;
	private String companyName;

	public HibernateProject()
	{
	}

	public HibernateProject(String projectName, String companyName )
	{
		this.projectName = projectName;
		this.companyName = companyName;
	}

	public int getId()
	{
		return id;
	}

	public void setId(int id)
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

	public String getCompanyName()
	{
		return companyName;
	}

	public void setCompanyName(String companyName)
	{
		this.companyName = companyName;
	}
}
