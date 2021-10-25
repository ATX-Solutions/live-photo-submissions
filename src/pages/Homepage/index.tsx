import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Box, Button } from '@mui/material';
import { useEffect, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Loading from '../../containers/Loading';

import APP_CONSTANTS from '../../utils/constants';
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
                <Link to={`/images/${photo.id}`}>
                    <img src={photo.src.tiny} alt={'test'} key={index} />
                </Link>
            </Box>
        </div>
    );
};

const initEventSource = (setSSEConnected: any, enqueueSnackbar: any, dispatch: any) => {
    const source = new EventSource(process.env.REACT_APP_EVENT_SOURCE_URL as string);

    source.onopen = function () {
        setSSEConnected(true);
        enqueueSnackbar(APP_CONSTANTS.messages.sseConnectSuccess, {
            variant: 'success',
        });
    };

    source.addEventListener('error', function (event: any) {
        if (event.readyState === EventSource.CLOSED) {
            setSSEConnected(false);
        }

        let error = { data: null, errors: { message: 'Oops! Something happened' } };
        try {
            error = JSON.parse(JSON.parse(event.data));
        } catch (e) {
            console.error(e);
        }

        enqueueSnackbar(error.errors.message, {
            variant: 'error',
        });
    });

    source.onmessage = function (event) {
        const photo = JSON.parse(JSON.parse(event.data));
        dispatch(addImage(photo));
    };

    return source;
};

const Homepage = () => {
    const dispatch = useAppDispatch();
    const { results } = useAppSelector((state) => state.images);
    const [SSEConnected, setSSEConnected] = useState(false);
    const [eventsSource, setEventsSource] = useState<EventSource | null>(null);

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        const source = initEventSource(setSSEConnected, enqueueSnackbar, dispatch);
        setEventsSource(source);
        return () => {
            source?.close();
            dispatch(resetState());
        };
    }, []);

    const toggleConnection = () => {
        if (eventsSource) {
            eventsSource.close();
            setEventsSource(null);
            enqueueSnackbar(APP_CONSTANTS.messages.sseConnectSuccess, {
                variant: 'success',
            });
            return;
        }
        const source = initEventSource(setSSEConnected, enqueueSnackbar, dispatch);
        setEventsSource(source);
    };

    return (
        <Box>
            <Loading open={!SSEConnected} />

            <Button variant='contained' onClick={toggleConnection} disabled={eventsSource?.readyState === 0}>
                {!!eventsSource ? 'Stop' : 'Start'} livestream
            </Button>

            <Box sx={{ height: '80vh', width: '936px', margin: '0 auto' }}>
                <AutoSizer>
                    {({ height, width }: { height: number; width: number }) => (
                        <Grid
                            columnCount={3}
                            columnWidth={280 + 32}
                            height={height}
                            rowCount={Math.ceil(results.length / 3) + 1}
                            rowHeight={200 + 32}
                            width={width}
                        >
                            {Row}
                        </Grid>
                    )}
                </AutoSizer>
            </Box>
        </Box>
    );
};

export default Homepage;
