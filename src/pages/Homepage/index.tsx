import { useEffect, useState } from 'react';
import { Typography, Box } from '@mui/material';
import { FixedSizeGrid as Grid } from 'react-window';

import AutoSizer from 'react-virtualized-auto-sizer';

import { addImage, resetState } from '../../redux/images';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

// @ts-ignore
const Row = ({ columnIndex, rowIndex, style }) => {
    const { results } = useAppSelector((state) => state.images);
    const index = 3 * rowIndex + columnIndex;
    const photo = results[index];
    if (!photo) return null;
    return (
        <div style={style}>
            <Box sx={{ m: 2 }}>
                <img src={photo.src.tiny} alt={'test'} key={index} />
            </Box>
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

        return () => {
            evtSource.close();
            dispatch(resetState());
        };
    }, []);

    return (
        <div className='App'>
            <Typography variant='h2' sx={{ textAlign: 'center' }}>
                {SSEConnected ? "Aaaaannnnnd we're live!!!" : 'Connecting to the live stream...'}
            </Typography>

            <Box sx={{ p: 4, height: '80vh', width: '936px', margin: '0 auto' }}>
                <AutoSizer>
                    {({ height, width }: { height: number; width: number }) => (
                        <Grid
                            columnCount={3}
                            columnWidth={280 + 32}
                            height={height}
                            rowCount={Math.ceil(results.length / 3)}
                            rowHeight={200 + 32}
                            width={width}
                        >
                            {Row}
                        </Grid>
                    )}
                </AutoSizer>
            </Box>
        </div>
    );
};

export default Homepage;
