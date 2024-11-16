import React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { yellow } from '@mui/material/colors';
import StarIcon from '@mui/icons-material/Star';

const StyledCard = styled(Card)(({ theme }) => ({
  maxWidth: 345,
  boxShadow: theme.shadows[3],
  transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
  '&:hover': {
    boxShadow: theme.shadows[6],
  },
  borderRadius: 8,  // Added rounded corners for a better look
}));

const CommonCard = ({ name, price, imageUrl, brand, discount, onAddToCart,discountPrice }) => {
  const randomRating = (Math.random() * (5 - 1) + 1).toFixed(1);


  return (
    <StyledCard>
      <CardMedia
        component="img"
        image={imageUrl}
        alt={name}
        sx={{
          width: '300px', 
          height:'300px', 
          objectFit: 'cover', 
        }}
      />
      
      {/* Product Info */}
      <CardContent sx={{ paddingBottom: '16px' }}>
        <Typography variant="body1" sx={{ fontWeight: 'bold', marginBottom: 1 }}>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 1 }}>
          Brand: {brand}
        </Typography>

        {/* Price Section */}
        <div style={{ marginBottom: 8 }}>
          {/* Display original price and discounted price */}
          {discount > 0 ? (
            <>
              <Typography variant="body2" color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                ₹{price}
              </Typography>
              <Typography variant="h6" sx={{ marginTop: 1 }}>
                ₹{discountPrice.toFixed(2)}
              </Typography>
            </>
          ) : (
            <Typography variant="h6" sx={{ marginTop: 1 }}>
              ₹{price}
            </Typography>
          )}

          {/* Optional 'No longer available' text */}
          {discount === 0 && (
            <Typography variant="body2" color="text.secondary" sx={{ marginTop: 1 }}>
              No longer available
            </Typography>
          )}
        </div>

        <Typography variant="body2" color="text.secondary" sx={{ marginBottom: 2 }}>
          Discount: {discount}%
        </Typography>

        {/* Rating Section */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary" sx={{ marginRight: 1 }}>
            Rating:
          </Typography>
          {[...Array(5)].map((_, index) => (
            <StarIcon
              key={index}
              fontSize="small"
              sx={{
                color: index + 1 <= Math.round(randomRating) ? yellow[700] : yellow[300],
              }}
            />
          ))}
          <Typography variant="body2" sx={{ marginLeft: 1 }}>
            {randomRating}
          </Typography>
        </div>
      </CardContent>

      {/* Card Actions (Buttons) */}
      <CardActions sx={{ justifyContent: 'center', padding: '0 16px 16px' ,width:'100%' }}>
        <Button 
          variant="contained" 
           
          size="full" 
          sx={{ borderRadius: 2,bgcolor:'#080880', width:'100%' }}
          onClick={onAddToCart} // Trigger the passed function when clicked
        >
          Add to Cart
        </Button>
      </CardActions>
    </StyledCard>
  );
};

export default CommonCard;
