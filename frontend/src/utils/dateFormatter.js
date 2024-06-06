export const formattedDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: "long",
        day: "numeric",
        year: "numeric",
    })
}

export const formattedDateTime = (dateTime) => {
    const date = new Date(dateTime)

    const hour = date.getHours()
    const minutes = date.getMinutes()
    const period = hour >= 12 ? "PM" : "AM"
    const formattedTime = `${hour % 12}:${minutes
        .toString()
        .padStart(2, "0")} ${period}`

    return formattedDate(dateTime) + ' | ' + formattedTime
}