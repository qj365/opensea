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

const GET_USER_NAME_BY_ID = gql`
    query Query($getUserByIdId: ID) {
        getUserById(id: $getUserByIdId) {
            _id
            username
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

const GET_COLLECTION_BY_QUERY = gql`
    query Query($query: String) {
        getAllCollections(query: $query) {
            _id
            name
            logoImage
            featuredImage
            bannerImage
            description
            category
            owner
            slug
        }
    }
`;

const GET_COLLECTION_BY_SLUG = gql`
    query Query($query: String) {
        getAllCollections(query: $query) {
            _id
            name
            logoImage
            featuredImage
            bannerImage
            description
            category
            owner
            slug
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

const GET_SLUG_COLLECTION_BY_ID = gql`
    query GetCollectionById($getCollectionByIdId: ID) {
        getCollectionById(id: $getCollectionByIdId) {
            _id
            slug
        }
    }
`;

const GET_COLLECTION_BY_ID = gql`
    query GetCollectionById($getCollectionByIdId: ID) {
        getCollectionById(id: $getCollectionByIdId) {
            _id
            name
            logoImage
            featuredImage
            bannerImage
            description
            category
            owner {
                _id
            }
            slug
        }
    }
`;

export {
    GET_PROFILE_IMAGE,
    GET_USER_INFO,
    GET_COLLECTION_BY_NAME,
    GET_COLLECTION_BY_QUERY,
    GET_COLLECTIONS_FOR_DISPLAY,
    GET_SLUG_COLLECTION_BY_ID,
    GET_COLLECTION_BY_ID,
    GET_USER_NAME_BY_ID,
    GET_COLLECTION_BY_SLUG,
};
