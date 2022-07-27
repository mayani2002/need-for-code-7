import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { Container, Box, Stack, Typography, Button, Tab, Tabs, Card, List, ListItem, Chip, CardMedia, CardContent, CardActions } from '@mui/material';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';
import Category from '../_mock/category';

export default function ProductDescription(product) {


    return (
        <Page title="Dashboard: ProductDescription">
            <Container sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4rem" }}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            weidth="340"
                            image="/static/images/cards/contemplative-reptile.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {product.name}
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small">Share</Button>
                            <Button size="small">Learn More</Button>
                        </CardActions>
                    </Card>
                </Box>
                <ProductList products={PRODUCTS} />
                {/* <ProductCartWidget /> */}
            </Container>
        </Page >
    );
}
