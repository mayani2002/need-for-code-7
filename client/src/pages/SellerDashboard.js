import { useState } from 'react'
import PropTypes from 'prop-types';
// material
import { Button, Container, Box, Stack, Typography, Tab, Tabs, Toolbar, List, ListItem, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
// components
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';




export default function SellerShop() {

    const navigate = useNavigate();

    const navigateTo = (location) => {
        navigate(location);
    };
    const [openFilter, setOpenFilter] = useState(false);

    const handleOpenFilter = () => {
        setOpenFilter(true);
    };

    const handleCloseFilter = () => {
        setOpenFilter(false);
    };


    return (
        <Page title="Dashboard: Products" >
            <Container>
                <Typography variant="h4" sx={{ mb: 2 }}>
                    Your Products
                </Typography>
                <Box sx={{ borderColor: 'divider', display: "flex", justifyContent: "space-between" }}>

                    <Button onClick={() => navigateTo("./createProductPost")} sx={{ height: "2rem" }} variant="contained" href="#contained-buttons">
                        Upload
                    </Button>
                    <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
                        <Stack direction="row" flexShrink={0} sx={{ my: 1 }}>
                            <ProductFilterSidebar
                                isOpenFilter={openFilter}
                                onOpenFilter={handleOpenFilter}
                                onCloseFilter={handleCloseFilter}
                            />
                        </Stack>
                    </Stack>
                </Box>

                <ProductList products={PRODUCTS} />

            </Container>
        </Page >
    )
}