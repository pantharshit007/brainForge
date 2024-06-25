export default function getAvgRating(ratingArray) {
    if (!ratingArray || ratingArray?.length === 0) return 0

    const totalReviews = ratingArray?.length
    const totalRating = ratingArray?.reduce((acc, curr) => {
        acc += curr.rating
        return acc
    }, 0)

    const multiplier = Math.pow(10, 1)
    const avgRating = Math.round((totalRating / totalReviews) * multiplier) / multiplier

    return avgRating
}