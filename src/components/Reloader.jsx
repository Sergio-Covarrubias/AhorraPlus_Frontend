import { useEffect } from 'react';
import { reloadFrontend, reloadServer } from '../api/reload'

function Reloader() {
    useEffect(() => {
        setInterval(async () => {
            const res = await reloadServer();
            console.log(res);
        }, 30 * 1000);

        setInterval(async () => {
            const res = await reloadFrontend();
            console.log(res);
        }, 30 * 1000);
    }, []);

    return (<></>)
}

export default Reloader;
