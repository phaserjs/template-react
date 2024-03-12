import PropTypes from 'prop-types';
import { forwardRef, useEffect, useLayoutEffect, useRef } from 'react';
import StartGame from './main';
import { EventBus } from './EventBus';
import Phaser from 'phaser';

interface PhaserGameProps {
    currentActiveScene: (scene: Phaser.Scene) => void;
}

export const PhaserGame = forwardRef<Phaser.Game, PhaserGameProps>(function PhaserGame ({ currentActiveScene }, ref)
{
    const game = useRef<Phaser.Game | undefined>();

    // Create the game inside a useLayoutEffect hook to avoid the game being created outside the DOM
    useLayoutEffect(() => {

        if (game.current === undefined)
        {
            game.current = StartGame("game-container");

            if (ref !== null)
            {
                // @ts-ignore
                ref.current = { game: game.current, scene: null };
            }
        }

        return () => {

            if (game.current)
            {
                game.current.destroy(true);
                game.current = undefined;
            }

        }
    }, [ref]);

    useEffect(() => {

        EventBus.on('current-scene-ready', (currentScene: Phaser.Scene) => {

            if (currentActiveScene instanceof Function)
            {
                currentActiveScene(currentScene);
                // @ts-ignore
                if (ref?.current) {
                    // @ts-ignore
                    ref.current.scene = currentScene;
                }
            }

        });

        return () => {

            EventBus.removeListener('current-scene-ready');

        }

    }, [currentActiveScene, ref])

    return (
        <div id="game-container"></div>
    );

});