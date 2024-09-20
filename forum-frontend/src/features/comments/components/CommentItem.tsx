import React from 'react';
import Grid from '@mui/material/Grid2';
import { Card, CardContent, CardHeader, Typography } from '@mui/material';

interface Props {
  author: string
  message: string;
}

const CommentItem: React.FC<Props> = ({ author, message }) => {
  return (
    <Grid sx={{ width: '100%', margin: '10px 0 0', borderTop: '1px solid black' }}>
      <Card sx={{ p: 1, alignItems: 'center' }}>
        <CardHeader title={author} sx={{ borderBottom: '1px solid black' }} />
        <CardContent>
          <Typography variant='h6' marginBottom='20px'>
            {message}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default CommentItem;