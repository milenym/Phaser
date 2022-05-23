import Phaser from "phaser";
import { GridMap } from "./scene/GridMap";

const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    backgroundColor: '#88bfc1',
    width: 300,
    height: 300,
    scene: GridMap,
    parent: 'game-container'
};

export const game = new Phaser.Game(config);
