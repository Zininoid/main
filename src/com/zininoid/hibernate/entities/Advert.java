package com.zininoid.hibernate.entities;

public class Advert
{
	private long id;
	private String title;
	private String message;
	private User user;

	public Advert(long id, String title, String message, User user)
	{
		this.id = id;
		this.title = title;
		this.message = message;
		this.user = user;
	}

	public Advert()
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

	public String getMessage()
	{
		return message;
	}

	public void setMessage(String message)
	{
		this.message = message;
	}

	public User getUser()
	{
		return user;
	}

	public void setUser(User user)
	{
		this.user = user;
	}
}
