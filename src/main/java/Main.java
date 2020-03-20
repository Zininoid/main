import entities.*;
import org.hibernate.HibernateException;
import org.hibernate.Transaction;

import java.util.*;

import static entities.MainRoles.*;

public class Main {
    public static void main(String[] args) {


        final Role backTester = new Role(TESTER, "Testing back services");
        final Role frontTester = new Role(TESTER, "Testing front services");
        final Role frontProgrammer = new Role(DEVELOPER, "Coding front services");
        final Role backProgrammer = new Role(DEVELOPER, "Coding back services");
        final Role teamLeader = new Role(TEAM_LEADER, "Team leader");
        final Role designer = new Role(DESIGNER, "Designer");
        final Role analitic = new Role(ANALITIC, "Business analitic");

        final Speciality frontEnd = new Speciality("FrontEnd");
        final Speciality backEnd = new Speciality("BackEnd");

        final Project google =    new Project("Google.com",   new GregorianCalendar(1990, Calendar.JANUARY, 10), new GregorianCalendar(2000, Calendar.MARCH,1));
        final Project amazon =    new Project("Amazon.com",   new GregorianCalendar(1995, Calendar.FEBRUARY, 1), new GregorianCalendar(2006, Calendar.MAY,1));
        final Project ebay =      new Project("Ebay.com",     new GregorianCalendar(1997, Calendar.APRIL, 22), new GregorianCalendar(2010, Calendar.MAY,1));
        final Project facebook =  new Project("Facebook.com", new GregorianCalendar(1999, Calendar.JULY, 1), new GregorianCalendar(2007, Calendar.DECEMBER,1));
        final Project apple =     new Project("Apple.com",   new GregorianCalendar(2000, Calendar.OCTOBER, 1), new GregorianCalendar(2010, Calendar.MAY,1));

        Hardware georgeWashingtonHW = new Hardware("Logitech MX500",  "USB", "15478451df4521");
        Hardware johnAdamsHW        = new Hardware("Logitech MX500",  "USB", "587412dfs2145a");

        Employee georgeWashington     = new EmployeeBuilder().setEmployeeName("George Washington").setSalary(25000).addProject(google).addProject(ebay).addProject(apple).setRole(analitic).setSpeciality(backEnd).build();
        Employee johnAdams            = new EmployeeBuilder().setEmployeeName("John Adams").setSalary(10000).addProject(amazon).addProject(facebook).setSpeciality(frontEnd).setRole(designer).build();
        Employee thomasJefferson      = new EmployeeBuilder().setEmployeeName("Thomas Jefferson").setSalary(15000).addProject(google).addProject(apple).addProject(facebook).setSpeciality(frontEnd).setRole(teamLeader).build();
        Employee jamesMadison         = new EmployeeBuilder().setEmployeeName("James Madison").setSalary(15000).addProject(amazon).addProject(facebook).setRole(backProgrammer).setSpeciality(backEnd).build();
        Employee jamesMonroe          = new EmployeeBuilder().setEmployeeName("James Monroe").setSalary(10000).addProject(ebay).setRole(backTester).setSpeciality(backEnd).build();
        Employee johnQuincyAdams      = new EmployeeBuilder().setEmployeeName("John Quincy Adams").setSalary(10000).addProject(amazon).addProject(google).setSpeciality(frontEnd).setRole(designer).build();
        Employee andrewJackson        = new EmployeeBuilder().setEmployeeName("Andrew Jackson").setSalary(15000).addProject(apple).addProject(facebook).setSpeciality(frontEnd).setRole(teamLeader).build();
        Employee martinVanBuren       = new EmployeeBuilder().setEmployeeName("Martin Van Buren").setSalary(10000).addProject(ebay).addProject(amazon).setSpeciality(frontEnd).setRole(frontProgrammer).build();
        Employee williamHenryHarrison = new EmployeeBuilder().setEmployeeName("William Henry Harrison").setSalary(20000).addProject(amazon).addProject(facebook).setSpeciality(frontEnd).setRole(frontTester).build();
        Employee johnTyler            = new EmployeeBuilder().setEmployeeName("John Tyler").setSalary(10000).addProject(ebay).setRole(teamLeader).setSpeciality(backEnd).build();
        Employee jamesKPolk           = new EmployeeBuilder().setEmployeeName("James K. Polk").setSalary(15000).addProject(google).addProject(ebay).addProject(apple).addProject(facebook).setSpeciality(backEnd).setRole(analitic).build();
        Employee zacharyTaylor        = new EmployeeBuilder().setEmployeeName("Zachary Taylor").setSalary(20000).addProject(google).addProject(amazon).setSpeciality(backEnd).setRole(backProgrammer).build();
        Employee millardFillmore      = new EmployeeBuilder().setEmployeeName("Millard Fillmore").setSalary(15000).addProject(facebook).addProject(apple).setSpeciality(backEnd).setRole(backTester).build();

        georgeWashington.getHardwareMap().put(HardwareType.MOUSE, georgeWashingtonHW);
        johnAdams.getHardwareMap().put(HardwareType.MOUSE, johnAdamsHW);

        Group jsDev = new GroupBuilder().setGroupName("JS-Development").setGroupDescription("Java script development")
                                                                        .addEmployee(georgeWashington)
                                                                        .addEmployee(johnAdams)
                                                                        .addEmployee(millardFillmore)
                                                                        .addEmployee(thomasJefferson)
                                                                        .addEmployee(zacharyTaylor)
                                                                        .build();
        Group htmlDev = new GroupBuilder().setGroupName("HTML-Development").setGroupDescription("HTML development")
                                                                        .addEmployee(jamesMadison)
                                                                        .addEmployee(jamesMonroe)
                                                                        .addEmployee(williamHenryHarrison)
                                                                        .addEmployee(johnQuincyAdams)
                                                                        .build();
        Group reactDev = new GroupBuilder().setGroupName("React-Development").setGroupDescription("React development")
                                                                        .addEmployee(andrewJackson)
                                                                        .addEmployee(martinVanBuren)
                                                                        .addEmployee(johnTyler)
                                                                        .addEmployee(jamesKPolk)
                                                                        .build();

        Department department = new Department();
        department.setDepartmentName("Frontend Development");

        department.getGroupSet().add(jsDev);
        department.getGroupSet().add(htmlDev);
        department.getGroupSet().add(reactDev);

        try {
            saveDepartment(department);
        }
        catch (Exception ex)
        {
            ex.printStackTrace();
        }

    }

 public static void saveDepartment(Department department) throws Exception
        {
        Transaction tx = null;
        try {
            tx = HibernateHelper.getSession().beginTransaction();
            HibernateHelper.getSession().save(department);
            tx.commit();
        } catch( HibernateException e ) {
            e.printStackTrace();
            tx.rollback();
        }
    }


}
