import { useEffect, useState } from 'react';
import { DateTime } from 'luxon';
import { DatePicker } from '@mui/lab';
import { Link } from 'react-router-dom';
import { Box, TextField, Typography } from '@mui/material';
import { FrameInfiniteGrid } from '@egjs/react-infinitegrid';

import { MOCK_PHOTOS } from '../../utils/mockData';
import { ImageResponse } from '../../utils/interfaces';

import styles from './Archive.module.scss';

function getItems(nextGroupKey: number, count: number) {
    const nextKey = nextGroupKey * count;
    const slice = MOCK_PHOTOS.slice(nextKey, nextKey + count);

    return slice.map((photo) => ({ ...photo, groupKey: nextGroupKey }));
}

const Item = ({ photo }: { photo: ImageResponse }) => (
    <div className='item'>
        <Link to={`/images/${photo.id}`}>
            <img
                src={photo.src.tiny}
                alt={photo.photographer}
                style={{
                    width: '100%',
                    height: '100%',
                }}
            />
        </Link>
    </div>
);

const Archive = () => {
    const [value, setValue] = useState<DateTime | null>();
    const [items, setItems] = useState<ImageResponse[]>([]);

    useEffect(() => {
        setValue(DateTime.now());
    }, []);

    // totally mocked
    // real life example: fetch images. save in store, while scrolling, make another API call.
    useEffect(() => {
        if (value) {
            setItems([]);
        }
    }, [value]);

    return (
        <Box className={styles.wrapper}>
            <Box className={styles.header}>
                <Typography variant='body1'>Here you can see all images uploaded in a certain date.</Typography>
                <DatePicker
                    value={value}
                    inputFormat='dd/MM/yyyy'
                    disableFuture
                    label='Filter by date'
                    onChange={(newValue) => {
                        setValue(newValue);
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
            </Box>
            <FrameInfiniteGrid
                className='container'
                gap={5}
                frame={[
                    [1, 1, 2, 2, 3],
                    [1, 1, 4, 5, 5],
                ]}
                onRequestAppend={(e) => {
                    const nextGroupKey = (+e.groupKey! || 0) + 1;

                    // not enough mocks.
                    if (nextGroupKey > 7) {
                        return;
                    }

                    setItems([...items, ...getItems(nextGroupKey, 10)]);
                }}
            >
                {items.map((item, index) => (
                    <Item data-grid-groupkey={item.groupKey} key={index} photo={item} />
                ))}
            </FrameInfiniteGrid>
        </Box>
    );
};

export default Archive;
