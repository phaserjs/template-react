import { Scene } from "phaser";

export class Preloader extends Scene {
    constructor() {
        super("Preloader");
    }

    init() {
        //  We loaded this image in our Boot Scene, so we can display it here
        this.add.image(512, 384, "background");

        //  A simple progress bar. This is the outline of the bar.
        this.add.rectangle(512, 384, 468, 32).setStrokeStyle(1, 0xffffff);

        //  This is the progress bar itself. It will increase in size from the left based on the % of progress.
        const bar = this.add.rectangle(512 - 230, 384, 4, 28, 0xffffff);

        //  Use the 'progress' event emitted by the LoaderPlugin to update the loading bar
        this.load.on("progress", (progress) => {
            //  Update the progress bar (our bar is 464px wide, so 100% = 464px)
            bar.width = 4 + 460 * progress;
        });
    }

    preload() {
        //  Load the assets for the game - Replace with your own assets
        this.load.setPath("assets");

        this.load.image(
            { key: "logo", url: "logo.png" },
            { key: "star", url: "star.png" }
        );
        // Backgrounds
        this.load.setPath("assets/image/PNG");
        this.load.image([
            {
                key: "battle1",
                url: "./game_background_1/game_background_1.png",
            },
            {
                key: "battle2",
                url: "./game_background_2/game_background_2.png",
            },
            {
                key: "battle3",
                url: "./game_background_3/game_background_3.png",
            },
            {
                key: "battle4",
                url: "./game_background_4/game_background_4.png",
            },
        ]);
    }

    create() {
        //  When all the assets have loaded, it's often worth creating global objects here that the rest of the game can use.
        //  For example, you can define global animations here, so we can use them in other scenes.

        //  Move to the MainMenu. You could also swap this for a Scene Transition, such as a camera fade.
        this.scene.start("MainMenu");
    }
}
