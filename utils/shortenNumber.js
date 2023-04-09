export default function shortenNumber(num) {
    if (!num) return 0;
    if (num < 1000) return num;
    const units = ['K', 'M', 'B', 'T'];
    let i = 0;
    while (num >= 1000 && i < units.length - 1) {
        num /= 1000;
        i++;
    }
    return num.toFixed(1) + units[i];
}
