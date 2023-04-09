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

function formatToUSDate(timestamp) {
    if (!timestamp) return '';
    const date = new Date(parseInt(timestamp, 10));

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    return new Intl.DateTimeFormat('en-US', options).format(date);
}

export { formatJoinedDate, formatToUSDate };
