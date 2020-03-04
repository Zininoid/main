package com.zininoid.hibernate;

import static com.zininoid.hibernate.CriteriaExamples.*;

public class Main
{

	public static void main(String[] args)
	{

		System.out.println(getBooksListDistinct());
		System.out.println(getBooksPriceSum());
		System.out.println(getBooksPriceAvg());
		System.out.println(getBooksCount());
		System.out.println(getBooksProjections());
		System.out.println(getBookNames());
		System.out.println(getBooksQueryByExample());
		System.out.println(getBooksQueryByExampleWithLike());
		System.out.println(getBooksListEqual());
		System.out.println(getBooksListNotEqual());
	}
}
