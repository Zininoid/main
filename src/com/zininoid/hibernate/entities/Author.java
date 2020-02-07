package com.zininoid.hibernate.entities;

import java.util.Calendar;
import java.util.Set;

public class Author
{
	long id;
	String authorName;
	Calendar dateOfBirth;
	Set books;

	public Author()
	{
	}

	public String getAuthorName()
	{
		return authorName;
	}

	public void setAuthorName(String authorName)
	{
		this.authorName = authorName;
	}

	public Author(String name, Calendar dateOfBirth)
	{
		this.authorName = name;
		this.dateOfBirth = dateOfBirth;
	}

	public long getId()
	{
		return id;
	}

	public void setId(long id)
	{
		this.id = id;
	}

	public Calendar getDateOfBirth()
	{
		return dateOfBirth;
	}

	public void setDateOfBirth(Calendar dateOfBirth)
	{
		this.dateOfBirth = dateOfBirth;
	}

	public Set getBooks()
	{
		return books;
	}

	public void setBooks(Set books)
	{
		this.books = books;
	}
}
