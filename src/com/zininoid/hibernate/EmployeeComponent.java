package com.zininoid.hibernate;

import com.zininoid.hibernate.entities.Address;
import com.zininoid.hibernate.entities.Employee;

import static com.zininoid.hibernate.EmployeeHelper.getEmployeeById;

public class EmployeeComponent
{
	public static void testEmployeeComponent()
	{
		System.out.println("Creating Employee object");

		Employee petrov = new Employee("Petrov", "Petr", 50000,
			new Address("Lenina str 14 apt 1", "Bryansk", "Bryansk", "241013"), null);

		Employee employee = getEmployeeById(29);

		System.out.println(employee);
	}
}
