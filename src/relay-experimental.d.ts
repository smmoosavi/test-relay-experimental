declare module 'relay-experimental' {
  import { FunctionComponent } from 'react';
  import { Environment, FetchPolicy } from 'react-relay';
  import { CacheConfig, GraphQLTaggedNode, OperationType } from 'relay-runtime';

  export interface RelayEnvironmentProviderProps {
    environment: Environment;
  }
  export const RelayEnvironmentProvider: FunctionComponent<
    RelayEnvironmentProviderProps
  >;

  interface useLazyLoadQueryOptions {
    fetchKey?: string | number;
    fetchPolicy?: FetchPolicy;
    networkCacheConfig?: CacheConfig;
  }

  export function useLazyLoadQuery<T extends OperationType = OperationType>(
    gqlQuery: GraphQLTaggedNode,
    variables: T['variables'],
    options?: useLazyLoadQueryOptions,
  ): T['response'];

  export function useFragment<F>(
    fragmentInput: GraphQLTaggedNode,
    fragmentRef?: ReadonlyArray<any> | any,
  ): F;
}
