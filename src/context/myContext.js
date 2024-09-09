"use client";
import { currentUser, logOut } from "@/services/userServices";
import { createContext, useState, useContext, useEffect } from "react";

const AppContext = createContext();

const ContextProvider = ( { children } ) => {
    const [user, setUser] = useState( "" );
    const [isAdmin, setAdmin] = useState( false );
    useEffect( () => {
        async function load () {
            const tempUser = await currentUser();
            console.log( `this is temp user `, tempUser );
            setUser( { ...tempUser } );
        }
        load();
    }, [] );

    //Debugging purpose 
    // useEffect( () => {
    //     if ( user )
    //     {
    //         console.log( `user is updated as ${ user?.email }` );
    //     }
    // }, [user] );

    return (
        <AppContext.Provider value={ { setUser, user } }>
            { children }
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext( AppContext );
};

export { ContextProvider, useAppContext };
// in the above i encounter an error which cant update the user the issue was that the 
//1. the useStart cant update the state immediately instead it schedule the update and rerender the components 
//2. the second cause is because of the use of use effect which is render on changes in any component so when the changes are rendered it rendered and cant captured the changed component and thus render the old value 