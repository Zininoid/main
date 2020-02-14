package com.zininoid.hibernate;

import com.zininoid.hibernate.entities.Developer;
import com.zininoid.hibernate.entities.Project;
import com.zininoid.hibernate.entities.Workstation;
import org.hibernate.HibernateException;
import org.hibernate.Transaction;

import java.util.HashMap;
import java.util.List;

public class DeveloperMap
{
	public static void testDeveloperMap()
	{

		HashMap<String, Project> projectsJava = new HashMap<String, Project>();
		projectsJava.put("Java Core", new Project("Mining", "Bitcoin corp"));
		projectsJava.put("Java Front", new Project("CoolSite", "CoolSite.com"));
		Workstation computer = new Workstation("Intel Pentium i7", "Ubuntu Linux", 4, 2000);

		Developer ivan = new Developer("Ivan", "Ivanov", "Java", 3, projectsJava);

		//Важно - В оба класса установить соответствующие объекты !
		ivan.setWorkstation(computer); // В Developer - Workstation
		computer.setDeveloper(ivan);  // B Workstation - Developer

		saveDeveloper(ivan);
		Developer developer = getDeveloperById(44);

		List<Developer> developerList = getAllDevelopers();

		for(Developer dev :developerList)
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
