import { Container, Box, Stack, Typography, Button, Tab, Tabs, Card, List, ListItem, Chip, CardMedia, CardContent, CardActions } from '@mui/material';
import { useLocation } from "react-router-dom";
import { fCurrency } from '../utils/formatNumber';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
import PRODUCTS from '../_mock/products';
import Category from '../_mock/category';
import Page from '../components/Page';

export default function ProductDescription() {
    const { productDetails } = useLocation();
    const { productName, productImageUrl, productCurrentPrice } = productDetails;
    console.log(productDetails);
    return (
        <Page title="Dashboard: ProductDescription">
            <Container sx={{ width: "100%" }}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", marginBottom: "4rem" }}>
                    <Card sx={{ maxWidth: 345 }}>
                        <CardMedia
                            component="img"
                            height="140"
                            weidth="340"
                            image={productImageUrl}
                            alt="green iguana"
                        />
                        <CardContent>
                            <Typography gutterBottom variant="h5" component="div">
                                {productName}
                            </Typography>
                        </CardContent>
                        <CardActions>
                        <Typography variant="subtitle1">
                            {fCurrency(productCurrentPrice)}
                        </Typography>
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
