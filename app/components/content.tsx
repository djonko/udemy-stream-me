import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

interface VideoProps {
  url: string;
}
export default function Video({ url }: VideoProps) {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <iframe
        className={classes.iframe}
        src={url}
        frameBorder="0"
        loading="lazy"
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture;"
        allowFullScreen
      />
    </div>
  );
}

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    //overflow: "hidden",
    /* 16:9 aspect ratio */
    //paddingTop: "56.25%",
    position: "relative",
  },
  iframe: {
    border: "0",
    height: "500px",
    left: 0,
    top: 0,
    width: "100%",
  },
}));
