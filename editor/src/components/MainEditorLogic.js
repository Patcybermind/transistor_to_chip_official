"use client"
import { SceneContext } from './SceneContext';
import React, { useState, useContext } from 'react';
import { ProtoBoard } from "./Parts"
import { PopupComponent } from './UiComponents';






export function AddProtoBoardFromDropdown({ scene, onClose }) {
    const [width, setWidth] = useState(5);
    const [length, setLength] = useState(50);

    const handleOkClick = () => {
        console.log("Adding ProtoBoard from dropdown");
        let protoBoard = new ProtoBoard();
        protoBoard.setWidth(width);
        protoBoard.setLength(length);
        scene.add(protoBoard.addProtoBoardToScene());
        onClose();
    };

    return (
        <PopupComponent>
            <div>
                <label>Width:</label>
                <input type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
            </div>
            <div>
                <label>Length:</label>
                <input type="number" value={length} onChange={(e) => setLength(e.target.value)} />
            </div>
            <button onClick={handleOkClick}>OK</button>
        </PopupComponent>
    );
}
