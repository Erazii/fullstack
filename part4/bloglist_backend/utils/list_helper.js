const dummy = (blogs) => {
    return 1
}
const totalLikes = (blogs) => {
    const likes = blogs.map(value => value.likes).reduce(function (result, item){
        return result + item
    },0)

    return likes
}

const favoriteBlog = (blogs) => {
    const favorite = blogs.sort((a,b) => a.likes - b.likes)[blogs.length-1]
    return favorite
}
module.exports = {
    dummy,
    totalLikes,
    favoriteBlog
}