import { createContext, useState, useEffect } from "react";

let initilaMyBooks = [];
const storedMyBooks = localStorage.getItem("myBooks");
if (storedMyBooks) {
  initilaMyBooks = JSON.parse(storedMyBooks);
}
console.log(initilaMyBooks);

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
});

export const MyBooksContextProvider = (props) => {
  const [myBooks, setMyBooks] = useState(initilaMyBooks);
  const updateMyBooksHandler = (myBook) => {
    console.log(myBooks);
    setMyBooks((pervValue) => [...pervValue, myBook]);
    updateLocalStorage(myBook);
  };

  //   useEffect(() => {
  //     localStorage.setItem("myBooks", JSON.stringify(myBooks));
  //   }, [myBooks]);

  const context = {
    myBooks,
    updateMyBooks: updateMyBooksHandler,
  };
  return (
    <MyBooksContext.Provider value={context}>
      {props.children}
    </MyBooksContext.Provider>
  );
};

export default MyBooksContext;
