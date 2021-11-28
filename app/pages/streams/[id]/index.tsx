import Container from "@material-ui/core/Container";
import Video from "components/content";
import Hero from "components/hero";
import { useStreamQuery } from "generated/types";

export default function StreamDetail({ id }) {
  const { data, loading } = useStreamQuery({
    variables: { streamId: id },
  });

  if (!loading && data && data.stream) {
    return (
      <Container maxWidth="lg">
        <Hero stream={data.stream} />
        <Video url={data.stream.url} />
      </Container>
    );
  }
  return null;
}

export async function getServerSideProps({ query: { id } }) {
  return {
    props: { id },
  };
}
