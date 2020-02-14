package com.zininoid.hibernate.entities;


public class Workstation
{
	private long id;
	private String cpu;
	private String os;
	private int ram;
	private int hdd;
	private Developer developer;

	public Workstation()
	{
	}

	public Workstation(String cpu, String os, int ram, int hdd)
	{
		this.cpu = cpu;
		this.os = os;
		this.ram = ram;
		this.hdd = hdd;
	}

	public long getId()
	{
		return id;
	}

	public void setId(long id)
	{
		this.id = id;
	}

	public String getCpu()
	{
		return cpu;
	}

	public void setCpu(String cpu)
	{
		this.cpu = cpu;
	}

	public String getOs()
	{
		return os;
	}

	public void setOs(String os)
	{
		this.os = os;
	}

	public int getRam()
	{
		return ram;
	}

	public void setRam(int ram)
	{
		this.ram = ram;
	}

	public int getHdd()
	{
		return hdd;
	}

	public void setHdd(int hdd)
	{
		this.hdd = hdd;
	}

	public Developer getDeveloper()
	{
		return developer;
	}

	public void setDeveloper(Developer developer)
	{
		this.developer = developer;
	}
}
