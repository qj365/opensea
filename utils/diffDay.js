// return the difference between two dates in days
// @param {Date} date1
// @param {Date} date2
// @return {Number} difference in days
export default function diffDay(date1, date2, prefixLabel = '') {
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    let label = prefixLabel;
    if (diffDays === 0) label += 'today';
    else if (diffDays === 1) label += '1 day';
    else label += `${diffDays} days`;
    return label;
}
