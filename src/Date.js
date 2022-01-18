const monthLenghts = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

Date.prototype.daysSinceStartOfYear = function() {
  return monthLenghts.slice(0, this.getMonth()).reduce(
    ( accumulator, currentValue ) => accumulator + currentValue,
    0
  ) + this.getDate()
}

Date.prototype.weekOfYear = function() {
  // the first two days of the year are saturday and sunday
  return Math.ceil((this.daysSinceStartOfYear() - 2) / 7)
}

Date.prototype.workDaysSinceStartOfYear = function() {
    // the first two days of the year are saturday and sunday
    return this.daysSinceStartOfYear() - (this.weekOfYear() * 2)
}

Date.prototype.reviewCaptain = function(devs, offset) {
    return devs[(Math.floor(this.weekOfYear() / 2) + offset) % devs.length]
}

Date.prototype.prPolice = function(devs, offset) {
  return devs[(this.weekOfYear() + offset) % devs.length]
}

Date.prototype.standupMaster = function(devs, offset) {
  return devs[(this.workDaysSinceStartOfYear() + offset) % devs.length]
}