import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import { Container, Box, Stack, Typography, Tab, Tabs, Toolbar, List, ListItem, Chip } from '@mui/material';
// components
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { getAllProducts } from '../service/api';
import Page from '../components/Page';
import { ProductSort, ProductList, ProductCartWidget, ProductFilterSidebar } from '../sections/@dashboard/products';
// mock
import PRODUCTS from '../_mock/products';

// ----------------------------------------------------------------------
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
// ----------------------------------------------------------------------

export default function EcommerceShop() {
	const theme = createTheme({
		components: {

		}
	});

  const [openFilter, setOpenFilter] = useState(false);
  const [value, setValue] = useState(0);

  const handleChange = async (event, newValue) => {
    setValue(newValue);

		let productCategory = null
		if (value === 0)
			productCategory = "men"
		else if (value === 1)
			productCategory = "kids"
		else if (value === 2)
			productCategory = "women"
		const res = await getAllProducts(productCategory);
		
		if (res) {
			console.log(res);
		}
  };

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleChipClick = (event) => {
		console.log(event.target);
  }

  const SubCategory = {
    men: ['Undershirt', 'Shirts', 'Pyjama', 'T-Shirts',
      'Boxers & Slips de bain', 'Shorts', 'Suits', 'Hoodies', 'Boxers',
      'Sweaters', 'Overcoats', 'Sweatshirts', 'Suit Jackets', 'JEANS',
      'Trousers'],
    women: ['T-shirts', 'Blouses & Chemises', 'Chemises', 'Denim & Jeans',
      'Hoodies', 'Blazers', 'Nightgown', 'Robes', 'Jackets',
      'Hoodies & Sweatshirts', 'Suits & Co-ords', 'Sweatershirts',
      'Shorts', 'TOPS', 'Sun Protective Outerwear', 'Tops', 'Leggings'],
    kids: ['Sandals', 'Robes', 'Pantalons & Jupes', 'Tops & T-shirt',
      'Pyjamas', 'Flats & Loafers', 'Tops', 'Slippers', 'Trainers',
      'Sneakers', 'Sweaters & Hoodies', 'Pulls & Sweat-shirts',
      'Trousses', 'Swimwear', 'Broches & Couvre-chefs', 'Accessoires'],
    shoes: ['Loafers', 'Sneakers & Baskets', 'Boots & Ankle Boots', 'Baskets',
      'Sandales', 'Ladies boots', 'Slippers', 'High heels', 'Slipper',
      'Town footwear', 'Footwear accessories', 'Flat & Loafers',
      'Sports shoes'],
  };

  return (
    <Page title="Dashboard: Products">
      <Container>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Trends
        </Typography>
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Women" {...a11yProps(0)} />
              <Tab label="Men" {...a11yProps(1)} />
              <Tab label="Kids" {...a11yProps(2)} />
            </Tabs>
          </Box>
          
          <TabPanel value={value} index={0}>
            <List sx={{ display: "flex", flexWrap: 'wrap' }}>
              {SubCategory.women.map((product) => (
                <ListItem sx={{
                  padding: "8px 16px 8px 0px",
                  flexFlow: "column wrap",
                  width: 'fit-content',
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
              {SubCategory.men.map((product) => (
                <ListItem sx={{
                  padding: "8px 16px 8px 0px",
                  flexFlow: "column wrap",
                  width: 'fit-content',
                }} key={product.id} item xs={12} sm={6} md={3}>
                  <Stack direction="row" spacing={0}>
                    <Chip onClick={handleChipClick} label={product} variant="outlined" />
                  </Stack>
                </ListItem>
              ))}
            </List>
          </TabPanel>
          
          <TabPanel value={value} index={2}>
            <List sx={{ display: "flex", flexWrap: 'wrap' }}>
              {SubCategory.kids.map((product) => (
                <ListItem sx={{
                  padding: "8px 16px 8px 0px",
                  flexFlow: "column wrap",
                  width: 'fit-content',
                }} key={product.id} item xs={12} sm={6} md={3}>
                  <Stack direction="row" spacing={1}>
                    <Chip onClick={handleChipClick} label={product} variant="outlined" />
                  </Stack>
                </ListItem>
              ))}
            </List>
          </TabPanel>
        </Box>
        
        <Stack direction="row" flexWrap="wrap-reverse" alignItems="center" justifyContent="flex-end" sx={{ mb: 5 }}>
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <ProductFilterSidebar
              isOpenFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
            />
            {/* <ProductSort /> */}
          </Stack>
        </Stack>

        <ProductList products={PRODUCTS} />
        {/* <ProductCartWidget /> */}
      </Container>
    </Page >
  );
}
