import KeyCode from '../constants/KeyCode';

class KeyDownResponse {
    switchSides: boolean;
    playerTurn: string;
    forceSwitchQueued: boolean;
    soundBuzzer: boolean;
}

class GameService {
    public static onKeyDown(event: KeyboardEvent, currentPlayer: string, forceSideSwitch: boolean) : KeyDownResponse {
        let nextPlayer = currentPlayer;
        let queueForceSwitch: boolean = false;
        let sideSwap: boolean = false;
        let manuallySoundBuzzer: boolean = false;

        if (event.keyCode === KeyCode.ENTER) {
            queueForceSwitch = true;
        } else if (event.keyCode === KeyCode.LAYER) {
            if (currentPlayer === 'red') {
                nextPlayer = 'blue';
            } else {
                nextPlayer = 'red';
            }

            if (forceSideSwitch || this.shouldSwitchSides()) {
                sideSwap = true;
            }
        }
        else if (event.keyCode === KeyCode.B) {
            manuallySoundBuzzer = true;
        }

        return { switchSides: sideSwap, playerTurn: nextPlayer, forceSwitchQueued: queueForceSwitch, soundBuzzer: manuallySoundBuzzer };
    }

    private static shouldSwitchSides() {
        const randomNumber = Math.floor(Math.random() * 10);
        return randomNumber === 6;
    }
}

export default GameService