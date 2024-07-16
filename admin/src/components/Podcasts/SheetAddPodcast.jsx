import { useState } from "react";
import { useDispatch } from "react-redux";
import { addPodcast } from "@/redux/actions/actionPodcast"; // Ensure the correct import path
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

export function SheetAddPodcast({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState("");
  const [artist, setArtist] = useState("");
  const [podcast, setPodcast] = useState("");
  const [img, setImg] = useState("");
  const [duration, setDuration] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = async () => {
    if (!name || !artist || !podcast || !img || !duration) {
      setErrorMessage("All fields are required.");
      return;
    }

    const newPodcast = {
      name,
      artist,
      podcast,
      img,
      duration,
    };

    try {
      await dispatch(addPodcast(newPodcast));
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Failed to add podcast:", error);
      setErrorMessage("Failed to add podcast: " + error.message);
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
          <SheetTitle className="text-3xl not-italic font-bold">Add Podcast</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-2">
          <LabeledInput label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <LabeledInput label="Artist" id="artist" value={artist} onChange={(e) => setArtist(e.target.value)} />
          <LabeledInput label="Podcast File" id="podcast" value={podcast} onChange={(e) => setPodcast(e.target.value)} />
          <LabeledInput label="Image File" id="img" value={img} onChange={(e) => setImg(e.target.value)} type="text" />
          <LabeledInput label="Duration" id="duration" value={duration} onChange={(e) => setDuration(e.target.value)} />
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
