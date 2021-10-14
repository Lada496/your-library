export const getSearchBooks = async () => {
  const response = await fetch(
    `https://www.googleapis.com/books/v1/volumes?q=${searchInputRef.current.value}&startIndex=0&maxResults=40`
  );
  const data = await response.json();
  console.log(data);
};
