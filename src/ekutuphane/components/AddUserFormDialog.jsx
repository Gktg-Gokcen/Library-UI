import axios from 'axios';
import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import apiClient from '../config/AxiosConfig';
import InputLabel from '@mui/material/InputLabel';

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
    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState('');



    const handleClose = () => {
        setOpen(false)
    }

    useEffect(() => {
        fetchRoles();
        console.log(user);
        
    }, [])



    const fetchRoles = async () => {
        try {
            const response = await apiClient.get('/role');
            setRoles(response?.data);
            console.log("role", response?.data);
        } catch (error) {
            console.error('API isteği sırasında bir hata oluştu:', error);
        }
    };

    const handleAddUser = async (user) => {
        await axios.post("http://localhost:8080/api/user", user)
            .then(() => {
                fetchUsers();
                handleClose();
                setUser({})
                handleAlert("success");
            })
            .catch(error => {
                console.error('Kullanıcı ekleme işlemi sırasında hata oluştu.', error);
                handleAlert("error");
            });
    }

    const handleChange = (event) => {
        setRole(event.target.value);
        setUser({ ...user, roleId: event.target.value })
        console.log("role", role);
        
      };

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
                        sx={{marginBottom: 2}}
                        variant="standard"
                        value={user?.email}
                        onChange={(e) => setUser({ ...user, email: e.target.value })}
                    />
                     <InputLabel id="demo-select-small-label">Role</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={role}
                        label="Role"
                        sx={{ minWidth: 250, marginTop: 2}}
                        onChange={handleChange}
                        
                    >
                        {roles?.map((role) =>
                        <MenuItem value={role?.id}>{role?.name}</MenuItem>
                        )}
                    </Select>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={() => handleAddUser(user)}>Ekle</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
