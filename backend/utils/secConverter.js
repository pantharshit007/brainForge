
exports.convertSecondsToDuration = (timeInSeconds) => {
    const hours = Math.floor(timeInSeconds / 3600)          // 3600 sec in 1 hour
    const minutes = Math.floor((timeInSeconds % 3600) / 60) // 01:30:00 % = 30:00 / 60 = 30m
    const seconds = Math.floor((timeInSeconds % 3600) % 60) //01:03:20 = 3:20 % 60 = 20s

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    } else if (minutes > 0) {
        return `${minutes}m ${seconds}s`;
    } else {
        return `${seconds}s`;
    }
}