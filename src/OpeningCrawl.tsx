import graphql from 'babel-plugin-relay/macro';
import React from 'react';
import { useFragment } from 'relay-experimental';
import {
  OpeningCrawl_film,
  OpeningCrawl_film$ref,
} from './__generated__/OpeningCrawl_film.graphql';

interface Props {
  film: OpeningCrawl_film$ref;
}

const fragment = graphql`
  fragment OpeningCrawl_film on Film {
    openingCrawl
  }
`;

function OpeningCrawl(props: Props) {
  const film = useFragment<OpeningCrawl_film>(fragment, props.film);

  return <div>{film.openingCrawl}</div>;
}

export default OpeningCrawl;
