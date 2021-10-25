import { Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import Loading from '../../containers/Loading';
import axiosInstance from '../../utils/axios';
import { ImageResponse } from '../../utils/interfaces';

const ImageDetails = () => {
    const params: { id?: string | undefined } = useParams();
    const [photo, setPhoto] = useState<ImageResponse>();
    const [loading, setLoading] = useState<boolean>(false);

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

    return (
        <Box>
            <Loading open={loading} />
            <Typography variant='h5'>Image details {params.id}</Typography>
            {photo ? <img src={photo.src.large} alt={'test'} /> : null}
        </Box>
    );
};

export default ImageDetails;
