package entities;

public class Hardware {
    private long id;
    private String hardwareName;
    private String hardwareInterface;
    private String hardWareSerialNumber;

    public Hardware() {
    }

    public Hardware(String hardwareName, String hardwareInterface, String hardWareSerialNumber) {
        this.hardwareName = hardwareName;
        this.hardwareInterface = hardwareInterface;
        this.hardWareSerialNumber = hardWareSerialNumber;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getHardwareName() {
        return hardwareName;
    }

    public void setHardwareName(String hardwareName) {
        this.hardwareName = hardwareName;
    }

    public String getHardwareInterface() {
        return hardwareInterface;
    }

    public void setHardwareInterface(String hardwareInterface) {
        this.hardwareInterface = hardwareInterface;
    }

    public String getHardWareSerialNumber() {
        return hardWareSerialNumber;
    }

    public void setHardWareSerialNumber(String hardWareSerialNumber) {
        this.hardWareSerialNumber = hardWareSerialNumber;
    }
}
