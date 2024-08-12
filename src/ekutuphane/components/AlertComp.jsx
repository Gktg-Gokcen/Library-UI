import React from 'react'
import Alert from '@mui/material/Alert';
import Snackbar from '@mui/material/Snackbar';


export default function AlertComp({alert, alertopen, handleClose }) {
    console.log("alert", alert);    

    return (
        <Snackbar open={alertopen} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" severity={alert} onClose={handleClose}>
            {alert === "success" ? "İşlem başarılı." : "İşlem başarısız"}
        </Alert>
        </Snackbar>
    )
}
