import { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// material
import { Container, Box, Stack, Typography, Tab, Tabs, Toolbar, List, ListItem, Chip } from '@mui/material';
// components
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getAllProducts } from '../service/api';
// import PRODUCTS from '../_mock/products';
import Category from '../_mock/category';
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';

function TabPanel(props) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={value !== index}
			id={`simple-tabpanel-${index}`}
			aria-labelledby={`simple-tab-${index}`}
			{...other}
		>
			{value === index && (
				<Box sx={{ p: 3 }}>
				<Typography>{children}</Typography>
				</Box>
			)}
		</div>
		);
	}

TabPanel.propTypes = {
	children: PropTypes.node,
	index: PropTypes.number.isRequired,
	value: PropTypes.number.isRequired,
};

function a11yProps(index) {
	return {
		id: `simple-tab-${index}`,
		'aria-controls': `simple-tabpanel-${index}`,
	};
}
	

export default function EcommerceShop() {
	const theme = createTheme({
		components: {
		}
	});

	// Defining and Initializing the states for Pagination
	const [products, setProducts] = useState([]);
	const [loading, setLoading] = useState(false);
	const [currentPage, setCurrentPage] = useState(1);
	const [productsPerPage, setProductsPerPage] = useState(50);
	const [productCategory, setProductCategory] = useState('Women');

	const [openFilter, setOpenFilter] = useState(false);
	const [value, setValue] = useState(0);

	useEffect(() => {
		const fetchProducts = async () => {
			setLoading(true);
			const res = await getAllProducts(productCategory);
			if (res) {
				console.log(res);
				setProducts(res);
				setLoading(false);
			}
		}

		fetchProducts()
	}, [productCategory]);

	const indexOfLastProduct = currentPage * productsPerPage;
	const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
	const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

	const handleChange = async (event, newValue) => {
		setValue(newValue);
		setProductCategory(event.target.innerText);
	};

	const handleOpenFilter = () => {
		setOpenFilter(true);
	};

	const handleCloseFilter = () => {
		setOpenFilter(false);
	};
  const handleChipClick = () => {
  
  }

	return (
		<Page title="Dashboard: Products">
		<Container>
			<Typography variant="h4" sx={{ mb: 2 }}>
			Trends
			</Typography>
			<Box sx={{ width: '100%', }}>
			<Box sx={{ borderColor: 'divider', display: "flex", justifyContent: "space-between" }}>
				<Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
					<Tab label="Women" {...a11yProps(0)} />
					<Tab label="Men" {...a11yProps(1)} />
					<Tab label="Kids" {...a11yProps(2)} />
				</Tabs>
				{/* <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}> */}
				<Stack direction="row" flexShrink={0} sx={{ my: 1 }}>
				<ProductFilterSidebar
					isOpenFilter={openFilter}
					onOpenFilter={handleOpenFilter}
					onCloseFilter={handleCloseFilter}
				/>
				{/* <ProductSort /> */}
				</Stack>
				{/* </Stack> */}
			</Box>

			<TabPanel value={value} index={0}>
				<List sx={{ display: "flex", flexWrap: 'wrap' }}>
				{Category[0][1].map((product) => (
					<ListItem sx={{
					padding: "8px 16px 8px 0px",
					flexFlow: "column wrap",
					width: 'fit-content'
					}} key={product.id} item xs={12} sm={6} md={3}>
					<Stack direction="row" spacing={1}>
						<Chip 
							sx = {{
								'&:hover': {
									backgroundColor: '#D1D1D1'
								}
							}}
							onClick={handleChipClick} 
							label={product} 
							variant="outlined" />
					</Stack>
					</ListItem>
				))}
				</List>
			</TabPanel>

			<TabPanel sx={{ maxWidth: "70%" }} value={value} index={1}>
				<List sx={{ display: "flex", flexWrap: 'wrap' }}>
				{Category[1][1].map((product) => (
					<ListItem sx={{
					padding: "8px 16px 8px 0px",
					flexFlow: "column wrap",
					width: 'fit-content',
					}} key={product.id} item xs={12} sm={6} md={3}>
					<Stack direction="row" spacing={0}>
						<Chip 
							onClick={handleChipClick} 
							label={product} variant="outlined" />
					</Stack>
					</ListItem>
				))}
				</List>
			</TabPanel>

			<TabPanel value={value} index={2}>
				<List sx={{ display: "flex", flexWrap: 'wrap' }}>
				{Category[2][1].map((product) => (
					<ListItem sx={{
						padding: "8px 16px 8px 0px",
						flexFlow: "column wrap",
						width: 'fit-content',
					}} key={product.id} item xs={12} sm={6} md={3}>
					<Stack direction="row" spacing={1}>
						<Chip label={product} variant="outlined" />
					</Stack>
					</ListItem>
				))}
				</List>
			</TabPanel>
			</Box>
			<ProductList products={currentProducts} loading={loading} />
			{/* <ProductCartWidget /> */}
		</Container>
		</Page >
	);
}
