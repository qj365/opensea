function checkDateRangeOverlap(listing1, listing2) {
    const range1 = {
        start: new Date(listing1.startTimestamp),
        end: new Date(lisitng1.endTimestamp),
    };
    const range2 = {
        start: new Date(listing2.startTimestamp),
        end: new Date(lisitng2.endTimestamp),
    };

    if (range1.start <= range2.end && range1.end >= range2.start) {
        return true;
    } else {
        return false;
    }
}
