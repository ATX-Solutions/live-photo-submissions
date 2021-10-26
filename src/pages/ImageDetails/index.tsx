import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Box, Button, Typography, Skeleton } from '@mui/material';

import Loading from '../../containers/Loading';

import axiosInstance from '../../utils/axios';
import { ImageResponse } from '../../utils/interfaces';

import styles from './ImageDetails.module.scss';
import { mockFetch, Response } from '../../utils/dev';
import { useSnackbar } from 'notistack';
import APP_CONSTANTS from '../../utils/constants';

const ImageDetails = () => {
    const params: { id?: string | undefined } = useParams();
    const [photo, setPhoto] = useState<ImageResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [previewLoading, setPreviewLoading] = useState<boolean>(false);
    const [previewSize, setPreviewSize] = useState<number>();

    const { enqueueSnackbar } = useSnackbar();

    useEffect(() => {
        if (params.id) {
            const fetchPhoto = async (id: string) => {
                try {
                    const response = await axiosInstance.get<ImageResponse>(`/${id}`);
                    setPhoto(response.data);
                } catch (e) {
                    console.log(e);
                }
                setLoading(false);
            };

            setLoading(true);

            fetchPhoto(params.id);
        }
    }, [params.id]);

    const fetchPhotoThumbnail = async (size: number) => {
        setPreviewSize(size);
        setLoading(true);
        try {
            const mock: Response = {
                status: 200,
                data: {
                    ...photo,
                    src: {
                        ...photo?.src,
                        custom: `${photo?.src.original}?w=${size}`,
                    },
                } as ImageResponse,
            };
            const response = await mockFetch(true, mock);
            setPhoto(response.data);
            setPreviewLoading(true);
            navigator.clipboard.writeText(response.data.src.custom);
            enqueueSnackbar(APP_CONSTANTS.messages.copiedToClipboard, { variant: 'info' });
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    return (
        <Box className={styles.wrapper}>
            <Loading open={loading} />
            <Box className={styles.header}>
                <Button variant='contained'>Prev</Button>
                <Typography variant='h5'>Image details {params.id}</Typography>
                <Button variant='contained'>Next</Button>
            </Box>
            <Box className={styles.imageContainer}>
                {photo ? <img src={photo.src.medium} alt={photo.photographer} /> : null}
            </Box>
            <Box>
                <Typography variant='h5'>Get different sizes</Typography>
                <Box className={styles.actionsContainer}>
                    <Button variant='contained' onClick={() => fetchPhotoThumbnail(48)}>
                        48px
                    </Button>
                    <Button variant='contained' onClick={() => fetchPhotoThumbnail(400)}>
                        400px
                    </Button>
                    <Button variant='contained' onClick={() => fetchPhotoThumbnail(800)}>
                        800px
                    </Button>
                    <Button variant='contained' onClick={() => fetchPhotoThumbnail(1280)}>
                        1280px
                    </Button>
                </Box>
            </Box>
            {previewSize ? (
                <Box className={styles.previewContainer}>
                    {previewLoading ? (
                        <Skeleton
                            variant='rectangular'
                            width={previewSize}
                            height={previewSize}
                            sx={{ margin: '0 auto' }}
                        />
                    ) : null}
                    {loading ? null : (
                        <img
                            src={photo?.src?.custom}
                            alt={photo?.photographer || ''}
                            onLoad={() => setPreviewLoading(false)}
                        />
                    )}
                </Box>
            ) : null}
        </Box>
    );
};

export default ImageDetails;
