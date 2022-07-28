import Footer from './Footer';
import Header from './Header';

function Layout({ children, isShowFooter }) {
    return (
        <>
            <Header />
            <main>{children}</main>
            <Footer />
        </>
    );
}

export default Layout;
