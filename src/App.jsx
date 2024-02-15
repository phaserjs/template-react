import Phaser from 'phaser';
import { useRef, useState } from 'react';
import { PhaserGame } from './game/PhaserGame';

function App() {
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
        if (scene) {
            scene.changeScene();
        }
    }

    const moveLogo = () => {
        if (scene && scene.scene.key === 'MainMenu') {
            scene.moveLogo(({x, y}) => {
                setLogoPosition({ x, y });
            });
        }
    }

    const addStars = () => {
        if (scene) {
            // Add more stars
            const x = Phaser.Math.Between(100, scene.scale.width - 100);
            const y = Phaser.Math.Between(100, scene.scale.height - 100);
    
            scene.add.image(x, y, 'star');
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
                    <button disabled={canMoveLogo} className="button-change-scene" onClick={moveLogo}>Move main Logo</button>
                </div>
                <div className="margin-left">
                    <span>Logo Position:</span>
                    <pre>{`{ x: ${logoPosition.x}, y: ${logoPosition.y} }`}</pre>
                </div>
                <div>
                    <button className="button-change-scene" onClick={addStars}>Add stars</button>
                </div>
            </div>
        </div>
    )
}

export default App
