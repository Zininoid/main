package com.zininoid.hibernate;

import com.zininoid.hibernate.entities.Agent;
import com.zininoid.hibernate.entities.AgentAddress;
import org.hibernate.HibernateException;
import org.hibernate.Transaction;

import java.util.List;

public class AgentManyToOne
{
	public static void testAgentManyToOne()
	{
		AgentAddress leninaStr = new AgentAddress("Lenina str.", "Bryansk", "Bryansk", "241000");
		AgentAddress miraStr = new AgentAddress("Mira str.", "Bryansk", "Bryansk", "241012");
		Agent vasya = new Agent("Vasya", "qwerty", 10000,  null);
		Agent petya = new Agent("Petya", "123456", 20000,  null);
		Agent masha = new Agent("Masha", "zxcvb", 30000, null);

		leninaStr = saveAddress(leninaStr);
		miraStr = saveAddress(miraStr);

		vasya.setAddress(leninaStr);
		petya.setAddress(leninaStr);
		masha.setAddress(miraStr);

		saveUser(vasya);
		saveUser(petya);
		saveUser(masha);

		List<Agent> agentList = getAllAgents();

		for(Agent agent : agentList)
		{
			System.out.println(agent);
		}
	}

	private static void saveUser(Agent agent)
	{
		Transaction tx = null;
		try
		{
			tx = HibernateHelper.getSession().beginTransaction();
			HibernateHelper.getSession().save(agent);
			tx.commit();
		}
		catch (HibernateException ex)
		{
			ex.printStackTrace();
			tx.rollback();
		}
	}

	private static AgentAddress saveAddress(AgentAddress address)
	{
		Transaction tx = null;
		try
		{
			tx = HibernateHelper.getSession().beginTransaction();
			HibernateHelper.getSession().save(address);
			tx.commit();
		}
		catch (HibernateException ex)
		{
			ex.printStackTrace();
			tx.rollback();
		}
		return address;
	}
	private static List<Agent> getAllAgents()
	{
		return (List<Agent>)HibernateHelper.getSession().createQuery("from Agent").list();
	}

}
