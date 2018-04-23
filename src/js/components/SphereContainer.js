import * as React from 'react';
import Sphere from './sphere';

type State = {
    colorValue: string,
    xRotationValue: number,
    yRotationValue: number,
    zRotationValue: number,
}

type Props = {};

export default class SphereContainer extends React.Component<Props, State> {
    state = {
        colorValue: "#61DAFB",
        xRotationValue: 0,
        yRotationValue: 0,
        zRotationValue: 0,
    };

    setColorState = () => {
        const color = document.getElementById('sphere-color-value').value;

        this.setState({
            colorValue: color
        });
    };

    handleRotation = (target, rotationType) => {
        let val = target.value;

        if(val) {
            if(val > 10){
                val = 10
            }
            if(val < 0){
                val = 0
            }

            this.setState({
                [rotationType]: val
            });
        }
    };

    render() {
        const {
            colorValue,
            xRotationValue,
            yRotationValue,
            zRotationValue
        } = this.state;

        return (
            <div className="sphere__container">
                <div className="sphere__edit">
                    <div className="form">
                        <label htmlFor="color-value">Color value</label>
                        <input type="color" onChange={this.setColorState} defaultValue="#61DAFB" id="sphere-color-value" name="color-value" />
                        First round : <br/>
                        <label htmlFor="round-x-rotation-value">X rotation value</label>
                        <input type="number" id="round-x-rotation-value" onChange={(ev) => {this.handleRotation(ev.target, 'xRotationValue')}} step="1" min="0" max="10" value={xRotationValue} />
                        <label htmlFor="round-y-rotation-value">Y rotation value</label>
                        <input type="number" id="round-y-rotation-value" onChange={(ev) => {this.handleRotation(ev.target, 'yRotationValue')}} step="1" min="0" max="10" value={yRotationValue} />
                        <label htmlFor="round-z-rotation-value" >Z rotation value</label>
                        <input type="number" id="round-z-rotation-value" onChange={(ev) => {this.handleRotation(ev.target, 'zRotationValue')}} step="1" min="0" max="10" value={zRotationValue} />
                    </div>
                </div>
                <div className="sphere__view">
                    <Sphere
                        xRotationValue={parseFloat(xRotationValue / 100)}
                        yRotationValue={parseFloat(yRotationValue / 100)}
                        zRotationValue={parseFloat(zRotationValue / 100)}
                        sphereColor={colorValue}
                    />
                </div>
            </div>
        )
    }
}