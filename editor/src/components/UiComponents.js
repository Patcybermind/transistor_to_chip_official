"use client"
import React, { useState, useEffect } from 'react';
import '../app/globals.css';

export function PopupComponent({ children }) {
    return (
        <div className="popup-overlay">
            <div className="popup-content">
                {children}
            </div>
        </div>
    );
}