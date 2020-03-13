import entities.Department;
import entities.Employee;
import entities.Group;
import entities.Project;
import org.hibernate.HibernateException;
import org.hibernate.Transaction;

import java.util.*;

public class Main {
    public static void main(String[] args) {
        Department department = new Department();
        department.setDepartmentName("Frontend Development");

        Group jsDev = new Group("JS-Development", "Java script development");
        Group angularDev = new Group("HTML-Development", "HTML development");
        Group reactDev = new Group("React-Development", "React development");

        final Project google =    new Project("Google.com",   new GregorianCalendar(1990, Calendar.JANUARY, 10), new GregorianCalendar(2000, Calendar.MARCH,1));
        final Project amazon =    new Project("Amazon.com",   new GregorianCalendar(1995, Calendar.FEBRUARY, 1), new GregorianCalendar(2006, Calendar.MAY,1));
        final Project ebay =      new Project("Ebay.com",     new GregorianCalendar(1997, Calendar.APRIL, 22), new GregorianCalendar(2010, Calendar.MAY,1));
        final Project facebook =  new Project("Facebook.com", new GregorianCalendar(1999, Calendar.JULY, 1), new GregorianCalendar(2007, Calendar.DECEMBER,1));
        final Project apple =     new Project("Apple.com",   new GregorianCalendar(2000, Calendar.OCTOBER, 1), new GregorianCalendar(2010, Calendar.MAY,1));

        Employee georgeWashington = new Employee("George Washington", 10000, new HashSet<Project>(){{add(google);add(ebay);}});

        Employee johnAdams = new Employee("John Adams", 10000,  new HashSet<Project>(){{add(amazon);add(facebook);}});
        Employee thomasJefferson = new Employee("Thomas Jefferson", 15000,  new HashSet<Project>(){{add(google);add(apple);add(facebook);}});
        Employee jamesMadison = new Employee("James Madison", 15000,  new HashSet<Project>(){{add(amazon);add(facebook);}});
        Employee jamesMonroe = new Employee("James Monroe", 10000,  new HashSet<Project>(){{add(ebay);}});
        Employee johnQuincyAdams = new Employee("John Quincy Adams", 10000, new HashSet<Project>(){{add(amazon);add(google);}});
        Employee andrewJackson = new Employee("Andrew Jackson", 15000,  new HashSet<Project>(){{add(apple);add(facebook);}});
        Employee martinVanBuren = new Employee("Martin Van Buren", 10000,  new HashSet<Project>(){{add(ebay);add(amazon);}});
        Employee williamHenryHarrison = new Employee("William Henry Harrison", 20000,  new HashSet<Project>(){{add(amazon);add(facebook);}});
        Employee johnTyler = new Employee("John Tyler", 10000,  new HashSet<Project>(){{add(ebay);}});
        Employee jamesKPolk = new Employee("James K. Polk", 15000,  new HashSet<Project>(){{add(google);add(ebay);add(apple);add(facebook);}});
        Employee zacharyTaylor = new Employee("Zachary Taylor", 20000,   new HashSet<Project>(){{add(google);add(amazon);}});
        Employee millardFillmore = new Employee("Millard Fillmore", 15000,   new HashSet<Project>(){{add(facebook);add(apple);}});


        Set<Employee> jsDevs = new HashSet<Employee>();
        jsDevs.add(georgeWashington);
        jsDevs.add(johnAdams);
        jsDevs.add(thomasJefferson);
        jsDevs.add(jamesMonroe);

        Set<Employee> angularDevs = new HashSet<Employee>();
        angularDevs.add(jamesMadison);
        angularDevs.add(johnQuincyAdams);
        angularDevs.add(andrewJackson);
        angularDevs.add(martinVanBuren);
        angularDevs.add(williamHenryHarrison);

        Set<Employee> reactDevs = new HashSet<Employee>();
        reactDevs.add(johnTyler);
        reactDevs.add(jamesKPolk);
        reactDevs.add(zacharyTaylor);
        reactDevs.add(millardFillmore);

        jsDev.setEmployees(jsDevs);
        angularDev.setEmployees(angularDevs);
        reactDev.setEmployees(reactDevs);

        Set<Group> groups = new HashSet<Group>();
        groups.add(jsDev);
        groups.add(angularDev);
        groups.add(reactDev);

        department.setGroupSet(groups);

        saveDepartment(department);
    }

 public static void saveDepartment(Department department)
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
