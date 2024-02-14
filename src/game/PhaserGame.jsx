import PropTypes from 'prop-types';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from "./main"
import { EventBus } from './EventBus';

export const PhaserGame = forwardRef(function PhaserGame ({ currentActiveScene }, ref) {
    const game = useRef();

    useLayoutEffect(() => {
        if (game.current === undefined) {
            game.current = StartGame("game-container");
            ref.current = { game: game.current, scene: null };
        }
    
        return () => {
            if (game.current) {
                game.current.destroy(true);
                game.current = undefined;
            }
        }
    }, [ref]);

    useEffect(() => {
        EventBus.on('current-scene-ready', (scene_instance) => {
            if (currentActiveScene instanceof Function) {
                currentActiveScene(scene_instance);
                ref.current.scene = scene_instance;
            }
        });
        return () => {
            EventBus.removeListener('current-scene-ready')
        }
    }, [currentActiveScene, ref])

    return (
        <div id="game-container"></div>
    );

});

// Add prop validation
PhaserGame.propTypes = {
    currentActiveScene: PropTypes.func
}