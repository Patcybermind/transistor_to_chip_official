"use client"
import { SceneContext } from './SceneContext';
import React, { useState, useContext } from 'react';
import { ProtoBoard } from "./Parts"







export function AddProtoBoardFromDropdown(scene) {
    

    console.log("Adding ProtoBoard from dropdown");
    // Add ProtoBoard to scene
    let protoBoard = new ProtoBoard();
    protoBoard.setWidth(5);
    protoBoard.setLength(50);
    scene.add(protoBoard.addProtoBoardToScene());

    
}