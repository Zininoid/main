package com.zininoid.hibernate;

import com.zininoid.hibernate.entities.Developer;
import org.hibernate.HibernateException;
import org.hibernate.Transaction;

import java.util.List;

public class DeveloperMap
{
	public static void testDeveloperMap()
	{
/*
		HashMap<String, Project> projectsJava = new HashMap<String, Project>();
		projectsJava.put("Java Core", new Project("Mining", "Bitcoin corp"));
		projectsJava.put("Java Front", new Project("CoolSite", "CoolSite.com"));

		Developer ivan = new Developer("Ivan", "Ivanov", "Java", 3, projectsJava);

		saveDeveloper(ivan);
		Developer developer = getDeveloperById(44);
*/
		List<Developer> developerList = getAllDevelopers();

		for(Developer developer :developerList)
		{
			System.out.println(developer);
		}
	}

	public static void saveDeveloper(Developer developer)
	{
		Transaction tx = null;
		System.out.println("Saving Developer object");
		try
		{
			tx = HibernateHelper.getSession().beginTransaction();
			HibernateHelper.getSession().save(developer);
			tx.commit();
		}
		catch (HibernateException e)
		{
			tx.rollback();
		}
	}

	public static Developer getDeveloperById(long id)
	{
		return (Developer) HibernateHelper.getSession().get(Developer.class, id);
	}

	public static List<Developer> getAllDevelopers()
	{
		return (List<Developer>)HibernateHelper.getSession().createQuery("from Developer").list();
	}
}
