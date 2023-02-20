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
            username
            bio
            link
            profileImage
            profileBanner
            createdAt
        }
    }
`;

export { GET_PROFILE_IMAGE, GET_USER_INFO };
