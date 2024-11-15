"use client"
import * as THREE from 'three';
import { CSG } from 'three-csg-ts';
import dynamic from 'next/dynamic';

//const BufferGeometryUtils = dynamic(() => import('three/examples/jsm/utils/BufferGeometryUtils.js'), { ssr: false });
import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";

export class ProtoBoard {
    
    constructor() {
        this.width = 2;
        this.length = 3;
        
        console.log("ProtoBoard created");
    }

    setWidth(newWidth) {
        this.width = newWidth;
        //this.updateProtoBoard();
    }

    getWidth() {
        return this.width;
    }
    setLength(newLength) {
        this.length = newLength;
        //this.updateProtoBoard();
    }
    getLength() {
        return this.length;
       
    }
    setName(newName) {
        this.name = newName;
    }

    addProtoBoardToScene() {
        // 1 UNIT = 2.54mm KEEP IN MIND
        
        const baseGeometry = new THREE.BoxGeometry(this.width, 0.6, this.length);
        const baseMesh = new THREE.Mesh(baseGeometry);
        let baseCSG = CSG.fromMesh(baseMesh);

        // Create the hole geometry
        const holeGeometry = new THREE.CylinderGeometry(0.17, 0.17, 0.6, 8);
        const holeGeometries = [];

        
        for (let x = 0; x < this.width; x++) {
            for (let z = 0; z < this.length; z++) {
                const holeMesh = new THREE.Mesh(holeGeometry);
                holeMesh.position.set((this.width / 2 - 0.5) - x, 0, (this.length / 2 - 0.5) - z);
                holeMesh.updateMatrix();
                const holeBufferGeometry = holeMesh.geometry.clone();
                holeBufferGeometry.applyMatrix4(holeMesh.matrix);
                holeGeometries.push(holeBufferGeometry);
            }
        }

        // Merge all hole geometries into one
        const mergedHolesGeometry = BufferGeometryUtils.mergeGeometries(holeGeometries); //was BufferGeometryUtils.mergeBufferGeometries

        // Convert the holes geometry to a CSG object
        const holesCSG = CSG.fromMesh(new THREE.Mesh(mergedHolesGeometry));

        // Subtract the holes from the base geometry in one operation
        baseCSG = baseCSG.subtract(holesCSG);
        

        // Convert the result back to a mesh
        let resultMesh = CSG.toMesh(baseCSG, new THREE.Matrix4()); // was const
        let fixedUpGeometry = BufferGeometryUtils.mergeVertices(resultMesh.geometry, 0.0001);
        fixedUpGeometry.computeVertexNormals();
        resultMesh.geometry = fixedUpGeometry;


        const textureLoader = new THREE.TextureLoader();
        const texture = textureLoader.load('./pcb.png');

        texture.wrapS = THREE.RepeatWrapping;
        texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(1, 1);

        const topBottomMaterial = new THREE.MeshPhongMaterial({ map: texture });
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

        resultMesh.material = materials;

        const uvAttribute = resultMesh.geometry.attributes.uv;
        for (let i = 0; i < uvAttribute.count; i++) {
            const u = uvAttribute.getX(i) * this.width;
            const v = uvAttribute.getY(i) * this.length;
            uvAttribute.setXY(i, u, v);
        }
        uvAttribute.needsUpdate = true;

        resultMesh.position.y += 0.3; // adjust if height of base changes
        

        return resultMesh;
    }


}