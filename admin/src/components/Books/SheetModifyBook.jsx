import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { updateBook, fetchBooks } from "@/redux/actions/actionBook"; // Ensure you have these actions available

const LabeledInput = ({ label, id, value, onChange, type = "text" }) => (
  <div className="flex flex-col items-start gap-4 relative">
    <Label htmlFor={id} className="absolute top-0.5 left-3 text-xs text-grey">
      {label}
    </Label>
    <Input
      id={id}
      value={value}
      onChange={onChange}
      className="col-span-3 w-full h-12 text-bottom pt-[1.4em]"
      type={type}
    />
  </div>
);

export function SheetModifyBook({ bookData, isOpen, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState(bookData.title);
  const [author, setAuthor] = useState(bookData.author);
  const [bookSchema, setBookSchema] = useState(bookData.bookSchema);
  const [img, setImg] = useState(bookData.img);

  useEffect(() => {
    setTitle(bookData.title);
    setAuthor(bookData.author);
    setBookSchema(bookData.bookSchema);
    setImg(bookData.img);
  }, [bookData]);

  const handleUpdate = async () => {
    const updatedBook = {
      ...bookData,
      title,
      author,
      bookSchema,
      img,
    };

    try {
      await dispatch(updateBook(bookData._id, updatedBook));
      dispatch(fetchBooks()); // Fetch all books to reflect the update
      onClose(); // Close the sheet after updating
    } catch (error) {
      console.error("Failed to update book:", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-auto" style={{ maxHeight: "100%vh" }}>
        <SheetHeader className="flex shadow-gray-800 shadow-[0_2px_0_0_rgba(0,0,0,0.1)]">
          <SheetClose asChild>
            <div className="flex items-center cursor-pointer" onClick={onClose}>
              <span className="text-sm font-medium">BACK</span>
            </div>
          </SheetClose>
          <SheetTitle className="text-3xl not-italic font-bold">
            Update Book
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-2">
          <LabeledInput
            label="Title"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <LabeledInput
            label="Author"
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
          />
          <LabeledInput
            label="Book Schema"
            id="bookSchema"
            value={bookSchema}
            onChange={(e) => setBookSchema(e.target.value)}
          />
          <LabeledInput
            label="Image File"
            id="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            type="text" // Adjust if needed, e.g., for file uploads
          />
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button
              type="button"
              className="bg-white text-black hover:bg-blue_dark hover:text-white"
            >
              Cancel
            </Button>
          </SheetClose>
          <Button
            type="button"
            className="bg-blue_super_dark hover:bg-blue_dark"
            onClick={handleUpdate}
          >
            Save
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
