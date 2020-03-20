package entities;

public class Speciality {
    long id;
    String specialityName;

    public Speciality() {
    }

    public Speciality(String specialityName) {
        this.specialityName = specialityName;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getSpecialityName() {
        return specialityName;
    }

    public void setSpecialityName(String specialityName) {
        this.specialityName = specialityName;
    }
}
