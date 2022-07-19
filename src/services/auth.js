import React from 'react';

export const UserContext = React.createContext({
    name: 'Invité',
});


export function getUser(){
    return "Invité"
}