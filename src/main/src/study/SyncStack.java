package study;

public class SyncStack {
    int index = 0;
    Mantou[] arrMT = new Mantou[6]; //假设这个篮子只能装6个馒头  

    public synchronized void push(Mantou wt) { //装馒头  
        while(index == arrMT.length) { //篮子满了  
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        this.notify(); //如果取馒头的wait了，则通知他醒来  
        arrMT[index] = wt;
        index ++;
    }

    public synchronized Mantou pop() { //取馒头  
        while(index == 0) { //篮子空了  
            try {
                this.wait();
            } catch (InterruptedException e) {
                e.printStackTrace();
            }
        }
        this.notify(); //如果产馒头的wait了，则通知他醒来  
        index --;
        return arrMT[index];

    }
}
