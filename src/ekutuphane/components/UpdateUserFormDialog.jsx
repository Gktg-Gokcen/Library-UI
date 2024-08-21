import axios from 'axios';
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
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

export default function UpdateUserFormDialog({ open, setOpen, user, setUser, fetchUsers }) {

    const handleClose = () => {
        setOpen(false)
    }

    const handleUpdateUser = async (user) => {
        try {
          await apiClient.put('/user?userId=' +user?.userId, user)
            .then(() => {
                setOpen(false);
                fetchUsers();
                toast.success(`${user.username} adlı kullanıcı bilgileri başarıyla güncellendi.`)
            })
        }
        catch (error) {
            console.error('API isteği sırasında hata oluştu:', error);
            toast.error("Güncelleme işleminde bir hata oluştu.")
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
                        required
                        margin="dense"
                        label="Kullanıcı Adı"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user?.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        required
                        multiline
                        margin="dense"
                        label="Kullanıcı Soyadı"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user?.userSurname}
                        onChange={(e) => setUser({ ...user, userSurname: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        required
                        multiline
                        margin="dense"
                        label="Email"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user?.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />                    
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleUpdateUser(user)}>
                        Güncelle
                    </Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
