import { Coordinate, Ibounds } from "../models";

const inBounds = (target: number, item: number): boolean => {
    return item - 12 <= target && target <= item + 12;
}

export const cursorInBounds = (cursorX: number, cursorY: number, boundsElement: Ibounds): boolean  => {
    const inBoundsX = boundsElement.starX <= cursorX && cursorX <= boundsElement.endX;
    const inBoundsY = boundsElement.starY <= cursorY && cursorY <= boundsElement.endY;
            
    return inBoundsX && inBoundsY;
}

export const search = (imageArray: Phaser.GameObjects.Image[], num: number, coordinate: Coordinate): number => {
    let low = 0;
    let mid = 0
    let high = imageArray.length - 1;

    while(low <= high)
    {
        mid = Math.floor((low + high) / 2);

        if (num < imageArray[mid][coordinate] && !inBounds(num, imageArray[mid][coordinate])) {
            high = mid - 1;
            continue;
        }
        else if(num > imageArray[mid][coordinate] && !inBounds(num, imageArray[mid][coordinate])) {
            low = mid + 1;
            continue
        }
        else {
            return mid;
        }
    }
    return -1;
}

export const getBounds = (startElement: Phaser.GameObjects.Image, endElement: Phaser.GameObjects.Image = startElement): Ibounds=> {
    return {
        starX: startElement.x - 12,
        starY: startElement.y - 12,
        endX: endElement.x + 12,
        endY: endElement.y + 12
    };
}