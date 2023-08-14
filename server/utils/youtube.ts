/**
 * Function to get the thumbnail URL of a Youtube video
 * @param id
 * @returns string of thumbnail URL
 */
export const getThumbnail = (id: string) =>
  `https://img.youtube.com/vi/${id}/0.jpg`

/**
 * Function to get the video ID by parsing Youtube URL
 * @param url
 * @returns string of video ID
 */
export const getId = (url: string): string => {
  const shortsKeyword = "/shorts/"
  const shortsIndex = url.indexOf(shortsKeyword)
  if (shortsIndex !== -1) {
    const videoId = url.substring(shortsIndex + shortsKeyword.length)
    return videoId
  }
  throw new Error("Invalid URL")
}
