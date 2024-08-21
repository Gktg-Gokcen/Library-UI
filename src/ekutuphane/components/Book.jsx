import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from '../../sections/products/product-card'
import ProductSort from '../../sections/products/product-sort';
import ProductFilters from '../../sections/products/product-filters';
import ProductCartWidget from '../../sections/products/product-cart-widget';
import apiClient from '../config/AxiosConfig';

export default function Book() {
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
            const response = await apiClient.get('/book/getall');
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
                sx={{ mb: 5}}
            >
            </Stack>
            <Grid container spacing={3}>
                {books.map((book) => (
                    <Grid key={book.bookId} xs={12} sm={6} md={3}>
                        <ProductCard book={book} handleGetBooks={handleGetBooks}/>
                    </Grid>
                ))}
            </Grid>
            <ProductCartWidget />
        </Container>
    );

}

