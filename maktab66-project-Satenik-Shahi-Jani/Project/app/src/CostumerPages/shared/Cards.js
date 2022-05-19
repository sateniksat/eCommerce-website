import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';


function Cards(props) {

    return (
      
      <Card sx={{ minWidth:"20%",mx:"2%",mb:"2%" }}>
      <Link to={`/products/${props.product.id}`}>
      <CardMedia
        component="img"
        alt="img"
        height="200"
        image={`http://localhost:3002/files/${props.product.thumbnail}`}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {props.product.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         $ {props.product.price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Link>
    </Card>
  );

}

export default Cards