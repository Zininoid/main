package entities;

public class Role {
    long id;
    MainRoles roleName;
    String roleDescription;

    public Role() {
    }

    public Role(MainRoles roleName, String roleDescription) {
        this.roleName = roleName;
        this.roleDescription = roleDescription;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public MainRoles getRoleName() {
        return roleName;
    }

    public void setRoleName(MainRoles roleName) {
        this.roleName = roleName;
    }

    public String getRoleDescription() {
        return roleDescription;
    }

    public void setRoleDescription(String roleDescription) {
        this.roleDescription = roleDescription;
    }
}
