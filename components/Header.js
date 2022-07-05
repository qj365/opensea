import Image from 'next/image';
import Link from 'next/link';
import openseaLogo from '../assets/openseaLogo.svg';
import { AiOutlineSearch } from 'react-icons/ai';
import { CgProfile } from 'react-icons/cg';
import { MdOutlineAccountBalanceWallet } from 'react-icons/md';

const style = {
    wrapper: `bg-[#04111d] w-screen px-[1.2rem] py-[0.8rem] flex `,
    logoContainer: `flex items-center cursor-pointer`,
    logoText: ` ml-[0.8rem] text-white font-semibold text-2xl`,
    searchBar: `flex flex-1 mx-[0.8rem] w-max-[520px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]`,
    searchIcon: `text-[#8a939b] mx-3 font-bold text-lg`,
    searchInput: `h-[2.6rem] w-full border-0 bg-transparent outline-0 ring-0 px-2 pl-0 text-[#e6e8eb] placeholder:text-[#8a939b]`,
    headerItems: ` flex items-center justify-end`,
    headerItem: `text-white px-4 font-bold text-[#c8cacd] hover:text-white cursor-pointer`,
    headerIcon: `text-[#8a939b] text-3xl font-black px-4 hover:text-white cursor-pointer`,
};

const Header = () => {
    return (
        <nav className="flex bg-[#04111d] h-[72px]  top-0 left-0 w-full z-10">
            <div className="h-full pr-6 px-4">
                <Link href="/">
                    <a className="flex h-full items-center">
                        <Image
                            src={openseaLogo}
                            height={40}
                            width={40}
                            alt="Logo"
                        />
                        <span className={style.logoText}>Opensea</span>
                    </a>
                </Link>
            </div>
            <div className=" flex flex-1 h-full items-center">
                <div className="flex flex-1 h-[45px] items-center bg-[#363840] rounded-[0.8rem] hover:bg-[#4c505c]">
                    <div className={style.searchIcon}>
                        <AiOutlineSearch />
                    </div>
                    <input
                        className={style.searchInput}
                        placeholder="Search items, collections, and accounts"
                    />
                </div>
            </div>
            <ul className="flex">
                <div className="flex items-center">
                    <li className="h-full">
                        <Link href="/">
                            <a className="flex items-center h-full px-5 font-bold text-[#c8cacd] hover:text-white">
                                Explore
                            </a>
                        </Link>
                    </li>
                    <li className="h-full">
                        <Link href="/">
                            <a className="flex items-center h-full px-5 font-bold text-[#c8cacd] hover:text-white">
                                Stats
                            </a>
                        </Link>
                    </li>
                    <li className="h-full">
                        <Link href="/">
                            <a className="flex items-center h-full px-5 font-bold text-[#c8cacd] hover:text-white">
                                Resources
                            </a>
                        </Link>
                    </li>
                    <li className="h-full">
                        <Link href="/">
                            <a className="flex items-center h-full px-5 font-bold text-[#c8cacd] hover:text-white">
                                Create
                            </a>
                        </Link>
                    </li>
                </div>
                <div className="flex">
                    <li>
                        <Link href="/">
                            <a className="flex items-center text-3xl h-full px-5 font-bold text-[#8a939b] hover:text-white">
                                <CgProfile />
                            </a>
                        </Link>
                    </li>
                    <li>
                        <button className=" text-[32px] h-full px-5 font-bold text-[#8a939b] hover:text-white">
                            <MdOutlineAccountBalanceWallet />
                        </button>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default Header;
