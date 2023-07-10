interface TakePhoto {
    cameraMode: string
    filter: string
    burst: number
}

interface Story {
    createStory(): void
}

class Instagram implements TakePhoto {
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number
    ) { }
}

class YouTube implements TakePhoto, Story {//we can implement multipe interface
    constructor(
        public cameraMode: string,
        public filter: string,
        public burst: number,
        public short: string
    ) { }

    createStory(): void {
        console.log("story was created")
    }
}

class newClass extends Instagram implements TakePhoto {

}

export { }