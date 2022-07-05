import Head from 'next/head';
import Image from 'next/image';
import Footer from '../components/Footer';
import Header from '../components/Header';
import BrowsePage from '../components/home/BrowsePage';
import HomePage from '../components/home/HomePage';

import styles from '../styles/Home.module.css';

export default function Home() {
    return (
        <>
            <Header />
            <HomePage />
            <BrowsePage />

            <Footer />
        </>
    );
}
