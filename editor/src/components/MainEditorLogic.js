"use client"
import { SceneContext } from './SceneContext';
import React, { useState, useContext } from 'react';
import { ProtoBoard } from "./Parts"







export function AddProtoBoardFromDropdown(scene) {
    

    console.log("Adding ProtoBoard from dropdown");
    // Add ProtoBoard to scene
    let protoBoard = new ProtoBoard();
    
    scene.add(protoBoard.addProtoBoardToScene());

    
}