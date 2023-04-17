// return the difference between two dates in days
// @param {Date} date1
// @param {Date} date2
// @return {Number} difference in days
export default function diffDay(date1, date2, prefixLabel = '') {
    const diff = Math.abs(date2 - date1);
    if (diff < 60000) {
        return 'in < 60 seconds';
    } else if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `in ${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `in ${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `in ${days} day${days > 1 ? 's' : ''}`;
    } else if (diff < 2419200000) {
        const weeks = Math.floor(diff / 604800000);
        return `in ${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
        const months = Math.floor(diff / 2419200000);
        return `in ${months} month${months > 1 ? 's' : ''}`;
    }
}
