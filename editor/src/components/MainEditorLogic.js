"use client"
import { SceneContext } from './SceneContext';
import React, { useState, useContext } from 'react';
import { ProtoBoard } from "./Parts"
import { PopupComponent } from './UiComponents';






export function AddProtoBoardFromDropdown({ scene, onClose }) {
    const [width, setWidth] = useState(5);
    const [length, setLength] = useState(5);

    const handleOkClick = () => {
        console.log("Adding ProtoBoard from dropdown");
        let protoBoard = new ProtoBoard();
        protoBoard.setWidth(width);
        protoBoard.setLength(length);
        scene.add(protoBoard.addProtoBoardToScene());
        onClose();
    };

    return (
        <div className="@apply popup-overlay">
            <div className="@apply popup-content">
            <h2 class="mb-3 text-xl">Add ProtoBoard</h2>
            

            <div class="@apply popupinputline">
                <label class="mr-5">Width:</label>
                <input class="@apply popupmenuinput" type="number" value={width} onChange={(e) => setWidth(e.target.value)} />
            </div>
            <div class="@apply popupinputline">
                <label>Length:</label>
                <input class="popupmenuinput" type="number" value={length} onChange={(e) => setLength(e.target.value)} />
            </div>
            <button class="@apply addprotoboardpopupokbutton" onClick={handleOkClick}>OK</button>

            </div>
        </div>
    );
}
