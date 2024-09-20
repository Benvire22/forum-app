import React from 'react';
import { Button, Card, CardActions, CardContent, CardHeader, CardMedia, styled, Typography } from '@mui/material';
import { API_URL } from '../../../constants';
import Grid from '@mui/material/Grid2';
import { Link } from 'react-router-dom';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from 'dayjs';
import ForumIcon from '@mui/icons-material/Forum';

const ImageCardMedia = styled(CardMedia)({
  height: '200px',
  width: '200px',
});

interface Props {
  id: string
  title: string;
  user: string;
  createdAt: Date;
  image: string | null;
}

const PostItem: React.FC<Props> = ({ id, title, user, createdAt, image }) => {
  let cardImage = '';

  if (image) {
    cardImage = `${API_URL}/${image}`;
  }

  return (
    <Grid sx={{ width: '100%', margin: '10px 0' }}>
      <Card sx={{ display: 'flex', p: 2, alignItems: 'center' }}>
        {image ? (
          <ImageCardMedia image={cardImage} title={title} />
        ) : (
          <Typography variant='h1' color='primary' marginLeft={5} marginRight={8}>
            <ForumIcon fontSize='inherit' />
          </Typography>
        )}
        <Grid>
          <CardHeader title={title} />
          <CardContent>
            <span>Author: {user} </span>
            <span>{dayjs(createdAt).format('DD.MM.YYYY HH:mm:ss')}</span>
          </CardContent>
          <CardActions>
            <Button component={Link} to={`/posts/${id}`}>
              read more
              <ArrowForwardIcon />
            </Button>
          </CardActions>
        </Grid>
      </Card>
    </Grid>
  );
};

export default PostItem;