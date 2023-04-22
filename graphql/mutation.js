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

const UPDATE_COLLECTION = gql`
    mutation UpdateCollection(
        $updateCollectionId: ID
        $input: CollectionInput
    ) {
        updateCollection(id: $updateCollectionId, input: $input) {
            _id
            logoImage
            featuredImage
            bannerImage
            name
            slug
            description
            category
        }
    }
`;

const CREATE_NFT = gql`
    mutation Mutation($input: NftInput) {
        createNft(input: $input) {
            tokenId
            media
            name
            link
            description
        }
    }
`;

const VIEWS_NFT = gql`
    mutation Mutation($collectionNft: ID, $tokenId: Int) {
        viewNft(collectionNft: $collectionNft, tokenId: $tokenId) {
            views
            tokenId
        }
    }
`;

const UPDATE_NFT = gql`
    mutation UpdateNft($updateNftId: ID, $input: NftInput) {
        updateNft(id: $updateNftId, input: $input) {
            tokenId
        }
    }
`;

const CREATE_EVENT = gql`
    mutation Mutation($input: EventInput) {
        createEvent(input: $input) {
            _id
            eventId
            eventType
        }
    }
`;

const DEACTIVE_EVENT = gql`
    mutation DeactiveEvent($ids: [ID]) {
        deactiveEvent(ids: $ids) {
            _id
            eventId
            eventName
            eventType
            active
        }
    }
`;

const APPROVE_OFFER = gql`
    mutation Mutation(
        $offerId: ID
        $collectionNft: ID
        $tokenId: Int
        $event: EventInput
    ) {
        approveOffer(
            offerId: $offerId
            collectionNft: $collectionNft
            tokenId: $tokenId
            event: $event
        ) {
            tokenId
            collectionNft
            owner
        }
    }
`;

const BUY_NOW_NFT = gql`
    mutation BuyNow($collectionNft: ID, $tokenId: Int, $event: EventInput) {
        buyNow(
            collectionNft: $collectionNft
            tokenId: $tokenId
            event: $event
        ) {
            collectionNft
            tokenId
            owner
        }
    }
`;

const UPDATE_EVENT = gql`
    mutation UpdateEvent($updateEventId: ID, $input: EventInput) {
        updateEvent(id: $updateEventId, input: $input) {
            endTimestamp
        }
    }
`;

const SCHEDULE_DEACTIVE_AUCTION = gql`
    mutation DeactiveAuction($deactiveAuctionId: ID, $endTimestamp: String) {
        deactiveAuction(id: $deactiveAuctionId, endTimestamp: $endTimestamp) {
            active
            _id
            eventName
            eventType
        }
    }
`;

export {
    CREATE_USER,
    UPDATE_AVATAR,
    UPDATE_BANNER,
    UPDATE_USER,
    CREATE_COLLECTION,
    UPDATE_COLLECTION,
    CREATE_NFT,
    VIEWS_NFT,
    UPDATE_NFT,
    CREATE_EVENT,
    DEACTIVE_EVENT,
    APPROVE_OFFER,
    BUY_NOW_NFT,
    UPDATE_EVENT,
    SCHEDULE_DEACTIVE_AUCTION,
};
