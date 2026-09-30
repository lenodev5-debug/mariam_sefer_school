import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { trackVisit } from '../../lib/service/visiterSerivce';

export default function useTrackVisit() {
    const location = useLocation();

    useEffect(() => {
        // Fire once per route change (deduped on the server for 30 min)
        trackVisit(location.pathname);
    }, [location.pathname]);
}