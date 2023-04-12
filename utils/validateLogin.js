import Cookies from 'js-cookie';
export default function validateLogin(address) {
    if (
        address &&
        Cookies.get('__user_address') &&
        address.toLowerCase() === Cookies.get('__user_address')?.toLowerCase()
    )
        return true;
    else return false;
}
