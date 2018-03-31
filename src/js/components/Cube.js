// @flow
import * as React from 'react';
import * as THREE from 'three';

type Props = {
    renderWidth: string,
    renderHeight: string,
    rotationX: number,
    rotationY: number
}

export default class Cube extends React.Component<Props> {
    constructor(props) {
        super(props);

        this.start= this.start.bind(this);
        this.stop = this.stop.bind(this);
        this.animate = this.animate.bind(this);
    }

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
        renderer.setClearColor('#000');
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
        const { rotationX, rotationY } = this.props;

        this.cube.rotation.x += rotationX;
        this.cube.rotation.y += rotationY;

        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera)
    }

    render() {
        const { renderWidth, renderHeight } = this.props;

        return (
            <div
                style={{ width: renderWidth, height: renderHeight }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}