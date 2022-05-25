import { Ibounds } from "../models";

const inTileBounds = (target: number, item: number): boolean => {
    return item - 12 <= target && target <= item + 12;
}

export const cursorInGridBounds = (cursorX: number, cursorY: number, boundsElement: Ibounds): boolean  => {
    const inBoundsX = boundsElement.starX <= cursorX && cursorX <= boundsElement.endX;
    const inBoundsY = boundsElement.starY <= cursorY && cursorY <= boundsElement.endY;
            
    return inBoundsX && inBoundsY;
}

export const search = (imageArray: number[], searchedCoord: number): number => {
    let low = 0;
    let mid = 0
    let high = imageArray.length - 1;

    while(low <= high)
    {
        mid = Math.floor((low + high) / 2);

        if (searchedCoord < imageArray[mid] && !inTileBounds(searchedCoord, imageArray[mid])) {
            high = mid - 1;
            continue;
        }
        else if(searchedCoord > imageArray[mid] && !inTileBounds(searchedCoord, imageArray[mid])) {
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