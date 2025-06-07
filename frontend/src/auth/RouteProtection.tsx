import { useState, useEffect, } from 'react';
import supabase from './supabaseClient';
import { Navigate } from 'react-router';

import type { ReactNode } from 'react';

const RouteProtection = ({ children }: { children: ReactNode }) => {

    const [authenticated, setAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);

    const getSession = async () => {
        const { data: { session } } = await supabase.auth.getSession();
        setAuthenticated(!!session);
        setLoading(false); 
    }

    useEffect( () => {
        getSession();
    },[])

    if (loading) {
        return <div>Checking ...</div>
    } else {
        if (authenticated) {
            return <>{children}</>
        }
        return <Navigate to={"/login"} />
    }
}

export default RouteProtection;