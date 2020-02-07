package com.zininoid.hibernate.entities;

public class Phone
{
	private long id;
	private User user;
	private String number;
	private String comment;

	public Phone(long id, User user, String number, String comment)
	{
		this.id = id;
		this.user = user;
		this.number = number;
		this.comment = comment;
	}

	public Phone()
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

	public User getUser()
	{
		return user;
	}

	public void setUser(User user)
	{
		this.user = user;
	}

	public String getNumber()
	{
		return number;
	}

	public void setNumber(String number)
	{
		this.number = number;
	}

	public String getComment()
	{
		return comment;
	}

	public void setComment(String comment)
	{
		this.comment = comment;
	}
}
