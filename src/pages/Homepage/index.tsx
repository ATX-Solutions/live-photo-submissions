import { Link } from 'react-router-dom';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Box, Button, Typography } from '@mui/material';
import { JustifiedInfiniteGrid } from '@egjs/react-infinitegrid';

import Loading from '../../containers/Loading';

import APP_CONSTANTS from '../../utils/constants';
import { addImage, resetState } from '../../redux/images';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import styles from './Homepage.module.scss';

const initEventSource = (setSSEConnected: any, enqueueSnackbar: any, dispatch: any): EventSource => {
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
    const { enqueueSnackbar } = useSnackbar();
    const { results } = useAppSelector((state) => state.images);

    const [SSEConnected, setSSEConnected] = useState<boolean>(false);
    const [eventsSource, setEventsSource] = useState<EventSource>();

    useEffect(() => {
        const source = initEventSource(setSSEConnected, enqueueSnackbar, dispatch);
        setEventsSource(source);
        return () => {
            dispatch(resetState());
        };
    }, []);

    useEffect(() => {
        return () => {
            eventsSource?.close();
        };
    }, [eventsSource]);

    const toggleConnection = () => {
        if (eventsSource) {
            eventsSource.close();
            setEventsSource(undefined);
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

            <JustifiedInfiniteGrid className={styles.photos} align='justify' gap={5}>
                {results.map((photo, index) => {
                    return (
                        <div className={styles.item} data-grid-groupkey={photo.groupKey} key={index}>
                            <div className={styles.thumbnail}>
                                <Link to={`/images/${photo.id}`}>
                                    <img src={photo.src.tiny} alt={photo.photographer} />
                                </Link>
                            </div>
                        </div>
                    );
                })}
            </JustifiedInfiniteGrid>
        </Box>
    );
};

export default Homepage;
