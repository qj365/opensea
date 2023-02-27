import { gql, useQuery, useLazyQuery } from '@apollo/client';

const GET_PROFILE_IMAGE = gql`
    query GetProfileImage($getUserByIdId: ID) {
        getUserById(id: $getUserByIdId) {
            _id
            profileImage
        }
    }
`;

const GET_USER_INFO = gql`
    query GetUserInfo($getUserByIdId: ID) {
        getUserById(id: $getUserByIdId) {
            _id
            username
            bio
            link
            profileImage
            profileBanner
            createdAt
        }
    }
`;

const GET_COLLECTIONS_BY_QUERY = gql`
    query GetCollectionByQuery($query: String) {
        getAllCollections(query: $query) {
            _id
            name
        }
    }
`;

export { GET_PROFILE_IMAGE, GET_USER_INFO, GET_COLLECTIONS_BY_QUERY };
