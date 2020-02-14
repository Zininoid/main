package com.zininoid.hibernate;

import com.zininoid.hibernate.entities.HibernateDeveloper;
import com.zininoid.hibernate.entities.HibernateProject;
import org.hibernate.HibernateException;
import org.hibernate.Transaction;

import java.util.HashSet;
import java.util.List;

public class HibernateDevelopersManyToMany
{
	public static void testManyToMany()
	{
	//	fillData();
		List<HibernateDeveloper> hibernateDevelopersList = getHibernateDevelopers();
		List<HibernateProject> hibernateProjectList = getHibernateProjects();
	}

	private static void fillData()
	{
		HibernateProject dbProject = new HibernateProject("Database Project", "Umbrella corp.");
		HibernateProject hibernateProject = new HibernateProject("Hibernate Project", "Oracle");
		HibernateProject javaFrontProject = new HibernateProject("Java Front Project", "Sun Microsystems");
		HibernateProject javaScroptProject = new HibernateProject("JavaScript Project", "Cool Design Company");

		HashSet<HibernateProject> ivansProjects = new HashSet<HibernateProject>();
		HashSet<HibernateProject> petersProjects = new HashSet<HibernateProject>();

		ivansProjects.add(dbProject);
		ivansProjects.add(hibernateProject);
		ivansProjects.add(javaFrontProject);

		petersProjects.add(dbProject);
		petersProjects.add(javaFrontProject);
		petersProjects.add(javaScroptProject);



	HibernateDeveloper ivan = new HibernateDeveloper("Ivan", "Drago", "Database",4, ivansProjects);
	HibernateDeveloper peter = new HibernateDeveloper("Petr", "Romanov", "BackEnd",2, petersProjects);

		addHibernateDeveloper(ivan);
		addHibernateDeveloper(peter);
	}
	private static Integer addHibernateDeveloper(HibernateDeveloper hibernateDeveloper)
	{
		Integer id = null;
		Transaction tx = null;
		try{
			tx = HibernateHelper.getSession().beginTransaction();
			id = (Integer) HibernateHelper.getSession().save(hibernateDeveloper);
			tx.commit();
		}
		catch (HibernateException ex)
		{
			ex.printStackTrace();
			tx.rollback();
		}
		return id;
	}

	private static List<HibernateDeveloper> getHibernateDevelopers()
	{
		return HibernateHelper.getSession().createQuery("from HibernateDeveloper").list();
	}

	private static List<HibernateProject> getHibernateProjects()
	{
		return HibernateHelper.getSession().createQuery("from HibernateProject").list();
	}
}
