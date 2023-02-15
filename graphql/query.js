import { gql, useQuery, useLazyQuery } from '@apollo/client';

const GET_PROFILE_IMAGE = gql`
    query GetProfileImage($getUserByIdId: ID) {
        getUserById(id: $getUserByIdId) {
            _id
            profileImage
        }
    }
`;

export { GET_PROFILE_IMAGE };
