import { Backdrop, CircularProgress } from '@mui/material';

const Loading = ({ open, onClick }: { open: boolean; onClick?: () => {} }) => {
    return (
        <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={open} onClick={onClick}>
            <CircularProgress color='inherit' />
        </Backdrop>
    );
};

export default Loading;
