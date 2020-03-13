package entities;

public class Computer {
    int id;
    String name;
    int RAM;
    int HDD;
    String processor;
    String videoCard;

    public Computer() {
    }

    public Computer(String name, int RAM, int HDD, String processor, String videoCard) {
        this.name = name;
        this.RAM = RAM;
        this.HDD = HDD;
        this.processor = processor;
        this.videoCard = videoCard;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getRAM() {
        return RAM;
    }

    public void setRAM(int RAM) {
        this.RAM = RAM;
    }

    public int getHDD() {
        return HDD;
    }

    public void setHDD(int HDD) {
        this.HDD = HDD;
    }

    public String getProcessor() {
        return processor;
    }

    public void setProcessor(String processor) {
        this.processor = processor;
    }

    public String getVideoCard() {
        return videoCard;
    }

    public void setVideoCard(String videoCard) {
        this.videoCard = videoCard;
    }
}
