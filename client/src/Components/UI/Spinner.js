import Stack from '@mui/material/Stack';
import CircularProgress from '@mui/material/CircularProgress';

// color can be -> secondary, success, inherit
const Spinner = () => {
    return (
        <Stack sx={{ color: 'grey.500' }} spacing={2} direction="row">
            <CircularProgress color="secondary" />
        </Stack>
    );
}

export default Spinner;