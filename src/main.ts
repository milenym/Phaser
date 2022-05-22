import Phaser from "phaser";
import { FourSquares } from "./scene/FourSquares";

const config = {
    type: Phaser.AUTO,
    backgroundColor: '#125555',
    width: 200,
    height: 200,
    scene: FourSquares
};

const game = new Phaser.Game(config);
