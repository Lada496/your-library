import { useState, createContext } from "react";
const ItemContext = createContext({
  item: {},
  updateItem: (item) => {},
});

export const ItemContextProvider = (props) => {
  const [item, setItem] = useState({});
  const updateItemHandler = (item) => {
    setItem({
      id: item.id,
      title: item.title,
      authors: item.authors,
      image: item.image,
      description: item.description,
    });
  };
  const context = {
    item,
    updateItem: updateItemHandler,
  };
  return (
    <ItemContext.Provider value={context}>
      {props.children}
    </ItemContext.Provider>
  );
};

export default ItemContext;
