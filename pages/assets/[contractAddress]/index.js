import client from '../../../graphql/apollo-client';
import { GET_SLUG_COLLECTION_BY_ID } from '../../../graphql/query';

function index() {
    return <div>index</div>;
}

export default index;

export async function getServerSideProps(context) {
    const { contractAddress } = context.params;

    try {
        const { data } = await client.query({
            query: GET_SLUG_COLLECTION_BY_ID,
            variables: { getCollectionByIdId: contractAddress.toLowerCase() },
            fetchPolicy: 'network-only',
        });

        if (data?.getCollectionById) {
            return {
                redirect: {
                    destination: `/collection/${data.getCollectionById.slug}`,
                    permanent: false,
                },
            };
        }
    } catch (err) {
        console.log(err);
    }
    return {
        notFound: true,
    };
}
