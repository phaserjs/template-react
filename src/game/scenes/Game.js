import { EventBus } from "../EventBus";
import { Scene } from "phaser";

export class Game extends Scene {
    constructor() {
        super("Game");
    }

    create() {
        this.add.image(0, 0, "battle1");
        // scale didnt work, not a scalable file type?
        // background.scale(0.5);
        EventBus.emit("current-scene-ready", this);
    }

    changeScene() {
        this.scene.start("GameOver");
    }
}
