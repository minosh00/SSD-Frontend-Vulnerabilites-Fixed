import * as React from 'react';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';

// alertType can be -> error, warning, info, success

const DescriptionAlert = (props) => {
    return (
        <Stack sx={{ width: '100%' }} spacing={2}>
            <Alert severity={props.alertType}>{props.alertMessage}</Alert>
        </Stack>
    );
}

export default DescriptionAlert;