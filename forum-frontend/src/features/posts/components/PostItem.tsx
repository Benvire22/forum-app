import React from 'react';
import {Button, Card, CardActions, CardContent, CardHeader, CardMedia, IconButton, styled} from "@mui/material";
import imageNotFound from '../../../assets/images/image-not-found.png';
import {API_URL} from "../../../constants";
import Grid from "@mui/material/Grid2";
import {Link} from "react-router-dom";
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import dayjs from "dayjs";

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

const PostItem: React.FC<Props> = ({id, title, user, createdAt, image}) => {
    let cardImage = imageNotFound;

    if (image) {
        cardImage = `${API_URL}/${image}`;
    }

    return (
        <Grid sx={{ width: '100%', margin: '20px 0 0 150px' }}>
            <Card sx={{ display: 'flex', p: 2, alignItems: 'center' }}>
                <ImageCardMedia image={cardImage} title={title} />
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