import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { FixedSizeList as List } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import { addImage } from '../../redux/images';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

// @ts-ignore
const Row = ({ index, style }) => {
    const { results } = useAppSelector((state) => state.images);
    const photo = results[index];
    return (
        <div style={style}>
            <img src={photo.src.tiny} alt={'test'} key={index} />
        </div>
    );
};

const Homepage = () => {
    const dispatch = useAppDispatch();
    const { results } = useAppSelector((state) => state.images);
    const [SSEConnected, setSSEConnected] = useState(false);

    useEffect(() => {
        const evtSource = new EventSource('https://photos-sse.herokuapp.com/sse.php');

        evtSource.onmessage = function (event) {
            if (!SSEConnected) {
                setSSEConnected(true);
            }
            const photo = JSON.parse(JSON.parse(event.data));
            console.log(photo);
            dispatch(addImage(photo));
        };
    }, []);

    return (
        <div className='App'>
            <Typography variant='h2' sx={{ textAlign: 'center' }}>
                {SSEConnected ? "Aaaaannnnnd we're live!!!" : 'Connecting to the live stream...'}
            </Typography>

            <Box sx={{ p: 4, height: '80vh' }}>
                <AutoSizer>
                    {({ height, width }: { height: number; width: number }) => (
                        <List height={height} itemCount={results.length} itemSize={200} width={width}>
                            {Row}
                        </List>
                    )}
                </AutoSizer>
            </Box>
        </div>
    );
};

export default Homepage;
