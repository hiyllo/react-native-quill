import React from 'react';
import { View } from 'react-native';
export const CustomContainer = ({ children, style }) => {
    return (React.createElement(View, { style: [style], onTouchStart: (e) => e.stopPropagation() }, children));
};
