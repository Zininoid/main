package com.zininoid.hibernate;

import com.zininoid.hibernate.entities.Books;
import org.hibernate.Criteria;
import org.hibernate.criterion.*;

import java.util.List;

public  class CriteriaExamples
{

	public static List<Books> getBooksQueryByExampleWithLike()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		Books book = new Books();
		book.setBookName("Гарри%");
		Example bookExample = Example.create(book);
		bookExample.enableLike();
		criteria.add(bookExample);
		return criteria.list();
	}

	public static List<Books> getBooksQueryByExample()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		Books book = new Books();
		book.setPrice(400f);
		criteria.add(Example.create(book));
		return  criteria.list();
	}

	public static List<Books> getBookNames()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		criteria.setProjection(Projections.property("bookName"));
		return criteria.list();
	}

	public static List<Books> getBooksProjections()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		ProjectionList projectionList = Projections.projectionList();
		projectionList.add(Projections.avg("price"));
		projectionList.add(Projections.sum("price"));
		projectionList.add(Projections.min("price"));
		projectionList.add(Projections.max("price"));

		criteria.setProjection(projectionList);
		return criteria.list();
	}

	public static List<Books> getBooksCount()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		criteria.setProjection(Projections.count("bookName"));
		return criteria.list();
	}

	public static List<Books> getBooksPriceAvg()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		criteria.setProjection(Projections.avg("price"));
		return criteria.list();
	}

	public static List<Books> getBooksPriceSum()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		criteria.setProjection(Projections.sum("price"));
		return criteria.list();
	}

	public static List<Books> getBooksListDistinct()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		criteria.setProjection(Projections.distinct(Projections.property("price")));
		return criteria.list();
	}

	public static List<Books> getBooksListEqual()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		criteria.add(Restrictions.eq("price", 400f));
		return criteria.list();
	}

	public static List<Books> getBooksListNotEqual()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		criteria.add(Restrictions.ne("price", 400f));
		return criteria.list();
	}

	public static List<Books> getBooksListLikeAndGe()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		Criterion bookName = Restrictions.like("bookName", "Гарри%");
		Criterion bookPrice = Restrictions.ge("price", 500f);
		LogicalExpression orExp = Restrictions.and(bookName, bookPrice);
		criteria.add(orExp);
		return criteria.list();
	}

	public static List<Books> getOrderedBooks()
	{
		Criteria criteria = HibernateHelper.getSession().createCriteria(Books.class);
		Criterion bookPrice = Restrictions.ge("price", 100f);
		criteria.add(bookPrice);
		criteria.addOrder(Order.asc("price"));
		criteria.addOrder(Order.asc("bookName"));
		return criteria.list();
	}
}
