import { Typography, Button, Box, Paper, Grid, Theme } from "@material-ui/core";
import Link from "next/link";
import { makeStyles } from "@material-ui/core/styles";
import { Stream } from "generated/types";
import { useAuth } from "lib/useAuth";
import { relative } from "path";

interface Props {
  stream: Stream;
}

export default function Hero({ stream }: Props) {
  const { user } = useAuth();
  const styles = useStyles();
  const showEdit = user && user._id === stream.author._id;
  return (
    <Paper className={styles.mainFeaturedPost}>
      <div className={styles.overlay} />
      <Grid container>
        <Grid item md={6}>
          <div className={styles.mainFeaturedPostContent}>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
            >
              {stream.title}
            </Typography>
            <Typography variant="h5" color="inherit" paragraph>
              {stream.description}
            </Typography>
            <Box pb={1} />
            {showEdit && (
              <Link href={`edit/${stream._id}`} passHref>
                <Button variant="outlined" color="inherit">
                  Edit Stream
                </Button>
              </Link>
            )}
          </div>
        </Grid>
      </Grid>
    </Paper>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  toolbar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbarTitle: {
    flex: 1,
  },
  mainFeaturedPost: {
    position: "relative",
    backgroundColor: theme.palette.grey[800],
    color: theme.palette.common.white,
    marginBottom: theme.spacing(4),
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  },
  overlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    backgroundColor: "rgba(0,0,0,0.7)",
  },
  mainFeaturedPostContent: {
    position: "relative",
    padding: theme.spacing(3),
    [theme.breakpoints.up("md")]: {
      padding: theme.spacing(6),
      paddingRight: 0,
    },
  },
}));
