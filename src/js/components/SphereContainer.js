import * as React from 'react';
import Sphere from './sphere';

type State = {
    colorValue: string;
}

type Props = {};

export default class SphereContainer extends React.Component<Props, State> {
    state = {
        colorValue: "#61DAFB",
    };

    setColorState = () => {
        const color = document.getElementById('sphere-color-value').value;

        this.setState({
            colorValue: color
        });
    };

    render() {
        const { colorValue } = this.state;

        return (
            <div className="sphere__container">
                <div className="sphere__edit">
                    <div className="form">
                        <label htmlFor="color-value">Color value</label>
                        <input type="color" onChange={this.setColorState} defaultValue="#61DAFB" id="sphere-color-value" name="color-value" />
                    </div>
                </div>
                <div className="sphere__view">
                    <Sphere
                        rotationX={0.01}
                        rotationY={0.01}
                        sphereColor={colorValue}
                    />
                </div>
            </div>
        )
    }
}