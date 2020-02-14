package com.zininoid.hibernate;

import com.zininoid.hibernate.entities.Address;
import com.zininoid.hibernate.entities.User;
import org.hibernate.HibernateException;
import org.hibernate.Transaction;

import java.util.List;

public class UserManyToOne
{
	public static void testUserManyToOne()
	{
	/*	Address leninaStr = new Address("Lenina str.", "Bryansk", "Bryansk", "241000");
		Address miraStr = new Address("Mira str.", "Bryansk", "Bryansk", "241012");
		User vasya = new User("Vasya", "qwerty", null);
		User petya = new User("Petya", "123456", null);
		User masha = new User("Masha", "zxcvb", null);

		leninaStr = saveAddress(leninaStr);
		miraStr = saveAddress(miraStr);

		vasya.setAddress(leninaStr);
		petya.setAddress(leninaStr);
		masha.setAddress(miraStr);

		saveUser(vasya);
		saveUser(petya);
		saveUser(masha);
*/
		List<User> userList = getAllUsers();

		for(User us : userList)
		{
			System.out.println(us);
		}
	}

	private static void saveUser(User user)
	{
		Transaction tx = null;
		try
		{
			tx = HibernateHelper.getSession().beginTransaction();
			HibernateHelper.getSession().save(user);
			tx.commit();
		}
		catch (HibernateException ex)
		{
			ex.printStackTrace();
			tx.rollback();
		}
	}

	private static Address saveAddress(Address address)
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
	private static List<User> getAllUsers()
	{
		return (List<User>)HibernateHelper.getSession().createQuery("from User").list();
	}
}
