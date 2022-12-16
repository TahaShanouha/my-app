function fetchProperDateFormat(dateToFormat) {
    let dateObj = new Date(dateToFormat);
    let month = dateObj.getUTCMonth() + 1;
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();

    const newdate = day + "/" + month + "/" + year;
    return newdate;
}

module.exports = fetchProperDateFormat;