import entities.Employee;
import entities.Project;
import entities.Role;
import entities.Speciality;

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

    public EmployeeBuilder setRole(Role role)
    {
        employee.setRole(role);
        return this;
    }

    public EmployeeBuilder setSpeciality(Speciality speciality)
    {
        employee.setSpeciality(speciality);
        return this;
    }

    public Employee build()
    {
        return employee;
    }


}
