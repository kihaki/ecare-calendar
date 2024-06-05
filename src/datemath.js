/* For a given date, get the ISO week number
 *
 * Based on information at:
 *
 *    THIS PAGE (DOMAIN EVEN) DOESN'T EXIST ANYMORE UNFORTUNATELY
 *    http://www.merlyn.demon.co.uk/weekcalc.htm#WNR
 *
 * Algorithm is to find nearest thursday, it's year
 * is the year of the week number. Then get weeks
 * between that date and the first day of that year.
 *
 * Note that dates in one year can be weeks of previous
 * or next year, overlap is up to 3 days.
 *
 * e.g. 2014/12/29 is Monday in week  1 of 2015
 *      2012/1/1   is Sunday in week 52 of 2011
 * 
 * Shameless copy from https://stackoverflow.com/a/6117889
 */
export function weekOfYear(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setMilliseconds(0);
    // Set to nearest Thursday: current date + 4 - current day number
    // Make Sunday's day number 7
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    // Get first day of year
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    // Calculate full weeks to nearest Thursday
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);
    // Return array of year and week number
    return weekNo;
}

/**
 * Blame (praise?) ChatGPT for this.
 */
export function weekdaysFromStartOfYear(d) {
    // Copy date so don't modify original
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setMilliseconds(0);

    const currentWeekNumber = weekOfYear(d);
    
    // Get the start of the year
    const startOfYear = new Date(d.getFullYear(), 0, 1); // January 1st of the current year
    const startDayOfWeek = startOfYear.getDay(); // 0 (Sunday) to 6 (Saturday)
    
    // Calculate the number of weekdays in the first week
    const weekdaysInFirstWeek = 5 - Math.min(5, (7 - startDayOfWeek + 1) % 7);
    
    // Calculate the number of full weeks excluding the first week
    const fullWeeks = currentWeekNumber - 2; // Subtract 2 because we don't count the first week and the current week as full weeks

    // Total weekdays in full weeks
    const weekdaysInFullWeeks = fullWeeks > 0 ? fullWeeks * 5 : 0;

    // Calculate the number of weekdays in the current week
    const dayOfWeek = d.getDay(); // 0 (Sunday) to 6 (Saturday)
    const weekdaysInCurrentWeek = Math.min(dayOfWeek, 5);

    // Total weekdays from the start of the year to now
    const totalWeekdays = weekdaysInFirstWeek + weekdaysInFullWeeks + weekdaysInCurrentWeek;

    return totalWeekdays;
}

/**
 * Returns the day of the year for given date.
 */
export function dayOfYear(d){
    const startOfYear = new Date(d.getFullYear(), 0, 1); // January 1st of the given year
    return daysBetween(startOfYear, d);
}

/**
 * Returns the days difference between d1 and d2.
 */
export function daysBetween(d1, d2) {
    d1 = new Date(Date.UTC(d1.getFullYear(), d1.getMonth(), d1.getDate()));
    d1.setMilliseconds(0);

    d2 = new Date(Date.UTC(d2.getFullYear(), d2.getMonth(), d2.getDate()));
    d2.setMilliseconds(0);

    // Calculate the difference in days
    const msInDay = 24 * 60 * 60 * 1000;
    return Math.floor((d2 - d1) / msInDay);
}

/**
 * Number of three week sprints between sprintChange and d.
 */
export function sprintsSince(d, sprintChange) {
    const daysDiff = daysBetween(sprintChange, d) - 1; // We subtract one so that the review day will still count to the previous sprint, so that the calendar still shows the current sprint reviewer on that day.
    return Math.floor(daysDiff / 21);
}