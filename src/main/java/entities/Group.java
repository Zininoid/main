package entities;

import java.util.HashSet;
import java.util.Set;

public class Group {
    long id;
    String groupName;
    String description;
    Set<Employee> employees = new HashSet<Employee>();

    public Group() {
    }


    public Group(String groupName, String description) {
        this.groupName = groupName;
        this.description = description;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Employee> getEmployees() {
        return employees;
    }

    public void setEmployees(Set<Employee> employees) {
        this.employees = employees;
    }
}
