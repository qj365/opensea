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

function timeElapsed(dt) {
    const now = new Date();
    const diff = now - dt;

    if (diff < 60000) {
        return 'just now';
    } else if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} minute${minutes > 1 ? 's' : ''} ago`;
    } else if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    } else if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days} day${days > 1 ? 's' : ''} ago`;
    } else if (diff < 2419200000) {
        const weeks = Math.floor(diff / 604800000);
        return `${weeks} week${weeks > 1 ? 's' : ''} ago`;
    } else {
        const months = Math.floor(diff / 2419200000);
        return `${months} month${months > 1 ? 's' : ''} ago`;
    }
}

function timeElapsedLabel(dt1, dt2) {
    const now = new Date(dt1);
    const diff = new Date(dt2) - now;
    console.log(diff);

    if (diff < 60000) {
        return '< 60 seconds';
    } else if (diff < 3600000) {
        const minutes = Math.floor(diff / 60000);
        return `${minutes} minute${minutes > 1 ? 's' : ''}`;
    } else if (diff < 86400000) {
        const hours = Math.floor(diff / 3600000);
        return `${hours} hour${hours > 1 ? 's' : ''}`;
    } else if (diff < 604800000) {
        const days = Math.floor(diff / 86400000);
        return `${days} day${days > 1 ? 's' : ''}`;
    } else if (diff < 2419200000) {
        const weeks = Math.floor(diff / 604800000);
        return `${weeks} week${weeks > 1 ? 's' : ''}`;
    } else {
        const months = Math.floor(diff / 2419200000);
        return `${months} month${months > 1 ? 's' : ''}`;
    }
}

function isValidDate(d) {
    return d instanceof Date && !isNaN(d);
}

export {
    formatJoinedDate,
    formatToUSDate,
    timeElapsed,
    timeElapsedLabel,
    isValidDate,
};
