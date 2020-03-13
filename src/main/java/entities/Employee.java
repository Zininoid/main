package entities;

import java.util.HashSet;
import java.util.List;

public class Employee {
    long id;
    String employeeName;
//    Role role;
//    Speciality speciality;
    HashSet<Project> projects;
//    Computer computer;
    int salary;
//    List<Hardware> hardwareList;

    public Employee() {
    }

    public Employee(String employeeName, int salary, HashSet<Project> projects) {
        this.employeeName = employeeName;
        this.salary = salary;
        this.projects = projects;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmployeeName() {
        return employeeName;
    }

    public void setEmployeeName(String employeeName) {
        this.employeeName = employeeName;
    }

    public int getSalary() {
        return salary;
    }

    public void setSalary(int salary) {
        this.salary = salary;
    }

    public HashSet<Project> getProjects() {
        return projects;
    }

    public void setProjects(HashSet<Project> projects) {
        this.projects = projects;
    }
}
