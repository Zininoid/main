import entities.Employee;
import entities.Project;

public class EmployeeBuilder {
    private Employee employee;

    public EmployeeBuilder()
    {
        employee = new Employee();
    }

    public EmployeeBuilder setSalary(int salary)
    {
        employee.setSalary(salary);
        return this;
    }

    public EmployeeBuilder setEmployeeName(String employeeName)
    {
        employee.setEmployeeName(employeeName);
        return this;
    }
    public EmployeeBuilder addProject(Project project)
    {
        employee.getProjects().add(project);
        return this;
    }
    public Employee build()
    {
        return employee;
    }

}
