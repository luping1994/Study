package study;

import java.util.concurrent.Callable;

public class RealData implements Callable<String> {
    String name;

    public RealData(String name) {
        this.name = name;

    }

    public String call() throws Exception {
        Thread.sleep(5000);
        return name;
    }
}
