import { ContentKey } from "./assets.enum";
import { IgridBounds } from "./grid-bounds";

export class GridMap extends Phaser.Scene {

    private menuItems: Phaser.GameObjects.Image[] = [];
    private grid: Phaser.GameObjects.Image[][] = [];
    private activeImage?: Phaser.GameObjects.Image;
    private selectedMenuItem = 0

    private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;
    
    // TODO: export to JSON or user input
    private gridConfig = {
        numberOfTilesX: 4,
        numberOfTilesY: 4
    }
    private gridBounds?: IgridBounds;

    preload() {
        this.load.image(ContentKey.Dragon, 'assets/tile1.jpg');
        this.load.image(ContentKey.Stone, 'assets/tile2.jpg');
        this.load.image(ContentKey.Empty, 'assets/empty.png');
    }

    create() {
        this.cursors = this.input.keyboard.createCursorKeys();
        this.input.on('pointerdown', this.gridTilePaste, this);
        // this.input.on('pointerover', this.tileHover); // TODO: add hover color background

        this.grid = this.populateGrid();
        this.gridBounds = this.getGridBounds();

        const menuItem1 = this.add.image(+this.game.config.width / 2 - 12, +this.game.config.height - 20, ContentKey.Dragon);
        const menuItem2 = this.add.image(+this.game.config.width / 2 + 12, +this.game.config.height - 20, ContentKey.Stone);

        this.menuItems.push(menuItem1, menuItem2);

        this.selectedTile(0);
    }

    update() {
        const leftKeyPressed = Phaser.Input.Keyboard.JustDown(this.cursors?.left);
        const rightKeyPressed = Phaser.Input.Keyboard.JustDown(this.cursors?.right);
        const spaceKeyPressed = Phaser.Input.Keyboard.JustDown(this.cursors?.space);

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

    private populateGrid(): Phaser.GameObjects.Image[][] {
        const grid: Phaser.GameObjects.Image[][] = []

        for (let x = 0; x < this.gridConfig.numberOfTilesX; x++) {
            grid[x] = []

            for (let y = 0; y < this.gridConfig.numberOfTilesY; y++) {
                
                const xStartPoint = this.gridConfig.numberOfTilesX * 24 / 2;
                const yStartpoint = this.gridConfig.numberOfTilesY * 24 / 2;

                const newGridX = (+this.game.config.width / 2) - xStartPoint + (x * 24) + 12;
                const newGridY = (+this.game.config.height / 2) - yStartpoint + (y * 24) + 12;

                const gridElement = this.add.image(newGridX, newGridY, ContentKey.Empty);
                grid[x][y] = gridElement;
            }
        }

        return grid;
    }

    private getGridBounds(): IgridBounds {
        return {
            starX: this.grid[0][0].x - 12,
            starY: this.grid[0][0].y - 12,
            endX: this.grid[this.gridConfig.numberOfTilesX - 1][this.gridConfig.numberOfTilesX -1].x + 12,
            endY: this.grid[this.gridConfig.numberOfTilesY - 1][this.gridConfig.numberOfTilesY -1].y + 12
        };
    }

    private selectedTile(index: number): void {
        const currentItem = this.menuItems[this.selectedMenuItem];

        currentItem.setTint(0xffffff);

        const item = this.menuItems[index];
        item.setTint(0x66ff7f); // TODO: add arrow or better indication for selected image
       
        this.selectedMenuItem = index;
    }

    private selectNextTile(change = 1): void {
        let index = this.selectedMenuItem + change;

        if(index >= this.menuItems.length) {
            index = 0
        }
        else if(index < 0) {
            index = this.menuItems.length - 1;
        }

        this.selectedTile(index);
    }

    private confirmSelection(): void {
        if (this.activeImage && this.activeImage === this.menuItems[this.selectedMenuItem]) {
            this.gridTilePaste(this.input.activePointer);
        }
        else {
            this.activeImage = this.menuItems[this.selectedMenuItem];
        }
    }

    private gridTilePaste(pointer: Phaser.Input.Pointer): void {
        if (this.activeImage) {
            const gridItem = this.locateGridTile(pointer.position.x, pointer.position.y);

            if (gridItem) {
                gridItem.setTexture(this.activeImage ? this.activeImage.texture.key : ContentKey.Empty)
            }
        }
    }

    private locateGridTile(inputCoordX: number, inputCoordY: number): Phaser.GameObjects.Image | undefined {
        if (this.cursorInBounds(inputCoordX, inputCoordY)) {
            for (let x = 0; x < this.gridConfig.numberOfTilesX; x++) {
                for (let y = 0; y < this.gridConfig.numberOfTilesY; y++) {
                    const gridItem = this.grid[x][y];
    
                    if (gridItem.x - 12 <= inputCoordX 
                       && gridItem.x + 12 >= inputCoordX 
                       && gridItem.y - 12 <= inputCoordY 
                       && gridItem.y + 12 >= inputCoordY
                       ) 
                    {
    
                        return this.grid[x][y];
                    }
                }
            }
        }
    }

    private cursorInBounds(cursorX: number, cursorY: number): boolean {
        if(this.gridBounds) {
            const inBoundsX =  this.gridBounds.starX <= cursorX && cursorX <= this.gridBounds.endX;
            const inBoundsY = this.gridBounds.starY <= cursorY && cursorY <= this.gridBounds.endY;
            
            return inBoundsX && inBoundsY;
        }
        return false;
    }
}