import { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook } from "@/redux/actions/actionBook"; // Ensure the correct import path
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
import { IoArrowBack } from "react-icons/io5";

const LabeledInput = ({ label, id, value, onChange, type = "text" }) => (
  <div className="flex flex-col items-start gap-4 relative">
    <Label htmlFor={id} className="absolute top-0.5 left-3 text-xs text-grey">{label}</Label>
    <Input
      id={id}
      value={value}
      onChange={onChange}
      className="col-span-3 w-full h-12 text-bottom pt-[1.4em]"
      type={type}
    />
  </div>
);

export function SheetAddBook({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [bookSchema, setBookSchema] = useState("url"); // Default value or dynamic
  const [img, setImg] = useState("url"); // Default value or dynamic
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = async () => {
    if (!title || !author) {
      setErrorMessage("Title and author are required.");
      return;
    }

    const newBook = {
      title,
      author,
      bookSchema,
      img,
    };

    try {
      await dispatch(addBook(newBook));
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Failed to add book:", error);
      setErrorMessage("Failed to add book: " + error.message);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-auto" style={{ maxHeight: "100%vh" }}>
        <SheetHeader className="flex shadow-gray-800 shadow-[0_2px_0_0_rgba(0,0,0,0.1)]">
          <SheetClose asChild>
            <div className="flex items-center cursor-pointer" onClick={onClose}>
              <IoArrowBack className="mr-2" size={24} />
              <span className="text-sm font-medium">BACK</span>
            </div>
          </SheetClose>
          <SheetTitle className="text-3xl not-italic font-bold">Add Book</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-2">
          <LabeledInput label="Title" id="title" value={title} onChange={(e) => setTitle(e.target.value)} />
          <LabeledInput label="Author" id="author" value={author} onChange={(e) => setAuthor(e.target.value)} />
          <LabeledInput label="Book Schema" id="bookSchema" value={bookSchema} onChange={(e) => setBookSchema(e.target.value)} />
          <LabeledInput label="Image File" id="img" value={img} onChange={(e) => setImg(e.target.value)} type="text" />
          {errorMessage && <p className="text-red-500">{errorMessage}</p>}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button type="button" className="bg-white text-black">Cancel</Button>
          </SheetClose>
          <Button type="button" className="bg-blue_super_dark hover:bg-blue_dark" onClick={handleAdd}>Save</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
