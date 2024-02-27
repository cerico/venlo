function generateFullSlug(category, story) {
  if (story) {
    const title = `${category} ${story}§`
    return `series/${title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`
  }
  return `categories/${category.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')}`

}

function generateSlug(category) {
  return category.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '')

}

export { generateFullSlug, generateSlug }
