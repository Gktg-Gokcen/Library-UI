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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

export default function AddUserFormDialog({ open, setOpen, fetchUsers, handleAlert }) {


    const [user, setUser] = useState({});

    const handleClose = () => {
        setOpen(false)
    }


    const handleAddUser = async(user) => {
        await axios.post("http://localhost:8080/api/user", user)
          .then(() => {
            fetchUsers();
            handleClose(); 
            setUser({})
            handleAlert("success");
          })
          .catch(error => {
            console.error('Kitap ekleme işlemi sırasında hata oluştu.', error);
            handleAlert("error");
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
                        label="Adı"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user?.username}
                        onChange={(e) => setUser({ ...user, username: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        label="Soyad"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user?.userSurname}
                        onChange={(e) => setUser({ ...user, userSurname: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        label="Parola"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user?.userPassword}
                        onChange={(e) => setUser({ ...user, userPassword: e.target.value })}
                    />
                    <TextField
                        autoFocus
                        multiline
                        margin="dense"
                        label="Mail"
                        type="text"
                        fullWidth
                        variant="standard"
                        value={user?.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() =>handleAddUser(user)}>Ekle</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
