const { ThirdwebSDK } = require('@thirdweb-dev/sdk');

async function main() {
    const sdk = new ThirdwebSDK('goerli');
    const contract = await sdk.getContract(
        '0xd7DA9400166fCbA720401523099A30545438DF3d',
        'marketplace-v3' // Provide the "marketplace-v3" contract type
    );

    console.log('Listening for NewListing events...');
    const unsubscribe = contract.events.listenToAllEvents(event => {
        // Perform some logic when the event is emitted
        console.log(event);
    });
}

main();
