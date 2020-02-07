package com.zininoid.hibernate;

import com.zininoid.hibernate.entities.Address;
import com.zininoid.hibernate.entities.Employee;
import com.zininoid.hibernate.entities.Phones;

import java.util.ArrayList;
import java.util.List;

import static com.zininoid.hibernate.EmployeeHelper.saveEmployee;

public class EmployeeList
{
	public static void testEmployeeList()
	{
		Employee employee = new Employee("Petrov", "Petr", 50000,
			new Address("Lenina str 14 apt 1", "Bryansk", "Bryansk", "241013"), null);

		List<Phones> phonesList = new ArrayList<Phones>(){{
			add(new Phones("Russia", "MTS", "+79103307403"));
			add(new Phones("Russia", "Beeline", "+79803173574"));
			add(new Phones("Russia", "Tele2", "+79574127854"));
		}};

		employee.setPhones(phonesList);

 	    saveEmployee(employee);

	}


}
