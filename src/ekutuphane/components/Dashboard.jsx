import axios from 'axios';
import React, { useState, useEffect } from 'react';

import Paper from '@mui/material/Paper';
import Container from '@mui/material/Container';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import Typography from '@mui/material/Typography';
import TableContainer from '@mui/material/TableContainer';
import Grid from '@mui/material/Unstable_Grid2';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import Iconify from 'src/components/iconify';
import Alert from '@mui/material/Alert';


import AppWidgetSummary from 'src/sections/overview/app-widget-summary';
import FormDialog from './FormDialog';
import AddFormDialog from './AddFormDialog';

export default function Dashboard() {

  const [books, setBooks] = useState([]);
  const [bookcount, setBookcount] = useState([]);
  const [usercount, setUsercount] = useState([]);
  const [open, setOpen] = useState(false);
  const [addFormDialog, setAddFormDialog] = useState(false);
  const [updatedBook, setUpdatedBook] = useState({});
  const [alert, setAlert] = useState("")

  useEffect(() => {
    fetchBooks();
    handleGetBookAndUserCount();
  }, []);

  const handleGetBookAndUserCount = async () => {
    await axios.get('http://localhost:8080/api/book/count').then(response => { setBookcount(response?.data) })
    await axios.get('http://localhost:8080/api/user/count').then(response => { setUsercount(response?.data) })
  }

  const fetchBooks = async () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    console.log("token=", token)
    await axios.get('http://localhost:8080/api/book/GetAll', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then(response => {
        setBooks(response.data);
      })
      .catch(error => {
        console.error('API isteği sırasında hata oluştu:', error);
      });
  }

  const handleUpdateForm = (book) => {
    console.log('ssss')
    setOpen(true);
    setUpdatedBook(book);
  }

  const handleDeleteBook = async (book) => {
    console.log("girdin mi dayi ?");

    await axios.delete('http://localhost:8080/api/book?bookId=' + book?.bookId)
      .then(() => {
        fetchBooks();
        handleGetBookAndUserCount();
        handleAlert("success")
      })
      .catch(error => {
        console.error('Kitap silme işlemi sırasında hata oluştu.', error);
        handleAlert("error");
      });

  }

  const handleAlert = (message) => {
    if (message === "error") {
      setAlert("error")
    } else if (message === "success") {
      setAlert("success")
    }
  }


  const handleAddFormDialog = () => {
    setAddFormDialog(true);
  }

  return (
    <>
      <Container maxWidth="xl">
        <Typography variant="h4" sx={{ mb: 5 }}>
          Hi, Welcome back 👋
        </Typography>

        <Grid container spacing={3}>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Toplam Kitap Sayısı"
              total={Number(bookcount)}
              color="success"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_bag.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Toplam Kullanıcı Sayısı"
              total={Number(usercount)}
              color="info"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_users.png" />}
            />
          </Grid>

          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="Verilen Kitap Sayısı"
              total={1723315}
              color="warning"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_buy.png" />}
            />
          </Grid>
          <Grid xs={12} sm={6} md={3}>
            <AppWidgetSummary
              title="İade Edilmesi Gereken Kitap Sayısı"
              total={234}
              color="error"
              icon={<img alt="icon" src="/assets/icons/glass/ic_glass_message.png" />} />
          </Grid>
          <TableContainer component={Paper} sx={{ mt: 5 }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Adı</TableCell>
                  <TableCell>Özet</TableCell>
                  <TableCell>Yazar</TableCell>
                  <TableCell>Stok Sayısı</TableCell>
                  <TableCell sx={{ display: 'flex', justifyContent: 'center', gap: '30px' }}>
                    <Button variant="contained" color="inherit" startIcon={<Iconify icon="eva:plus-fill" />} onClick={handleAddFormDialog} >
                      Kitap Ekle
                    </Button>
                  </TableCell>
                  <TableCell></TableCell>


                </TableRow>
              </TableHead>
              <TableBody>
                {books?.map((book) => (
                  <TableRow key={book?.bookId}>
                    <TableCell>{book?.bookName}</TableCell>
                    <TableCell>{book?.summary}</TableCell>
                    <TableCell>{book?.author}</TableCell>
                    <TableCell>{book?.quantity}</TableCell>
                    <TableCell>
                      <EditIcon sx={{ marginRight: '30px' }} onClick={() => handleUpdateForm(book)} />
                      <DeleteIcon onClick={() => handleDeleteBook(book)} />
                    </TableCell>

                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Container>
      {
        open === true && <FormDialog open={open} setOpen={setOpen} book={updatedBook} setUpdatedBook={setUpdatedBook} fetchBooks={fetchBooks} />
      }
      {
        addFormDialog === true && <AddFormDialog open={addFormDialog} setOpen={setAddFormDialog} fetchBooks={fetchBooks} handleGetBookAndUserCount={handleGetBookAndUserCount} />
      }
      {      
        alert === "succes" ? <Alert severity="success"> İşlem başarılı .</Alert> : <Alert severity="error"> İşlem başarısız .</Alert> 
      }      
    </>
  );
}
