# Relay Experimental Try

a few days ago relay repository [announced](https://github.com/facebook/relay/releases) that ~~unreleased~~ relay-experimental is added to the relay project. you can find codes [here](https://github.com/facebook/relay/tree/master/packages/relay-experimental)

> Added unreleased relay-experimental package which contains experimental version of Relay Hooks using React Suspense.

I was very excited to see the hook version of the relay will be released. so I tried to use the relay experimental in the sample project

Update: now we can install relay experimental `react-relay@experimental`. see official documentation [here](https://relay.dev/docs/en/experimental/a-guided-tour-of-relay)

# Install
server:
```bash
git clone https://github.com/smmoosavi/swapi-graphql.git
yarn
PORT=4000 yarn start
```

web app:
```
git clone https://github.com/smmoosavi/test-relay-experimental.git
cd test-relay-experimental
yarn
yarn start
```

# New APIs
you can find official api [here](https://relay.dev/docs/en/experimental/api-reference)
## RelayEnvironmentProvider

```tsx
<RelayEnvironmentProvider environment={environment}>
  {/* ... */}
</RelayEnvironmentProvider>
```

## useLazyLoadQuery

```tsx
useLazyLoadQuery(query, variables, options);
```

## useFragment

```tsx
useFragment(fragment, fragmentRef);
```

# Example with new API

```tsx
// app.tsx
const app = () => {
  return (
    <RelayEnvironmentProvider environment={environment}>
      <Suspense fallback="loading">
        <Films />
      </Suspense>
    </RelayEnvironmentProvider>
  );
};
```

```tsx
// Films.tsx

const query = graphql`
  query FilmsQuery {
    allFilms {
      edges {
        node {
          id
          ...FilmItem_film
        }
      }
    }
  }
`;

const Films = () => {
  const data = useLazyLoadQuery(query, {});

  return (
    <div>
      {data.allFilms.edges.map(edge => (
        <div key={edge.node.id}>
          <FilmItem film={edge.node} />
        </div>
      ))}
    </div>
  );
};
```

```tsx
// FilmItem.tsx

const fragment = graphql`
  fragment FilmItem_film on Film {
    id
    title
  }
`;

const FilmItem = (props) => {
  const data = useFragment(fragment, props.film);

  return (
    <div>
      {data.title}
    </button>
  );
};
```

# Example with old APIs

```tsx
// App.tsx

const app = () => {
  return <Films />;
};
```

```tsx
// Films.tsx;

const Film = () => {
  return (
    <QueryRenderer
      environment={environment}
      query={graphql`
        query FilmsQuery {
          allFilms {
            edges {
              node {
                id
                ...FilmItem_film
              }
            }
          }
        }
      `}
      variables={{}}
      render={({ error, props }) => {
        if (error) {
          return <div>Error!</div>;
        }
        if (!props) {
          return <div>Loading...</div>;
        }
        return (
          <div>
            {props.allFilms.edges.map(edge => (
              <div key={edge.node.id}>
                <FilmItem film={edge.node} />
              </div>
            ))}
          </div>
        );
      }}
    />
  );
};
```

```tsx
// FilmItem.tsx
const FilmItem = (props) => {
  return (
    <div>
      {props.film.title}
    </button>
  );
};

export default createFragmentContainer(
  FilmItem,
  {
    film: graphql`
       fragment FilmItem_film on Film {
         id
         title
       }
    `
  },
)
```
