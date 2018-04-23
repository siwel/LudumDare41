export default class GameOverScreen {
    constructor(data) {
        console.log("stars" , data);
        this.stars = data.stars;
        this.completed = data.c;
        this.failed = data.f;

        this.screen = new PIXI.Container();

        const rectangle = new PIXI.Graphics();
        rectangle.beginFill(0xFFFFFF);
        rectangle.lineStyle(5, 0x0000FF);
        rectangle.drawRoundedRect(window.innerWidth * 0.25, window.innerHeight * 0.25, 500, 400, 20);

        this.screen.addChild(rectangle);

        this.addText();
    }

    addText() {

        var style = new PIXI.TextStyle({
            fontFamily: 'Luckiest+Guy',
            fontSize: 30

        });
        const text = new PIXI.Text(`
        Final stats:
        ${this.completed} tables completed
        ${this.failed} tables failed
        Goggle Review: ${this.stars} stars
        `,style);

        text.fontFamily = "Luckiest+Guy";

        text.position = new PIXI.Point(window.innerWidth * 0.25+50, 300);

        this.screen.addChild(text);
    }

    get sprite() {
        return this.screen;
    }
}