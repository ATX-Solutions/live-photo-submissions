import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import axiosInstance from '../../utils/axios';
import { ImageResponse } from '../../utils/interfaces';

const ImageDetails = () => {
    const params: { id?: string | undefined } = useParams();
    const [photo, setPhoto] = useState<ImageResponse>();

    useEffect(() => {
        if (params.id) {
            const fetchPhoto = async (id: string) => {
                try {
                    const response = await axiosInstance.get<ImageResponse>(`/${id}`);
                    setPhoto(response.data);
                } catch (e) {
                    console.log(e);
                }
            };

            fetchPhoto(params.id);
        }
    }, [params.id]);

    return (
        <Box>
            <Typography variant='h5'>Image details {params.id}</Typography>
            {photo ? <img src={photo.src.large} alt={'test'} /> : null}
        </Box>
    );
};

export default ImageDetails;
