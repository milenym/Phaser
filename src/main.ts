import Phaser from "phaser";
import { GridMap } from "./scene/GridMap";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#88bfc1',
    width: 300,
    height: 300,
    scene: GridMap
};

export const game = new Phaser.Game(config);
