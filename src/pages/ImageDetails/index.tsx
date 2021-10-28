import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router';
import { Box, Button, Typography, Skeleton, FormControlLabel, Switch } from '@mui/material';

import Loading from '../../containers/Loading';

import axiosInstance from '../../utils/axios';
import APP_CONSTANTS from '../../utils/constants';
import { mockFetch, Response } from '../../utils/dev';
import { ImageResponse } from '../../utils/interfaces';

import styles from './ImageDetails.module.scss';

const ImageDetails = () => {
    const history = useHistory();
    const { enqueueSnackbar } = useSnackbar();
    const params: { id?: string | undefined } = useParams();

    const [size, setSize] = useState<number>();
    const [photo, setPhoto] = useState<ImageResponse>();
    const [loading, setLoading] = useState<boolean>(false);
    const [previewLoading, setPreviewLoading] = useState<boolean>();
    const [openInNewTab, setOpenInNewTab] = useState<boolean>(false);

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
        return () => {
            setSize(undefined);
            setPreviewLoading(undefined);
        };
    }, [params.id]);

    const fetchPhotoThumbnail = async (size: number) => {
        setLoading(true);
        setSize(size);

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
            const response = await mockFetch(`/photos/${photo?.id}?w=${size}`, true, mock);
            setPhoto(response.data);

            try {
                await navigator.clipboard.writeText(response.data.src.custom);
            } catch (err) {
                console.error('copy clipboard error', err);
            }

            enqueueSnackbar(APP_CONSTANTS.messages.copiedToClipboard, { variant: 'info' });

            if (openInNewTab) {
                window.open(response.data.src.custom);
            } else {
                setPreviewLoading(true);
            }
        } catch (e) {
            console.error(e);
        }
        setLoading(false);
    };

    const fetchAnotherPhoto = (next = true) => {
        history.push(`/images/${next ? photo?.nextId : photo?.prevId}`);
    };

    return (
        <Box className={styles.wrapper}>
            <Loading open={loading} />
            <Box className={styles.header}>
                <Button variant='contained' onClick={() => fetchAnotherPhoto(false)} disabled={!photo?.prevId}>
                    Previous
                </Button>
                <Button variant='contained' onClick={() => fetchAnotherPhoto()} disabled={!photo?.nextId}>
                    Next
                </Button>
            </Box>
            <Box className={styles.container}>
                <Box className={styles.left}>
                    {photo ? (
                        <img src={photo.src.medium} alt={photo.photographer} />
                    ) : (
                        <Skeleton variant='rectangular' width={525} height={350} />
                    )}
                </Box>
                {photo ? (
                    <Box className={styles.right}>
                        <Typography variant='h5'>{photo.photographer}</Typography>
                        <Typography variant='body1'>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur quis sem at neque
                            condimentum tempus. Maecenas non ornare diam. Proin sollicitudin dapibus diam, id ultricies
                            dui vehicula vitae. Proin efficitur, ipsum eget interdum egestas, tortor quam commodo
                            lectus, et semper neque arcu at tellus. Integer malesuada velit vitae fermentum rhoncus.
                        </Typography>
                        <Box>
                            <FormControlLabel
                                control={<Switch checked={openInNewTab} />}
                                label='Open in new tab'
                                onChange={() => setOpenInNewTab(!openInNewTab)}
                            />
                            <Typography variant='body2'>
                                You can choose if you want the buttons below to open the image in a new tab or to load
                                it below. Some resolutions might now be loaded completely on your screen.
                            </Typography>
                        </Box>
                        <Box className={styles.buttons}>
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
                ) : null}
            </Box>
            {!openInNewTab && size ? (
                <Box className={styles.preview}>
                    {previewLoading ? (
                        <Skeleton className={styles.skeleton} variant='rectangular' width={size} height={size} />
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
