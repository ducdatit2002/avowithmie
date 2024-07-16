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

export function DeleteUser({ onDeleteUser }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex justify-left items-center cursor-pointer px-2 py-1">
          <IoCloseOutline className="text-[#F04438] w-6 h-6 " />
          Delete User
        </div>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Delete User</DialogTitle>
        </DialogHeader>
        <div className="">
          <div className="">Are you sure you want to delete this user?</div>
        </div>
        <DialogClose className="flex justify-end items-start gap-[1em]">
          <Button className="bg-white rounded-[1em] text-black">Cancel</Button>
          <Button
            className="bg-blue_super_dark hover:bg-[#F04438] rounded-[1em]"
            onClick={onDeleteUser}
          >
            Delete
          </Button>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
