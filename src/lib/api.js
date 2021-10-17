export async function getSearchBooks(query) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=0&maxResults=40`
  );
  const data = await response.json();
  const items = data.items;
  const results = [];
  console.log(data);
  for (const item of items) {
    results.push({
      id: item.id,
      title: item.volumeInfo.title,
      ...(item.volumeInfo.imageLinks && {
        image: item.volumeInfo.imageLinks.thumbnail,
      }),
      ...(item.volumeInfo.authors && { authors: item.volumeInfo.authors }),
      ...(item.volumeInfo.description && {
        description: item.volumeInfo.description,
      }),
    });
  }
  return {
    results,
    totalItems: data.totalItems,
  };
}
