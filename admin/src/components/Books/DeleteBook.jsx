import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogClose,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { IoCloseOutline } from "react-icons/io5";

export function DeleteBook({ onDeleteBook }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-left items-center cursor-pointer px-2 py-1">
          <IoCloseOutline className="text-[#F04438] w-6 h-6 " />
          Delete Book
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete Book</DialogTitle>
        </DialogHeader>
        <div className="p-4">
          <p>Are you sure you want to delete this book?</p>
        </div>
        <DialogClose className="flex justify-end items-start gap-[1em]">
          <Button className="bg-white rounded-[1em] text-black">Cancel</Button>
          <Button
            className="bg-blue_super_dark hover:bg-[#F04438] rounded-[1em]"
            onClick={onDeleteBook}
          >
            Delete
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
