"use client";
import { currentUser } from "@/services/userServices";
import { createContext, useState, useContext, useEffect } from "react";
const AppContext = createContext();
const ContextProvider = ( { children } ) =>
{
    const [ user, setUser ] = useState( null );
    const [ isAuthenticated, setIsAuthenticated ] = useState( false );
    const [ Admin, setAdmin ] = useState( false );
    async function getUser ()
    {
        const { data, success } = await currentUser();
        if ( success )
        {
            setUser( data );
            setIsAuthenticated( true );
            if ( data.isAdmin )
            {
                setAdmin( true );
            }
        }
    }
    useEffect( () =>
    {
        getUser();
    }, [] );


    return (
        <AppContext.Provider value={ { user, setUser, isAuthenticated, Admin } }>
            { children }
        </AppContext.Provider>
    );
};

const useAppContext = () =>
{
    return useContext( AppContext );
};

export { ContextProvider, useAppContext };
