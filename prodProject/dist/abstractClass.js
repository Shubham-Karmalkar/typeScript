"use strict";
/**
 * abstract class seems very similar to the interfaces but the difference is that
 * we can also add function defination in abstract classes
 */
class TakePhoto {
    constructor(cameraMode, filter) {
        this.cameraMode = cameraMode;
        this.filter = filter;
    }
    getReelTime() {
        //doing some complex calculation
        return 8;
    }
}
class Instagram extends TakePhoto {
    constructor(cameraMode, filter, burst) {
        super(cameraMode, filter);
        this.cameraMode = cameraMode;
        this.filter = filter;
        this.burst = burst;
    }
    getSepia() {
        console.log('doing sepia...');
    }
}
const sh = new Instagram("test", "test", 3);
