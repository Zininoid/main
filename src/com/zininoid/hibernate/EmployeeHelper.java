package com.zininoid.hibernate;

import com.zininoid.hibernate.entities.Employee;
import org.hibernate.HibernateException;
import org.hibernate.Transaction;

public class EmployeeHelper
{

	public static Employee getEmployeeById(long id)
	{
		return (Employee) HibernateHelper.getSession().get(Employee.class, id);
	}

	public static void saveEmployee(Employee employee)
	{
		Transaction tx = null;
		System.out.println("Saving Employee object");
		try {
			tx = HibernateHelper.getSession().beginTransaction();
			HibernateHelper.getSession().save(employee);
			tx.commit();
		} catch( HibernateException e ) {
			tx.rollback();
		}
	}
}
