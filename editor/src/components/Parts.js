"use client"
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';

export class ProtoBoard {
    
    constructor() {
        this.width = 2;
        this.length = 3;
        
        console.log("ProtoBoard created");
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
        this.updateProtoBoard();
    }
    getLength() {
        return this.length;
       
    }
    setName(newName) {
        this.name = newName;
    }

    addProtoBoardToScene() {
        // 1 UNIT = 2.54mm KEEP IN MIND
        // Create the base geometry
        const baseGeometry = new THREE.BoxGeometry(this.width, 0.6, this.length);
        const baseMesh = new THREE.Mesh(baseGeometry);

        // Create a CSG object from the base mesh
        let baseCSG = CSG.fromMesh(baseMesh);

        // Create the hole geometry
        const holeGeometry = new THREE.CylinderGeometry(0.17, 0.17, 0.6, 32);
        
        // Subtract holes from the base geometry
        for (let x = 0; x < this.width; x++) {
            for (let z = 0; z < this.length; z++) {
                const holeMesh = new THREE.Mesh(holeGeometry);
                holeMesh.updateMatrix();
                holeMesh.position.set( (this.width / 2 - .5) - x, 0, (this.length / 2 - .5) - z);
                holeMesh.updateMatrix();
                console.log("HoleMesh position: ", holeMesh.position);
                const holeCSG = CSG.fromMesh(holeMesh);
                baseCSG = baseCSG.subtract(holeCSG);
            }
        }

        // Convert the result back to a mesh
        const resultMesh = CSG.toMesh(baseCSG, new THREE.Matrix4());
       
        // Create a shaded material
        // Load the texture
        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./pcb.png'); // Replace with the path to your texture

        // Set the texture wrapping mode to repeat
        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;

        // Set the repeat values for the texture
        texture.repeat.set(1, 1);

        // Create a material with the texture for the top and bottom
        const topBottomMaterial = new THREE.MeshPhongMaterial({ map: texture });

        // Create a green material for the sides
        const sideMaterial = new THREE.MeshPhongMaterial({ color: 0x2c2c2c });

        // Create an array of materials
        const materials = [
            sideMaterial, // Left side
            sideMaterial, // Right side
            topBottomMaterial, // Top side
            topBottomMaterial, // Bottom side
            sideMaterial, // Front side
            sideMaterial // Back side 
        ];

        // Apply the materials to the mesh
        resultMesh.material = materials;

        const uvAttribute = resultMesh.geometry.attributes.uv;
        for (let i = 0; i < uvAttribute.count; i++) {
            const u = uvAttribute.getX(i) * this.width;
            const v = uvAttribute.getY(i) * this.length;
            uvAttribute.setXY(i, u, v);
        }
        uvAttribute.needsUpdate = true;

        // Move the mesh up by half of its height
        resultMesh.position.y += 0.3;

        return resultMesh;
    }


}