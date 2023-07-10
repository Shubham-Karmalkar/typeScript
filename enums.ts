// const AISLE = 0;
// const MIDDLE = 1;
// const WINDOW = 2;
//above code is not good

enum SeatChoise {
    AISLE = "AISLE",
    MIDDLE = "MIDDLE",
    WINDOW = "WINDOW"
}

const enum NewSeatChoise { // this way producess simpler javascript for this typescript
    AISLE = "AISLE",
    MIDDLE = "MIDDLE",
    WINDOW = "WINDOW"
}

const hcSeat = SeatChoise.AISLE

const newSeat = NewSeatChoise.MIDDLE 

export { }