// 
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
class Protoboard {
    
    constructor() {
        this.width = 2;
        this.length = 3;
    }

    setWidth(newWidth) {
        this.width = newWidth;
        this.updateProtoBoard();
    }

    getWidth() {
        return this.width;
    }
    setLength(newLength) {
        this.length = newLength;
    }
    getLength() {
        return this.length;
        this.updateProtoBoard();
    }

    addProtoBoardToScene() {
        // Create the base geometry
        const baseGeometry = new THREE.BoxGeometry(this.width, 0.5, this.length);
        const baseMesh = new THREE.Mesh(baseGeometry);

        // Create a CSG object from the base mesh
        let baseCSG = CSG.fromMesh(baseMesh);

        // Create the hole geometry
        const holeGeometry = new THREE.CylinderGeometry(0.1, 0.1, 0.5, 32);
        
        // Subtract holes from the base geometry
        for (let x = 0; x < this.width; x++) {
            for (let z = 0; z < this.length; z++) {
                const holeMesh = new THREE.Mesh(holeGeometry);
                holeMesh.position.set(x - this.width / 2 + 0.5, 0, z - this.length / 2 + 0.5);
                const holeCSG = CSG.fromMesh(holeMesh);
                baseCSG = baseCSG.subtract(holeCSG);
            }
        }

        // Convert the result back to a mesh
        const resultMesh = CSG.toMesh(baseCSG, new THREE.Matrix4());
       
        // Create a shaded material
        const material = new THREE.MeshPhongMaterial({ color: 0x115511 });

        // Apply the material to the mesh
        resultMesh.material = material;

        return resultMesh;
    }


}