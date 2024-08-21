import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Label from 'src/components/label';
import ShowDialog from 'src/ekutuphane/components/ShowDialog';
import Iconify from 'src/components/iconify';
import Button from '@mui/material/Button';
import apiClient from 'src/ekutuphane/config/AxiosConfig';
import { toast } from 'sonner';

// ----------------------------------------------------------------------

export default function ShopProductCard({ book, handleGetBooks }) {
  const [open, setOpen] = useState(false);
  const activeUser = JSON.parse(localStorage.getItem("user"))?.user?.userId;

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const handleGiveBook = async () => {
    try {
      await apiClient.get(`/book/give-book?bookId=${book?.bookId}&userId=${activeUser}`)
        .then(() => {
          handleGetBooks();
          toast.success("Kitap alma işlemi başarılı.")
        })
    } catch {
      toast.error("Aynı kitaptan birden fazla alamazsınız.");
    }
  }

  const renderStatus = (
    <Label
      variant="filled"
      color={book?.status === 'AKTIF' ? 'success' : 'error'}
      sx={{
        zIndex: 9,
        top: 16,
        right: 16,
        position: 'absolute',
        textTransform: 'uppercase',
      }}
    >
      {book?.status}
    </Label>
  );

  const renderImg = (
    <Box
      component="img"
      alt={book?.bookName}
      src={book?.imageUrl}
      sx={{
        top: 0,
        width: 1,
        height: 1,
        objectFit: 'cover',
        position: 'absolute',
      }}
    />
  );

  const renderPrice = (
    <Typography variant="subtitle1">
      <Typography
        component="span"
        variant="body1"
        sx={{
          color: 'text.disabled',
          textDecoration: 'line-through',
        }}
      >
        {/* {book?.quantity && book?.quantity} */}
      </Typography>
      &nbsp;
      {book?.quantity}
    </Typography>
  );

  
  
  return (
    <>
      <Card >
        <div onClick={handleClickOpen}>
          <Box sx={{ pt: '100%', position: 'relative' }}>
            {book?.status && renderStatus}
            {renderImg}
          </Box>

          <Stack spacing={2} sx={{ p: 3 }}>
            <Link color="inherit" underline="hover" variant="subtitle2" noWrap>
              {book?.bookName}
            </Link>

            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Link sx={{
                color: 'text.disabled',
                textDecoration: 'none',
              }}> {book?.author}</Link>
              {renderPrice}
            </Stack>
          </Stack></div>
        <Stack>
          <Button onClick={handleGiveBook} variant="contained" color="success" startIcon={<Iconify icon="eva:plus-fill" />}>
            Kitabı al
          </Button>
        </Stack>

      </Card>
      {
        open === true && <ShowDialog open={open} handleClose={handleClose} book={book} />
      }
    </>
  );
}

ShopProductCard.propTypes = {
  book: PropTypes.object,
};
