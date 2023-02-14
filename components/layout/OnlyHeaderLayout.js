import Header from './Header';

function OnlyHeaderLayout({ children }) {
    return (
        <>
            <Header />
            <main className="mt-[72px]">{children}</main>
        </>
    );
}

export default OnlyHeaderLayout;
