import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import MyBooksProductCart from '../../sections/products/my-books-product-cart'
import ProductSort from '../../sections/products/product-sort';
import ProductFilters from '../../sections/products/product-filters';
import ProductCartWidget from '../../sections/products/product-cart-widget';
import apiClient from '../config/AxiosConfig';

export default function MyBooks() {
    const [openFilter, setOpenFilter] = useState(false);
    const [books, setBooks] = useState([]);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };

    useEffect(() => {
        handleGetBooks();
    }, [])

    const handleGetBooks = async () => {
        try {
            const ActiveUserId = JSON.parse(localStorage.getItem("user"))?.user?.userId;
            const response = await apiClient.get('/book/get-books-by-user?userId=' + ActiveUserId);
            
            setBooks(response?.data);
        } catch (error) {
            console.error('API isteği sırasında bir hata oluştu:', error);
        }
    };
    return (
        <Container>
            <Stack
                direction="row"
                alignItems="center"
                flexWrap="wrap-reverse"
                justifyContent="flex-end"
                sx={{ mb: 5 }}
            >
                <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
                    <ProductFilters
                        openFilter={openFilter}
                        onOpenFilter={handleOpenFilter}
                        onCloseFilter={handleCloseFilter}
                    />

                    <ProductSort />
                </Stack>
            </Stack>

            <Grid container spacing={3}>
                {books.map((book) => (
                    <Grid key={book.bookId} xs={12} sm={6} md={3}>
                        <MyBooksProductCart book={book} handleGetBooks={handleGetBooks}/>
                    </Grid>
                ))}
            </Grid>

            <ProductCartWidget />

        </Container>
    );

}

