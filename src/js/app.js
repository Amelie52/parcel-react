// @flow
import * as React from 'react';
import { render } from 'react-dom';
import * as Detector from 'three/examples/js/Detector';
import SphereContainer from './components/SphereContainer';
import '../scss/style.scss';

type Props = {
    title: string
}

export class App extends React.Component<Props> {
    static defaultProps = {
        title: 'Three.js & ReactJs',
    };

    render() {
        const { title } = this.props;

        return (
            <React.Fragment>
                <div className="title">
                    {title}
                </div>
                <SphereContainer />
            </React.Fragment>
        )
    }
}

const app = document.getElementById('app');

if (app == null) {
    throw new Error("no app element");
}

if (!Detector.webgl) {
    throw new Error("no webgl for your browser");
}

render(
    <App />,
    app
);



