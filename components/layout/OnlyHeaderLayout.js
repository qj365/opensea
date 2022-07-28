import Header from './Header';

function OnlyHeaderLayout({ children }) {
    return (
        <>
            <Header />
            <main>{children}</main>
        </>
    );
}

export default OnlyHeaderLayout;
