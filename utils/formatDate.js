function formatJoinedDate(timestamp) {
    const date = new Date(parseInt(timestamp, 10));
    const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
    ];
    const formattedDate =
        'Joined ' + monthNames[date.getMonth()] + ' ' + date.getFullYear();
    return formattedDate;
}

export { formatJoinedDate };
