package com.zininoid.hibernate;

import com.zininoid.hibernate.entities.Author;
import com.zininoid.hibernate.entities.BookCat;
import com.zininoid.hibernate.entities.Books;
import org.hibernate.HibernateException;
import org.hibernate.Query;
import org.hibernate.Session;
import org.hibernate.Transaction;

import java.util.*;

import static com.zininoid.hibernate.DeveloperMap.testDeveloperMap;
import static com.zininoid.hibernate.HibernateDevelopersManyToMany.testManyToMany;

public class Main {

    public static void main(String[] args) {

//	    UserManyToOne.testUserManyToOne();
	//    saveAuthor(getAuthor());
	//    testAgentManyToOne();
	    testManyToMany();
//	    testDeveloperMap();

    //  Author author = getAuthor();
    //  saveAuthor(author);
	//  Author author = findAuthor("Джоан Роулинг");
/*
	    List BookCat =  getBooksCat("История");
		Author author = loadAuthorById(1);
        for (Object bookObj : author.getBooks())
        {
            Books book = (Books)bookObj;
            System.out.format("Название : %s, цена %f \n", book.getBookName(), book.getPrice());
        }*/
    }

    private static Author getAuthor()
    {
        String authorName = "Джоан Роулинг";
        Calendar dateOfBirth =  new GregorianCalendar(1980, 0 , 25);
        Author author = new Author(authorName, dateOfBirth);
        Set<Books> booksSet = new HashSet<Books>(){{
            add(new Books("Гарри Поттер и философский камень",  450.0f));
            add(new Books("Гарри Поттер и Тайная комната",  400.0f));
            add(new Books("Гарри Поттер и узник Азкабана",  520.0f));
            add(new Books("Гарри Поттер и Кубок огня",  410.0f));
            add(new Books("Гарри Поттер и Орден Феникса",  610.0f));
        }};

        author.setBooks(booksSet);
        return author;
    }
    private static void saveAuthor(Author author)
    {
        Transaction tx = null;
        try {
            tx = HibernateHelper.getSession().beginTransaction();
            HibernateHelper.getSession().save(author);
            tx.commit();
        } catch( HibernateException e ) {
            tx.rollback();
        }
    }


    private static void addBook(String bookName, Author author, float price)
    {
        Transaction tx = null;
        try {
            tx = HibernateHelper.getSession().beginTransaction();
            Books book = new Books(bookName, price);
            HibernateHelper.getSession().save(book);
            tx.commit();
        } catch( HibernateException e ) {
            tx.rollback();
        }
    }

    private static Author findAuthor(String authorName)
    {
        try {
            Session session = HibernateHelper.getSession();
	        Query query = session.getNamedQuery("com.zininoid.hibernate.entities.Author.getAuthorByName").setString("authorName", authorName);

            List results = query.list();
            return (Author)results.get(0);

        } catch( HibernateException e ) {
	        System.out.println("Ошибка при поиска автора по имени");
        }
	    return null;
    }

    private static List<BookCat> getBooksCat(String category)
    {
	    List<BookCat> booksCatList = null;
    	try
	    {
	    	Session session = HibernateHelper.getSession();
	    	Query query = session.getNamedQuery("com.zininoid.hibernate.entities.BookCat.getBooksByCategory").setString("category", category);
		    booksCatList = query.list();
	    }
	    catch (HibernateException ex)
	    {
		    System.out.println("Огшибка при поиске книг по категории"+ ex.getStackTrace());
	    }
	    return booksCatList;
    }

	private static Author loadAuthorById(long id)
	{
		Author author = null;
		try
		{
			Session session = HibernateHelper.getSession();
			author = (Author) session.get(Author.class, id);
		}
		catch (Exception ex)
		{
			System.out.println("Ошибка при загрузке автора по ID");
			author = null;
		}
		return author;
	}
}
