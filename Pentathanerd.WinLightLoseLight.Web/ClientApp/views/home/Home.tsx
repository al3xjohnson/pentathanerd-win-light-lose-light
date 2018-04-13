import * as React from 'react';
import { RouteComponentProps } from 'react-router';
import GameService from '../../services/GameService';

interface IHomeState {
    playerTurn: string;
    switchSides: boolean;
    forceSwitchQueued: boolean;
    soundBuzzer: boolean;
}

export class Home extends React.Component<RouteComponentProps<{}>, IHomeState> {
    constructor() {
        super();
        this.onKeyDown = this.onKeyDown.bind(this);
        this.state = { playerTurn: "red", switchSides: false, forceSwitchQueued: false, soundBuzzer: false };
    }

    onKeyDown(event : KeyboardEvent) {
        const response = GameService.onKeyDown(event, this.state.playerTurn, this.state.forceSwitchQueued);
        this.setState({
            playerTurn: response.playerTurn,
            switchSides: response.switchSides,
            forceSwitchQueued: response.forceSwitchQueued,
            soundBuzzer: response.soundBuzzer
        });

        if (this.state.switchSides || this.state.soundBuzzer) {
            var audio = document.createElement('audio');
            audio.src = './media/mlg-airhorn.mp3';
            audio.play();
        }
    }

    componentDidMount() {
        document.addEventListener("keydown", this.onKeyDown, false);
    }

    componentWillUnmount() {
        document.removeEventListener("keydown", this.onKeyDown, false);
    }

    render() {
        return <div className={"fill " + this.state.playerTurn}>
            {this.state.switchSides ? (<div className='switchSidesMessageContainer fill'><div className='switchSidesMessage'>Switch Sides!!</div></div>) : ''}
               </div>;
    }
}
