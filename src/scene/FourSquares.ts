import { ISelectedState } from "../selected-state";

export class FourSquares extends Phaser.Scene {

    private menuItems: Phaser.GameObjects.Image[] = [];
    private grid: Phaser.GameObjects.Image[][] = [];
    private selectedMenuItem = 0
    private selectedImageState: ISelectedState = {
        activeImage: false
    };

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

    // TODO: export to JSON or user input
    private gridConfig = {
        numberOfTilesX: 4,
        numberOfTilexY: 4
    }

    init() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerdown', this.tileClick, this);
        this.input.on('pointerover', this.tileHover);
    }

    preload() {
        this.load.image('dragon', 'assets/tile1.jpg');
        this.load.image('stone', 'assets/tile2.jpg');
        this.load.image('empty', 'assets/empty.png');
    }

    create() {

        for (let x = 0; x < this.gridConfig.numberOfTilesX; x++) {
            this.grid[x] = []

            for (let y = 0; y < this.gridConfig.numberOfTilexY; y++) {
                const xStartPoint = this.gridConfig.numberOfTilesX * 24 / 2;
                const yStartpoint = this.gridConfig.numberOfTilexY * 24 / 2;
                const sx = (+this.game.config.width / 2) - xStartPoint + (x * 24) + 12;
                const sy = (+this.game.config.height / 2) - yStartpoint + (y * 24) + 12;

                const gridElement = this.add.image(sx, sy, 'empty');
                this.grid[x][y] = gridElement;
            }
        }

        const tile1 = this.add.image(+this.game.config.width / 2 - 12, +this.game.config.height - 20, 'dragon');
        const tile2 = this.add.image(+this.game.config.width / 2 + 12, +this.game.config.height - 20, 'stone');


        this.menuItems.push(tile1, tile2);

        this.selectedTile(0);
    }

    update() {
        const leftKeyPressed = Phaser.Input.Keyboard.JustDown(this.cursors.left!);
        const rightKeyPressed = Phaser.Input.Keyboard.JustDown(this.cursors.right!);
        const spaceKeyPressed = Phaser.Input.Keyboard.JustDown(this.cursors.space!);

        if (leftKeyPressed) {
            this.selectNextTile(1);
        }
        else if (rightKeyPressed) {
            this.selectNextTile(-1);
        } 
        else if (spaceKeyPressed) {
            this.confirmSelection();
        }
    }

    private selectedTile(index: number) {
        const currentItem = this.menuItems[this.selectedMenuItem];

        currentItem.setTint(0xffffff);

        const item = this.menuItems[index];
        item.setTint(0x66ff7f);
       
        this.selectedMenuItem = index;
    }

    private selectNextTile(change: number = 1) {
        let index = this.selectedMenuItem + change;

        if(index >= this.menuItems.length) {
            index = 0
        }
        else if(index < 0) {
            index = this.menuItems.length - 1;
        }

        this.selectedTile(index);
    }

    private confirmSelection() {
        const selectedItem = this.menuItems[this.selectedMenuItem];

        this.selectedImageState.currentImage = selectedItem;
        this.selectedImageState.activeImage = true;       
    }

    private tileClick(pointer: any) {
        if (this.selectedImageState.activeImage && this.selectedImageState.currentImage) {
            for (let x = 0; x < this.gridConfig.numberOfTilesX; x++) {

                for (let y = 0; y < this.gridConfig.numberOfTilexY; y++) {
                    const gridItem = this.grid[x][y];
    
                    if(
                        gridItem.x - 12 <= pointer.position.x 
                        && gridItem.x + 12 >= pointer.position.x 
                        && gridItem.y - 12 <= pointer.position.y 
                        && gridItem.y + 12 >= pointer.position.y) {
    
                        this.grid[x][y].setTexture(this.selectedImageState.currentImage.texture.key);
                        break;
                    }
                }
            }
        }
    }

    private tileHover(pointer: any) {
        debugger;
    }
}