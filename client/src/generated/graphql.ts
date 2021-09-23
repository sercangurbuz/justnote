import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | undefined;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** Date custom scalar type */
  Date: any;
};

export type Auth = {
  __typename?: 'Auth';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
  user: User;
};

export type ChangePasswordInput = {
  newPassword: Scalars['String'];
  oldPassword: Scalars['String'];
};

export type CreateNoteInput = {
  description: Scalars['String'];
  title: Scalars['String'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: User;
  createNote: Note;
  login: Auth;
  refreshToken: Token;
  signup: Auth;
  updateUser: User;
};


export type MutationChangePasswordArgs = {
  data: ChangePasswordInput;
};


export type MutationCreateNoteArgs = {
  data: CreateNoteInput;
};


export type MutationLoginArgs = {
  data: LoginInput;
};


export type MutationSignupArgs = {
  data: SignupInput;
};


export type MutationUpdateUserArgs = {
  data: UpdateUserInput;
};

export type Note = {
  __typename?: 'Note';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  description: Scalars['String'];
  id: Scalars['Int'];
  status: Scalars['String'];
  title: Scalars['String'];
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
  user: User;
};

export type Query = {
  __typename?: 'Query';
  me: User;
  note: Note;
  notes: Array<Note>;
};


export type QueryNoteArgs = {
  id: Scalars['Int'];
};


export type QueryNotesArgs = {
  description?: Maybe<Scalars['String']>;
  status?: Maybe<Scalars['String']>;
  title?: Maybe<Scalars['String']>;
};

export type SignupInput = {
  email: Scalars['String'];
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
  password: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  noteCreated: Note;
};

export type Token = {
  __typename?: 'Token';
  /** JWT access token */
  accessToken: Scalars['String'];
  /** JWT refresh token */
  refreshToken: Scalars['String'];
};

export type UpdateUserInput = {
  firstname?: Maybe<Scalars['String']>;
  lastname?: Maybe<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  /** Identifies the date and time when the object was created. */
  createdAt: Scalars['Date'];
  email: Scalars['String'];
  firstname: Scalars['String'];
  id: Scalars['Int'];
  lastname: Scalars['String'];
  notes: Array<Note>;
  /** Identifies the date and time when the object was last updated. */
  updatedAt: Scalars['Date'];
};

export type GetNotesQueryVariables = Exact<{
  title?: Maybe<Scalars['String']>;
}>;


export type GetNotesQuery = { __typename?: 'Query', notes: Array<{ __typename?: 'Note', id: number, title: string, description: string, createdAt: any, updatedAt: any, user: { __typename?: 'User', firstname: string, lastname: string } }> };


export const GetNotesDocument = gql`
    query getNotes($title: String) {
  notes(title: $title) {
    id
    title
    description
    createdAt
    updatedAt
    user {
      firstname
      lastname
    }
  }
}
    `;

/**
 * __useGetNotesQuery__
 *
 * To run a query within a React component, call `useGetNotesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetNotesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetNotesQuery({
 *   variables: {
 *      title: // value for 'title'
 *   },
 * });
 */
export function useGetNotesQuery(baseOptions?: Apollo.QueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
      }
export function useGetNotesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetNotesQuery, GetNotesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetNotesQuery, GetNotesQueryVariables>(GetNotesDocument, options);
        }
export type GetNotesQueryHookResult = ReturnType<typeof useGetNotesQuery>;
export type GetNotesLazyQueryHookResult = ReturnType<typeof useGetNotesLazyQuery>;
export type GetNotesQueryResult = Apollo.QueryResult<GetNotesQuery, GetNotesQueryVariables>;