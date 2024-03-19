const prompt = require('prompt-sync')();

const hat = '^';
const hole = 'O';
const fieldCharacter = '░';
const pathCharacter = '*';

class Field {
    field: string[][];
    constructor(field: string[][]) {
        this.field = field;
    }

    getCurrentCell(x: number, y: number) {
        return this.field[y][x];
    }

    visitCell(y: number, x: number) {
        this.field[y][x] = '*';
    }

    print() {
        this.field.forEach((line) => console.log(line.toString()));
    }
}

class Game {
    playground: Field;
    status: string;
    xPosition: number;
    yPosition: number;

    constructor(field: Field) {
        this.playground = field;
        this.status = 'stop';
        this.xPosition = 0;
        this.yPosition = 0;
    }

    move(direction: string) {
        switch (direction) {
            case 'l':
                this.xPosition -= 1;
                break;
            case 'r':
                this.xPosition += 1;
                break;
            case 'u':
                this.yPosition -= 1;
                break;
            case 'd':
                this.yPosition += 1;
        }
    }

    checkPosition() {
        if (
            //assume that the playground is always a square
            this.xPosition < 0 ||
            this.xPosition >= this.playground.field.length ||
            this.yPosition < 0 ||
            this.yPosition >= this.playground.field.length
        ) {
            this.lose();
        }
        const currentCell = this.playground.getCurrentCell(
            this.xPosition,
            this.yPosition
        );
        switch (currentCell) {
            case 'O':
                this.lose();
                break;
            case '^':
                this.win();
                break;
        }
    }

    win() {
        console.log('you won');
        this.status = 'stop';
        process.exit();
    }

    lose() {
        console.log('you lost');
        this.status = 'stop';
        process.exit();
    }

    startGame() {
        this.status = 'go';
        while (this.status === 'go') {
            console.clear();
            this.playground.print();
            let userInput = prompt("What's your next move? ");
            this.move(userInput);
            this.checkPosition();
            this.playground.visitCell(this.yPosition, this.xPosition);
        }
    }
}

// INIT

const myField = new Field([
    ['*', '░', '░'],
    ['░', 'O', '░'],
    ['░', '^', '░'],
]);

const newGame = new Game(myField);
newGame.startGame();