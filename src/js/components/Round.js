// @flow
import * as React from 'react';
import * as THREE from 'three';

type Props = {
    renderWidth: string,
    renderHeight: string,
    rotationX: number,
    rotationY: number
}

export default class Round extends React.Component<Props> {
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
        const camera = new THREE.PerspectiveCamera(35, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        // create lights
        const ambient = new THREE.AmbientLight( 0xffffff, 0.7 );
        scene.add( ambient );

        const spotLight = new THREE.SpotLight( 0xffffff, 0.4 );
        spotLight.position.set( -100, 10, 30 );
        spotLight.angle = Math.PI / 4;
        spotLight.penumbra = 1;
        spotLight.decay = 0.5;
        spotLight.distance = 200;
        spotLight.castShadow = true;
        scene.add( spotLight );

        // const spotLightHelper = new THREE.SpotLightHelper( spotLight );
        // scene.add( spotLightHelper );


        // create round
        const geometry = new THREE.circleBufferGeometry( 2, 20, 20);
        const material = new THREE.MeshPhongMaterial( { color: '#61DAFB', wireframe: true} );
        const round = new THREE.Mesh(geometry, material);
        round.position.x = -60;
        round.position.y = 0;
        round.position.z = 20;
        round.castShadow = true;
        scene.add(round);

        camera.position.z = 50;
        camera.position.x = -60;
        camera.position.y = 0;
        renderer.setClearColor('#000');
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.round = round;

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

        this.round.rotation.x += rotationX;
        this.round.rotation.y += rotationY;

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