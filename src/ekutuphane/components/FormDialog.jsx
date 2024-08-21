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
import apiClient from '../config/AxiosConfig';
import { toast } from 'sonner';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function FormDialog({ open, setOpen, book, setUpdatedBook, fetchBooks }) {

    const handleClose = () => {
        setOpen(false)
    }

    const handleUpdateBook = async (book) => {
        try {
          await apiClient.put('/book?bookId=' + book?.bookId, book)
            .then(() => {
                setOpen(false);
                fetchBooks();
                toast.success(`${book?.bookName} adlı kitap başarıyla güncellendi.`)
            })
        }
        catch (error) {
            console.error('API isteği sırasında hata oluştu:', error);
            toast.error("Güncelleme işleminde hata oluştu.")
        }
      };

    return (
        <React.Fragment>
            <Dialog
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
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Kitap Adı"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={book?.bookName}
                        onChange={(e) => setUpdatedBook({ ...book, bookName: e.target.value })}
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
                        onChange={(e) => setUpdatedBook({ ...book, summary: e.target.value })}
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
                        onChange={(e) => setUpdatedBook({ ...book, quantity: e.target.value })}
                    />
                    <Typography gutterBottom sx={{ textAlign: 'right', fontFamily: 'serif' }}>
                        {book?.author}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleUpdateBook(book)}>
                        Güncelle
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
