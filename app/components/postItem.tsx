import {
  Typography,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Hidden,
  Grid,
} from "@material-ui/core";
import Link from "next/link";
import { Stream } from "generated/types";
import { MakeStyleType } from "./posts";

interface Props {
  post: Stream;
  styles: MakeStyleType;
}

export default function PostItem(props: Props) {
  const { post, styles } = props;
  return (
    <Grid item key={post._id} xs={12} md={6}>
      <Link href={`/streams/${post._id}`}>
        <CardActionArea component="a" href="#">
          <Card className={styles.card}>
            <div className={styles.cardDetails}>
              <CardContent>
                <Typography component="h2" variant="h5">
                  {post.title}
                </Typography>
                <Typography color="textSecondary" variant="subtitle1">
                  {post.url}
                </Typography>
                <Typography variant="subtitle1" paragraph>
                  {post.description}
                </Typography>
              </CardContent>
            </div>
            <Hidden xsDown>
              <CardMedia
                className={styles.cardMedia}
                image="https://source.unsplash.com/random"
                title="Image title"
              />
            </Hidden>
          </Card>
        </CardActionArea>
      </Link>
    </Grid>
  );
}
