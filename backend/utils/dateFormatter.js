const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

exports.formattedDateTime = (dateTime, dateOnly = false) => {
    const date = new Date(dateTime)

    const hour = date.getHours()
    const minutes = date.getMinutes()
    const formattedTime = `${hour}:${minutes
        .toString()
        .padStart(2, "0")}`

    if (!dateOnly) {
        return formattedTime + ' | ' + formattedDate(dateTime)
    } else {
        return formattedDate(dateTime)
    }
}