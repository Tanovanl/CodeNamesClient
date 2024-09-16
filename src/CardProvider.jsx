import React, { createContext, useState } from 'react';

export const CardContext = createContext();

export const CardProvider = ({ children }) => {
    const [cardName, setCardName] = useState('');

    return (
        <CardContext.Provider value={{ cardName, setCardName }}>
            {children}
        </CardContext.Provider>
    );
};