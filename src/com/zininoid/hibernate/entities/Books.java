package com.zininoid.hibernate.entities;

public class Books
{
	long id;
	long authorId;
	String bookName;
	float price;

	public Books(String bookName, float price)
	{
		this.bookName = bookName;
		this.price = price;
	}

	public Books()
	{
	}

	public long getAuthorId()
	{
		return authorId;
	}

	public void setAuthorId(long authorId)
	{
		this.authorId = authorId;
	}

	public String getBookName()
	{
		return bookName;
	}

	public void setBookName(String bookName)
	{
		this.bookName = bookName;
	}

	public float getPrice()
	{
		return price;
	}

	public void setPrice(float price)
	{
		this.price = price;
	}

	public long getId()
	{
		return id;
	}

	public void setId(long id)
	{
		this.id = id;
	}
}
