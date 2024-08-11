import axios from 'axios';

import React, { useState, useEffect } from 'react';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Unstable_Grid2';
import ProductCard from '../../sections/products/product-card'
import ProductSort from '../../sections/products/product-sort';
import ProductFilters from '../../sections/products/product-filters';
import ProductCartWidget from '../../sections/products/product-cart-widget';




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
        const user = JSON.parse(localStorage.getItem('user'));
        const token = user ? user.token : null;
        await axios.get('http://localhost:8080/api/book/GetAll', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then(response => {
            console.log("response", response)
            setBooks(response?.data);
        })
    }
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
                        <ProductCard book={book} />
                    </Grid>
                ))}
            </Grid>

            <ProductCartWidget />

        </Container>
    );

}

