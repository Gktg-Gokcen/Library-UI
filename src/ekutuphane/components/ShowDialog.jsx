import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function ShowDialog({ open, handleClose, book }) {


    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
                <div>
                    <Box
                        component="img"
                        alt={book?.bookName}
                        src={book?.imageUrl}
                        sx={{
                            top: 0,
                            width: 1,
                            height: '400px',                            
                            objectFit: 'content',                           
                            
                        }}
                    />
                </div>
                <IconButton
                    aria-label="close"
                    onClick={handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom sx={{textAlign: 'center', fontWeight: 'bold'}}>
                        {book?.bookName}
                    </Typography>
                    <Typography gutterBottom>
                    {book?.summary}                         
                    </Typography>
                        {book?.summary}
                    <Typography gutterBottom sx={{textAlign: 'right', fontFamily: 'serif' }}>
                        {book?.author}
                    </Typography>
                </DialogContent>
                {/* <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Save changes
                    </Button>
                </DialogActions> */}
            </BootstrapDialog>
        </React.Fragment>
    );
}
