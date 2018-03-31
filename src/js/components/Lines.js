// @flow
import * as React from 'react';
import * as THREE from 'three';

type Props = {
    renderWidth: string,
    renderHeight: string
}

export default class Lines extends React.Component<Props> {
    componentDidMount() {
        const width = this.mount.clientWidth;
        const height = this.mount.clientHeight;

        // create scene
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();

        // create cube
        const material = new THREE.LineBasicMaterial( { color: 0x0000ff } );
        const geometry = new THREE.Geometry();
        const line = new THREE.Line(geometry, material);

        camera.position.set( 0, 0, 50 );
        camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );

        renderer.setClearColor('#fff');
        renderer.setSize(width, height);

        geometry.vertices.push(new THREE.Vector3( -10, 10, 0) );
        geometry.vertices.push(new THREE.Vector3( -10, -10, 0) );
        geometry.vertices.push(new THREE.Vector3( 10, -10, 0) );
        geometry.vertices.push(new THREE.Vector3( 10, 10, 0) );
        geometry.vertices.push(new THREE.Vector3( -10, 10, 0) );

        geometry.faces.push( new THREE.Face3( 0, 1, 2 ) );
        geometry.computeBoundingSphere();

        scene.add(line);

        this.scene = scene;
        this.camera = camera;
        this.renderer = renderer;
        this.material = material;
        this.line = line;

        this.mount.appendChild(this.renderer.domElement);
        this.renderScene();
    }

    renderScene() {
        this.renderer.render(this.scene, this.camera);
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