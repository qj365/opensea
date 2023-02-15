import { gql } from '@apollo/client';

const CREATE_USER = gql`
    mutation CreateUser($input: UserInput) {
        createUser(input: $input) {
            _id
            profileImage
        }
    }
`;

export { CREATE_USER };
