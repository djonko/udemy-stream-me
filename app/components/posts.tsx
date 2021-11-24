import { Grid } from "@material-ui/core";
import { makeStyles, Theme } from "@material-ui/core/styles";
import { Stream } from "generated/types";
import PostItem from "./postItem";

interface Props {
  streams: Stream[];
}

export default function Posts(props: Props) {
  const styles = useStyles();
  const { streams } = props;
  return (
    <Grid container className={styles.container} spacing={4}>
      {streams &&
        streams.map((post) => <PostItem post={post} styles={styles} />)}
    </Grid>
  );
}
const useStyles = makeStyles((theme: Theme) => ({
  container: {
    marginTop: theme.spacing(4),
  },
  card: {
    display: "flex",
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
}));

export type MakeStyleType = ReturnType<typeof useStyles>;
