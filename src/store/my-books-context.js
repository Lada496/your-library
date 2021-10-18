import { createContext, useState, useEffect } from "react";

const MyBooksContext = createContext({
  myBooks: [],
  updateMyBooks: (myBook) => {},
});

export const MyBooksContextProvider = (props) => {
  const [myBooks, setMyBooks] = useState([]);
  const updateMyBooksHandler = (myBook) => {
    console.log(myBooks);
    setMyBooks((pervValue) => [...pervValue, myBook]);
  };

  useEffect(() => {
    localStorage.setItem("myBooks", JSON.stringify(myBooks));
  }, [myBooks]);

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
