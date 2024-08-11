import axios from 'axios';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function AddFormDialog({ open, setOpen, fetchBooks, handleGetBookAndUserCount }) {


    const [book, setBook] = useState({});

    const handleClose = () => {
        setOpen(false)
    }
    const handleAddBook = async (book) => {
        await axios.post('http://localhost:8080/api/book', book)
            .then(() => {
                fetchBooks();
                handleGetBookAndUserCount();
                handleClose();
            })
            .catch(error => {
                console.error('Kitap ekleme işlemi sırasında hata oluştu.', error);
            });
    }


    return (
        <React.Fragment>
            <Dialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={open}
            >
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
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Kitap Adı"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={book?.bookName}
                        onChange={(e) => setBook({ ...book, bookName: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        label="Kitap Konusu"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={book?.summary}
                        onChange={(e) => setBook({ ...book, summary: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        label="Kitabın Yazarı"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={book?.author}
                        onChange={(e) => setBook({ ...book, author: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        label="Kitabın adedi"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={book?.quantity}
                        onChange={(e) => setBook({ ...book, quantity: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        label="Kitabın resmi"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={book?.imageUrl}
                        onChange={(e) => setBook({ ...book, imageUrl: e.target.value })}
                    />

                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleAddBook(book)}>
                        Ekle
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
