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
            royalty {
                creator
                percentage
            }
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

const GET_NFT_ASSET_PAGE = gql`
    query GetNftAssetPage($collectionNft: ID, $tokenId: Int) {
        getNftAssetPage(collectionNft: $collectionNft, tokenId: $tokenId) {
            _id
            tokenId
            listing {
                _id
                listingId
                isListing
                type
                price
                currency
                endTimestamp
            }
            events {
                _id
                eventId
                eventType
                eventName
                assetContract
                tokenId
                currency
                price
                startTimestamp
                endTimestamp
                transactionHash
                creator {
                    _id
                    username
                }
                from {
                    _id
                    username
                }
                to {
                    _id
                    username
                }
                active
            }
            views
            media
            name
            link
            description
            collectionNft {
                _id
                royalty {
                    creator
                    percentage
                }
                name
                logoImage
                featuredImage
                category
                slug
                description
            }
            creator {
                _id
                username
            }
            owner {
                _id
                username
            }
            onAuction {
                auctionId
                active
                seller
                winner
                price
            }
        }
    }
`;

const GET_EVENT_OF_NFT = gql`
    query GetEventOfNft(
        $collectionNft: ID
        $tokenId: Int
        $eventType: String
        $active: Boolean
    ) {
        getEventOfNft(
            collectionNft: $collectionNft
            tokenId: $tokenId
            eventType: $eventType
            active: $active
        ) {
            _id
            eventId
            eventType
            eventName
            assetContract
            tokenId
            currency
            price
            startTimestamp
            endTimestamp
            transactionHash
            creator {
                username
            }
            from {
                username
            }
            to {
                username
            }
            active
        }
    }
`;

const GET_BEST_OFFER = gql`
    query GetBestOffer($collectionNft: ID, $tokenId: Int) {
        getBestOffer(collectionNft: $collectionNft, tokenId: $tokenId) {
            _id
            eventId
            eventType
            eventName
            active
            creator {
                username
            }
            assetContract
            from {
                username
            }
            tokenId
            currency
            price
            startTimestamp
            endTimestamp
            transactionHash
            to {
                username
            }
        }
    }
`;

const GET_BEST_BID = gql`
    query GetBestBid($collectionNft: ID, $tokenId: Int) {
        getBestBid(collectionNft: $collectionNft, tokenId: $tokenId) {
            _id
            eventId
            eventType
            eventName
            active
            tokenId
            currency
            price
        }
    }
`;
const GET_ALL_NFTS = gql`
    query GetAllNfts($query: String) {
        getAllNfts(query: $query) {
            tokenId
            listing {
                isListing
                type
                price
                currency
            }
            views
            media
            name
            link
            description
            collectionNft {
                _id
                name
            }
            creator {
                _id
                username
            }
            owner {
                username
                _id
            }
        }
    }
`;
const NFT_QUERY = gql`
    query Query($query: String, $page: Int, $limit: Int) {
        getQueryNfts(query: $query, page: $page, limit: $limit) {
            total
            totalPage
            nfts {
                name
                tokenId
                collectionNft {
                    _id
                    name
                }
                media
                listing {
                    price
                    currency
                }
            }
        }
    }
`;
const COLLECTION_INFO = gql`
    query GetCollectionInfoBySlug($slug: String) {
        getCollectionInfoBySlug(slug: $slug) {
            yourSite
            totalVolume
            sales
            slug
            royalty {
                percentage
            }
            name
            logoImage
            floorPrice
            featuredImage
            description
            category
            bannerImage
            _id
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
    GET_NFT_ASSET_PAGE,
    GET_EVENT_OF_NFT,
    GET_BEST_OFFER,
    GET_ALL_NFTS,
    GET_BEST_BID,
    NFT_QUERY,
    COLLECTION_INFO,
};
