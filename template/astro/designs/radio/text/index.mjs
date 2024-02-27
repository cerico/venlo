const series = []
const organiseByMonth = () => {
  const episodes = {};
  series.forEach(seriesItem => {
    const category = seriesItem.title;
    seriesItem.stories.forEach(story => {
      const monthYear = new Date(story.published_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long'
      });
      if (!episodes[monthYear]) {
        episodes[monthYear] = {
          title: monthYear,
          stories: []
        };
      }
      const storyWithCategory = {
        ...story,
        category
      };
      episodes[monthYear].stories.push(storyWithCategory);
    });
  });
  const sortedByDate = Object.values(episodes).sort((a, b) => {
    const dateA = new Date(a.title);
    const dateB = new Date(b.title);
    return dateB - dateA;
  });
  const resultArray = sortedByDate;
  return resultArray;
};
const episodes = organiseByMonth();
export {
  series,
  episodes
};
