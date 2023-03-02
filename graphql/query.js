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

const GET_COLLECTION_BY_NAME = gql`
    query GetCollectionByName($query: String) {
        getAllCollections(query: $query) {
            _id
            name
        }
    }
`;

const GET_COLLECTION_BY_OWNER = gql`
    query GetCollectionByOwner($query: String) {
        getAllCollections(query: $query) {
            _id
            name
            logoImage
            featuredImage
            bannerImage
            description
            category
        }
    }
`;

const GET_COLLECTIONS_FOR_DISPLAY = gql`
    query Query($query: String) {
        getAllCollections(query: $query) {
            _id
            name
            slug
            logoImage
            featuredImage
        }
    }
`;

export {
    GET_PROFILE_IMAGE,
    GET_USER_INFO,
    GET_COLLECTION_BY_NAME,
    GET_COLLECTION_BY_OWNER,
    GET_COLLECTIONS_FOR_DISPLAY,
};
