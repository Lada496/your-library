import { createContext, useState } from "react";

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

const MyBooksContext = createContext({
  myBooks: initilaMyBooks,
  updateMyBooks: (myBook) => {},
  deleteMyBook: (myBooks) => {},
  sortMyBooks: (myBooks) => {},
  defaultMyBooks: () => {},
});

export const MyBooksContextProvider = (props) => {
  const [myBooks, setMyBooks] = useState(initilaMyBooks);
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

  const context = {
    myBooks,
    updateMyBooks: updateMyBooksHandler,
    deleteMyBook: deleteMyBookHandler,
    sortMyBooks: sortMyBooksHandler,
    defaultMyBooks: defaultMyBooksHandler,
  };
  return (
    <MyBooksContext.Provider value={context}>
      {props.children}
    </MyBooksContext.Provider>
  );
};

export default MyBooksContext;
