import Phaser from 'phaser';
import { useRef, useState } from 'react';
import { PhaserGame } from './game/PhaserGame';

function App ()
{
    const [logoPosition, setLogoPosition] = useState({ x: 0, y: 0 });
    const [canMoveLogo, setCanMoveLogo] = useState(true);

    // Phaser game instance
    const [scene, setScene] = useState(null);

    const phaserRef = useRef();

    // Update the current active scene
    const setCurrentActiveScene = (scene) => {
        setScene(scene);
        setCanMoveLogo(scene.scene.key !== 'MainMenu');
    }

    const changeScene = () => {
        if (scene)
        {
            scene.changeScene();
        }
    }

    const moveSprite = () => {
        if (scene && scene.scene.key === 'MainMenu')
        {
            scene.moveLogo(({ x, y }) => {

                setLogoPosition({ x, y });

            });
        }
    }

    const addSprite = () => {
        if (scene)
        {
            // Add more stars
            const x = Phaser.Math.Between(64, scene.scale.width - 64);
            const y = Phaser.Math.Between(64, scene.scale.height - 64);

            //  `add.sprite` is a Phaser GameObjectFactory method and it returns a Sprite Game Object instance
            const star = scene.add.sprite(x, y, 'star');

            //  ... which you can then act upon. Here we create a Phaser Tween to fade the star sprite in and out.
            //  You could, of course, do this from within the Phaser Scene code, but this is just an example
            //  showing that Phaser objects and systems can be acted upon from outside of Phaser itself.
            scene.add.tween({
                targets: star,
                duration: 500 + Math.random() * 1000,
                alpha: 0,
                yoyo: true,
                repeat: -1
            });
        }
    }

    return (
        <div id="app">
            <PhaserGame ref={phaserRef} currentActiveScene={setCurrentActiveScene} />
            <div>
                <div>
                    <button className="button-change-scene" onClick={changeScene}>Change Scene</button>
                </div>
                <div>
                    <button disabled={canMoveLogo} className="button-change-scene" onClick={moveSprite}>Move main Logo</button>
                </div>
                <div className="margin-left">
                    <span>Logo Position:</span>
                    <pre>{`{ x: ${logoPosition.x}, y: ${logoPosition.y} }`}</pre>
                </div>
                <div>
                    <button className="button-change-scene" onClick={addSprite}>Add stars</button>
                </div>
            </div>
        </div>
    )
}

export default App
