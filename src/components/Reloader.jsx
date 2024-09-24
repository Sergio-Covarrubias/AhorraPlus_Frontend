import { useEffect } from 'react';
import { reloadServer } from '../api/reload';

function Reloader() {
    useEffect(() => {
        setInterval(async () => {
            const res = await reloadServer();
        }, 30 * 1000);
    }, []);

    return (<></>)
}

export default Reloader;
