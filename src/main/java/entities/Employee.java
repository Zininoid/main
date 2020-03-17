package entities;

import java.util.HashSet;
import java.util.List;
import java.util.Set;

public class Employee {
    long id;
    String employeeName;
//    Role role;
//    Speciality speciality;
    Set<Project> projects = new HashSet<Project>();
//    Computer computer;
    int salary;
//    List<Hardware> hardwareList;

    public Employee() {
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

    public Set<Project> getProjects() {
        return projects;
    }

    public void setProjects(Set<Project> projects) {
        this.projects = projects;
    }
}
