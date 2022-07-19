import React from 'react';
import { UserContext } from "../services/auth";

export function UserNav() {

    const name = React.useContext(UserContext); 

    return <span className = "navbar-text" >
        { name }
        </span >

        



}
