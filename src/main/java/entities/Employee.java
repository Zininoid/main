package entities;

import java.util.*;

public class Employee {
    long id;
    String employeeName;
    Role role;
    Speciality speciality;
    Set<Project> projects = new HashSet<Project>();
    int salary;
//    Computer computer;
    Map<HardwareType, Hardware> hardwareMap = new HashMap<HardwareType, Hardware>();
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

    public Role getRole() {
        return role;
    }

    public void setRole(Role role) {
        this.role = role;
    }

    public Speciality getSpeciality() {
        return speciality;
    }

    public void setSpeciality(Speciality speciality) {
        this.speciality = speciality;
    }

    public Map<HardwareType, Hardware> getHardwareMap() {
        return hardwareMap;
    }

    public void setHardwareMap(Map<HardwareType, Hardware> hardwareMap) {
        this.hardwareMap = hardwareMap;
    }
}
