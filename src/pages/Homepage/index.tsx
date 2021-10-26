import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { FixedSizeGrid as Grid } from 'react-window';
import AutoSizer from 'react-virtualized-auto-sizer';

import Loading from '../../containers/Loading';

import APP_CONSTANTS from '../../utils/constants';
import { addImage, resetState } from '../../redux/images';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import styles from './Homepage.module.scss';

// @ts-ignore
const Row = ({ columnIndex, rowIndex, style, data }) => {
    const { results, columnCount } = data;

    const index = columnIndex + rowIndex * columnCount;
    const photo = results[index];

    if (!photo) return null;

    return (
        <div style={style}>
            <Box sx={{ m: 2 }}>
                <Link to={`/images/${photo.id}`}>
                    <img src={photo.src.tiny} alt={photo.photographer} key={index} />
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
            enqueueSnackbar(APP_CONSTANTS.messages.sseDisconnect, {
                variant: 'info',
            });
            return;
        }
        const source = initEventSource(setSSEConnected, enqueueSnackbar, dispatch);
        setEventsSource(source);
    };

    return (
        <Box className={styles.container}>
            <Loading open={!SSEConnected} />

            <Box className={styles.header}>
                <Typography variant='body1'>Once a photo gets uploaded, you will see it below.</Typography>
                <Button variant='contained' onClick={toggleConnection} disabled={eventsSource?.readyState === 0}>
                    {!!eventsSource ? 'Stop' : 'Start'} livestream
                </Button>
            </Box>

            <Box className={styles.photos}>
                <AutoSizer>
                    {({ height, width }: { height: number; width: number }) => {
                        const photoWidth = 280 + 32;
                        const photoHeight = 200 + 32;
                        const columnCount = Math.floor(width / photoWidth);
                        const rowCount = Math.ceil(results.length / columnCount);
                        return (
                            <Grid
                                columnCount={columnCount}
                                columnWidth={photoWidth}
                                rowHeight={photoHeight}
                                rowCount={rowCount}
                                width={width}
                                height={height}
                                itemData={{ results, columnCount }}
                            >
                                {Row}
                            </Grid>
                        );
                    }}
                </AutoSizer>
            </Box>
        </Box>
    );
};

export default Homepage;
