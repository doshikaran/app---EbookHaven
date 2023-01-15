import { StyleSheet, Text, View } from "react-native";
import React, { createContext, ReactNode, useContext, useState } from "react";

type MyBookContextType = {
  onToggleSave: (book: Book) => void;
  isBookSaved: (book: Book) => boolean;
  saved: Book[];
};
const MyBookContext = createContext<MyBookContextType>({
  onToggleSave: () => {},
  isBookSaved: () => false,
  saved: [],
});

type Props = {
  children: ReactNode;
};
const MyBooks = ({ children }: Props) => {
  const [saved, setSaved] = useState<Book[]>([]);

  const booksSame = (a: Book, b: Book) => {
    return JSON.stringify(a) === JSON.stringify(b);
  };
  const isBookSaved = (book: Book) => {
    return saved.some((saved) => booksSame(saved, book));
  };

  const onToggleSave = (book: Book) => {
    if (isBookSaved(book)) {
      //remoce
      setSaved((books) => books.filter((saved) => !booksSame(saved, book)));
    } else {
      //add
      setSaved((books) => [book, ...books]);
    }
  };

  return (
    <MyBookContext.Provider value={{ onToggleSave, isBookSaved, saved }}>
      {children}
    </MyBookContext.Provider>
  );
};

export const useMyBooks = () => useContext(MyBookContext);

export default MyBooks;
