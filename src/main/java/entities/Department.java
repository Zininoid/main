package entities;

import java.util.Set;

public class Department {
    long id;
    String departmentName;
    Set<Group> groupSet;

    public Department(long id, String departmentName, Set<Group> groupSet) {
        this.id = id;
        this.departmentName = departmentName;
        this.groupSet = groupSet;
    }

    public Department() {
    }

    public Department(String departmentName) {
        this.departmentName = departmentName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getDepartmentName() {
        return departmentName;
    }

    public void setDepartmentName(String departmentName) {
        this.departmentName = departmentName;
    }

    public Set<Group> getGroupSet() {
        return groupSet;
    }

    public void setGroupSet(Set<Group> groupSet) {
        this.groupSet = groupSet;
    }
}
