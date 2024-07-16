import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBooks } from "../../redux/actions/actionBook"; // Update the path as per your file structure
import Transition from "@/utils/Transition";
import { FiPlus } from "react-icons/fi";

import { BookTable } from "./BookTable"; // Make sure to create or update BookTable component
import { SheetAddBook } from "./SheetAddBook"; // This will be similar to SheetAddUser

import IconButton from "../components/IconButton";

const Books = () => {
  const books = useSelector(state => state.books.books || []); // Make sure your state structure is correct
  const dispatch = useDispatch();
  const [showAddBook, setShowAddBook] = useState(false); // State to manage the SheetAddBook visibility

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  const handleAddBook = () => {
    setShowAddBook(true); // Set the state to true to open the sheet
  };

  const handleCloseAddBook = () => {
    setShowAddBook(false); // Set the state to false to close the sheet
  };

  return (
    <>
      <div className="relative">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <p className="text-3xl not-italic font-bold text-black">Books</p>
          <div className="flex items-center gap-4">
            <IconButton
              icon={FiPlus}
              label="Add Book"
              onClick={handleAddBook}
              className="bg-blue_super_dark text-white rounded px-3 py-1.5 hover:bg-blue_dark"
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 ">
          <p className="text-xl not-italic text-black">
            Number of Books: {books.length}
          </p>
        </div>
        <SheetAddBook isOpen={showAddBook} onClose={handleCloseAddBook} /> {/* Ensure to implement SheetAddBook */}

        <Transition className="flex flex-col p-4">
          <BookTable books={books} /> {/* Make sure BookTable is correctly implemented to handle books */}
        </Transition>
      </div>
    </>
  );
};

export default Books;
