// @flow
import * as React from 'react';
import * as THREE from 'three';
import { render } from 'react-dom';
import * as Detector from 'three/examples/js/Detector';
import '../scss/style.scss';

type Props = {
    title: string
}

export class App extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.start= this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
    }

    static defaultProps = {
        title: 'Three.js',
    };

    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        // create scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        // create cube
        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshBasicMaterial({ color: '#433F81' });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 4;
        renderer.setClearColor('#fff');
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.material = material;
        this.cube = cube;

        this.mount.appendChild(this.renderer.domElement);
        this.start();
    }

    componentWillUnmount() {
        this.stop();
        this.mount.removeChild(this.renderer.domElement);
    }

    start() {
        if (!this.frameId) {
            this.frameId = requestAnimationFrame(this.animate);
        }
    }

    stop() {
        cancelAnimationFrame(this.frameId);
    }

    animate() {
        this.cube.rotation.x += 0.05;
        this.cube.rotation.y += 0.01;

        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        const { title } = this.props;

        return (
            <div>
                {title}
                <div
                    style={{ width: '500px', height: '500px' }}
                    ref={(mount) => { this.mount = mount }}
                />
            </div>
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



