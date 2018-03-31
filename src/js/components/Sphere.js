// @flow
import * as React from 'react';
import * as THREE from 'three';

type Props = {
    rotationX: number,
    rotationY: number
}

export default class Sphere extends React.Component<Props> {
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
        const renderer = new THREE.WebGLRenderer({ alpha: true });

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

        // create sphere
        const geometry = new THREE.SphereBufferGeometry( 0.5, 20, 20);
        const material = new THREE.MeshPhongMaterial( { color: '#61DAFB'} );
        const sphere = new THREE.Mesh(geometry, material);
        sphere.position.x = -60;
        sphere.position.y = -0.3;
        sphere.position.z = 1;
        sphere.castShadow = true;
        scene.add(sphere);

        // create round
        const geometryCircle = new THREE.CircleBufferGeometry(5, 40);
        const materialCircle = new THREE.MeshPhongMaterial( { color: '#61DAFB', wireframe: true} );
        const round = new THREE.Mesh(geometryCircle, materialCircle);
        round.position.x = -60;
        round.position.y = -0.2;
        round.position.z = 0;
        round.rotation.x += 52;
        scene.add(round);

        // create round2
        const geometryCircle2 = new THREE.CircleBufferGeometry( 5, 40);
        const materialCircle2 = new THREE.MeshPhongMaterial( { color: '#61DAFB', wireframe: true} );
        const round2 = new THREE.Mesh(geometryCircle2, materialCircle2);
        round2.position.x = -60;
        round2.position.y = 0;
        round2.position.z = 0;
        round2.rotation.y += 40;
        round2.rotation.x += 90;
        scene.add(round2);

        // create round3
        const geometryCircle3 = new THREE.CircleBufferGeometry( 5, 40);
        const materialCircle3 = new THREE.MeshPhongMaterial( { color: '#61DAFB', wireframe: true} );
        const round3 = new THREE.Mesh(geometryCircle3, materialCircle3);
        round3.position.x = -60;
        round3.position.y = 0;
        round3.position.z = 0;
        round3.rotation.y -= 40;
        round3.rotation.x += 90;
        scene.add(round3);

        camera.position.z = 17;
        camera.position.x = -60;
        camera.position.y = 0;

        renderer.setClearColor(0x000000, 0);
        renderer.setSize(width, height);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.sphere = sphere;
        this.round = round;
        this.round2 = round2;
        this.round3 = round3;

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

        this.sphere.rotation.x += rotationX;
        this.sphere.rotation.y += rotationY;

        this.round.rotation.z += 0.01;
        this.round2.rotation.z += 0.01;
        this.round3.rotation.z += 0.01;

        this.renderScene();
        this.frameId = window.requestAnimationFrame(this.animate);
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera)
    }

    render() {

        return (
            <div
                style={{ width: '400px', height: '400px' }}
                ref={(mount) => { this.mount = mount }}
            />
        )
    }
}