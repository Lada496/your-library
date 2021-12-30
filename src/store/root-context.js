import { useState, createContext } from "react";

let initilaMyBooks = [];
const storedMyBooks = localStorage.getItem("myBooks");
if (storedMyBooks) {
  initilaMyBooks = JSON.parse(storedMyBooks);
}

const updateLocalStorage = (myBook) => {
  let prevMyBooks = localStorage.getItem("myBooks");
  let myBooks = [];
  if (storedMyBooks) {
    myBooks = JSON.parse(prevMyBooks);
    myBooks.push(myBook);
  } else {
    myBooks = [];
    myBooks.push(myBook);
  }
  localStorage.setItem("myBooks", JSON.stringify(myBooks));
};

const item = {
  item: {},
  updateItem: (item) => {},
};

const myBooks = {
  myBooks: initilaMyBooks,
  updateMyBooks: (myBook) => {},
  deleteMyBook: (myBooks) => {},
  sortMyBooks: (myBooks) => {},
  defaultMyBooks: () => {},
};

const RootContext = createContext({
  item,
  myBooks,
});

export const RootContextProvider = (props) => {
  const [item, setItem] = useState({});
  const [myBooks, setMyBooks] = useState(initilaMyBooks);
  const updateItemHandler = (item) => {
    setItem({
      id: item.id,
      title: item.title,
      authors: item.authors,
      image: item.image,
      description: item.description,
    });
  };

  const updateMyBooksHandler = (myBook) => {
    setMyBooks((pervValue) => [...pervValue, myBook]);
    updateLocalStorage(myBook);
  };

  const deleteMyBookHandler = (myBooks) => {
    setMyBooks(myBooks);
    localStorage.setItem("myBooks", JSON.stringify(myBooks));
  };

  const sortMyBooksHandler = (sortedMyBooks) => {
    setMyBooks(sortedMyBooks);
  };

  const defaultMyBooksHandler = () => {
    const storedMyBooks = localStorage.getItem("myBooks");
    let myBooks = [];
    if (storedMyBooks) {
      myBooks = JSON.parse(storedMyBooks);
    }
    setMyBooks(myBooks);
  };

  const itemContext = {
    item,
    updateItem: updateItemHandler,
  };
  const myBooksContext = {
    myBooks,
    updateMyBooks: updateMyBooksHandler,
    deleteMyBook: deleteMyBookHandler,
    sortMyBooks: sortMyBooksHandler,
    defaultMyBooks: defaultMyBooksHandler,
  };

  const rootContext = {
    item: itemContext,
    myBooks: myBooksContext,
  };
  return (
    <RootContext.Provider value={rootContext}>
      {props.children}
    </RootContext.Provider>
  );
};

export default RootContext;
