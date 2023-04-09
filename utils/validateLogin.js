import Cookies from 'js-cookie';
export default function validateLogin(address) {
    if (address && address === Cookies.get('__user_address')) return true;
    else return false;
}
