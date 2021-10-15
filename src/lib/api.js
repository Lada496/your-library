export async function getSearchBooks(query, index) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${index}&maxResults=40`
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
    });
  }
  return {
    results,
    totalItems: data.totalItems,
  };
}
