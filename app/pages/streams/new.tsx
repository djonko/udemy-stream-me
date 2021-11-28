import { useState } from "react";
import { useRouter } from "next/router";
import { useAddStreamMutation } from "generated/types";
import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
} from "@material-ui/core";

export default function CreateStream({}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const router = useRouter();
  const [createStream] = useAddStreamMutation();

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await createStream({
        variables: { streamToAdd: { title, description, url } },
      });
      if (data.addStream._id) {
        router.push("/streams");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">Create Stream</Typography>
        <form onSubmit={onSubmit}>
          <Box pb={2.5} />
          <TextField
            fullWidth
            autoFocus
            label="Titre"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Box pb={2.5} />
          <TextField
            fullWidth
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <Box pb={2.5} />
          <TextField
            fullWidth
            label="Url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
          <Box pb={2.5} />
          <Button type="submit" variant="contained" color="primary">
            Create Stream
          </Button>
        </form>
      </Box>
    </Container>
  );
}
