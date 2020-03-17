import entities.Employee;
import entities.Group;

import java.util.Set;

public class GroupBuilder {

    private Group group;

    public GroupBuilder()
    {
        group = new Group();
    }
    String groupName;
    String description;
    Set<Employee> employees;

    public GroupBuilder setGroupName(String groupName)
    {
        group.setGroupName(groupName);
        return this;
    }
    public GroupBuilder setGroupDescription(String groupDescription)
    {
        group.setDescription(groupDescription);
        return this;
    }

    public GroupBuilder addEmployee(Employee employee)
    {
        group.getEmployees().add(employee);
        return this;
    }

    public Group build()
    {
        return group;
    }
}
