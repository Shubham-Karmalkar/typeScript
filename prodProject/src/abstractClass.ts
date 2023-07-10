/**
 * abstract class seems very similar to the interfaces but the difference is that 
 * we can also add function defination in abstract classes
 */

abstract class TakePhoto {//abstract is blue print so we can't create object from it
    constructor(
        public cameraMode: string,
        public filter: string
    ) { }
    
    abstract getSepia(): void

    getReelTime(): number {
        //doing some complex calculation
        return 8;
    }
}


class Instagram extends TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number
    ){
        super(cameraMode, filter)
    }

    getSepia(): void {
        console.log('doing sepia...')
    }
}

const sh = new Instagram("test", "test", 3)