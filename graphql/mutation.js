import { gql } from '@apollo/client';

const CREATE_USER = gql`
    mutation CreateUser($input: UserInput) {
        createUser(input: $input) {
            _id
            profileImage
        }
    }
`;

const UPDATE_AVATAR = gql`
    mutation UpdateAvatar($updateUserId: ID, $input: UserInput) {
        updateUser(id: $updateUserId, input: $input) {
            profileImage
        }
    }
`;

const UPDATE_BANNER = gql`
    mutation UpdateBanner($updateUserId: ID, $input: UserInput) {
        updateUser(id: $updateUserId, input: $input) {
            profileBanner
        }
    }
`;

const UPDATE_USER = gql`
    mutation UpdateUser($updateUserId: ID, $input: UserInput) {
        updateUser(id: $updateUserId, input: $input) {
            _id
            username
            bio
            link
        }
    }
`;

const CREATE_COLLECTION = gql`
    mutation createCollection($input: CollectionInput) {
        createCollection(input: $input) {
            _id
            name
            logoImage
            featuredImage
            bannerImage
            description
            slug
            category
            owner {
                _id
            }
        }
    }
`;

export {
    CREATE_USER,
    UPDATE_AVATAR,
    UPDATE_BANNER,
    UPDATE_USER,
    CREATE_COLLECTION,
};
