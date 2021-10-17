export async function getSearchBooks(query, startIndex = 0) {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${
      startIndex >= 0 ? startIndex : 0
    }&maxResults=20`
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

export async function getPaginationBooks(query, startIndex) {
  console.log("get pagination run");
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${query}&startIndex=${startIndex}&maxResults=20`
  );
  const data = await response.json();
  const items = data.items;
  const results = [];
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
  console.log(results);
  return results;
}
