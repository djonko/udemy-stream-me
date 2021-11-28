import {
  StreamDocument,
  StreamQuery,
  StreamQueryVariables,
  useDeleteStreamMutation,
  useEditStreamMutation,
  useStreamsQuery,
} from "generated/types";
import { initializeApollo } from "lib/apollo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import {
  Container,
  TextField,
  Typography,
  Box,
  Button,
} from "@material-ui/core";
import { Stream } from "generated/types";

export default function EditStream({ id }) {
  const [editStream] = useEditStreamMutation();
  const [deleteStream] = useDeleteStreamMutation();
  const router = useRouter();
  const [state, setState] = useState({
    _id: "",
    title: "",
    description: "",
    url: "",
  } as Stream);

  //create state values localy
  const { _id, title, description, url } = state;
  const fetchStream = async () => {
    //const { data } = useStreamsQuery();
    const apollo = initializeApollo();
    const { data } = await apollo.query<StreamQuery, StreamQueryVariables>({
      query: StreamDocument,
      variables: { streamId: id },
    });
    setState(data.stream);
  };

  useEffect(() => {
    fetchStream();
  }, []);

  const onSubmit = async (event) => {
    event.preventDefault();
    try {
      const { data } = await editStream({
        variables: { streamInput: { id: _id, title, description, url } },
      });

      if (data.editStream._id) {
        router.push("/streams");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onDelete = async (event) => {
    event.preventDefault();
    try {
      const { data } = await deleteStream({
        variables: { streamId: _id },
      });

      if (data.deleteStream) {
        router.push("/streams");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Container maxWidth="sm">
      <Box my={4}>
        <Typography variant="h4">Edit Stream</Typography>
        <form onSubmit={onSubmit}>
          <Box pb={2.5} />
          <TextField
            autoFocus
            onChange={(e) => {
              setState({ ...state, title: e.target.value });
            }}
            label="Title"
            value={title}
            required
            fullWidth
          />
          <Box pb={2.5} />
          <TextField
            onChange={(e) => {
              setState({ ...state, description: e.target.value });
            }}
            label="Description"
            value={description}
            required
            fullWidth
          />

          <Box pb={2.5} />
          <TextField
            onChange={(e) => {
              setState({ ...state, url: e.target.value });
            }}
            label="URL"
            value={url}
            required
            fullWidth
          />
          <Box pb={2.5} />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
          <Button onClick={onDelete} variant="contained">
            Delete
          </Button>
        </form>
      </Box>
    </Container>
  );
}

// this serverRenderProps will handler user request when it come straight from url address
export async function getServerSideProps({ query: { id } }) {
  return {
    props: { id },
  };
}
