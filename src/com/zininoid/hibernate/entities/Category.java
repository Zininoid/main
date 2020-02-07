package com.zininoid.hibernate.entities;

import java.util.Set;

public class Category
{
	private long id;
	private String title;
	private Set adverts;

	public Category(long id, String title, Set adverts)
	{
		this.id = id;
		this.title = title;
		this.adverts = adverts;
	}

	public Category()
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

	public String getTitle()
	{
		return title;
	}

	public void setTitle(String title)
	{
		this.title = title;
	}

	public Set getAdverts()
	{
		return adverts;
	}

	public void setAdverts(Set adverts)
	{
		this.adverts = adverts;
	}
}
