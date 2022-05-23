import Phaser from "phaser";
import { GridMap } from "./scene/GridMap";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 300,
    height: 300,
    scene: GridMap
};

const game = new Phaser.Game(config);
