import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FrameInfiniteGrid } from '@egjs/react-infinitegrid';

import { MOCK_PHOTOS } from '../../utils/mockData';
import { ImageResponse } from '../../utils/interfaces';

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
    const [items, setItems] = useState(getItems(0, 10));

    return (
        <FrameInfiniteGrid
            className='container'
            gap={5}
            frame={[
                [1, 1, 2, 2, 3],
                [1, 1, 4, 5, 5],
            ]}
            onRequestAppend={(e) => {
                const nextGroupKey = (+e.groupKey! || 0) + 1;

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
    );
};

export default Archive;
