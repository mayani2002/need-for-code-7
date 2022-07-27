import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { Link as RouterLink } from 'react-router-dom';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { fCurrency } from '../../../utils/formatNumber';
// components
import Label from '../../../components/Label';
import { ColorPreview } from '../../../components/color-utils';

// ----------------------------------------------------------------------

const ProductImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
  product: PropTypes.object,
};

export default function ShopProductCard({ product }) {
  const { 
          brand, brandUrl, category, codCountry, currency,
          currentPrice, discount, id, imageUrl, isNew, likesCount, model, 
          name, rawPrice, subcategoy, url, variation0Color, variation0Image, 
          variation0Thumbnail, variation1Color, variation1Image, variation1Thumbnail
        } = product;
  

        const navigate = useNavigate();

        const navigateTo = (location) => {
            navigate(location);
        };
        const handleClick = ()=>{
          console.log(product);
          navigateTo("/productDescription")
        }
    
  return (
    <Card onClick={handleClick}>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {isNew && (
          <Label
            variant="filled"
            color={'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            'NEW'
          </Label>
        )}
        <img style={{ 
          top: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          position: 'absolute',
        }} alt={name} src={product.image_url} />
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to="#" color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            {/* <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              {priceSale && fCurrency(priceSale)}
            </Typography>
            &nbsp; */}
            {fCurrency(product.current_price)}
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
