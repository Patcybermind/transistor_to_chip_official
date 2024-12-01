"use client"
import React, { useState, useContext } from 'react';
import '../app/globals.css';
import { SceneContext } from './SceneContext';
import { AddProtoBoardFromDropdown } from "./MainEditorLogic";

export function AddDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [isProtoBoardPopupVisible, setIsProtoBoardPopupVisible] = useState(false);
  const { scene } = useContext(SceneContext);

  const handleAddProtoBoardClick = () => {
    console.log("AddProtoBoardHasBeenClicked worked!");
    setIsProtoBoardPopupVisible(true);
  };

  return (
    <div
        className="relative inline-block text-left"
        onMouseEnter={() => setIsOpen(true)}
        onMouseLeave={() => setIsOpen(false)}
    >
        <div>
            <button
                type="button"
                className="@apply dropdownmenubutton"
            >
                add
            </button>
        </div>

        {isOpen && (
            <div className="@apply dropdownmenubox">
                <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <button
                        onClick={handleAddProtoBoardClick}
                        className="@apply dropdownmenuitems"
                        role="menuitem"
                    >
                        ProtoBoard
                    </button>
                </div>
            </div>
        )}

        {isProtoBoardPopupVisible && (
            <AddProtoBoardFromDropdown scene={scene} onClose={() => setIsProtoBoardPopupVisible(false)} />
        )}
    </div>
  );
}