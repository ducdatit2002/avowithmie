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
import { updatePodcast, fetchPodcasts } from "@/redux/actions/actionPodcast"; // Ensure you have these actions available

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

export function SheetModifyPodcast({ podcastData, isOpen, onClose }) {
  const dispatch = useDispatch();
  const [name, setName] = useState(podcastData.name);
  const [artist, setArtist] = useState(podcastData.artist);
  const [podcast, setPodcast] = useState(podcastData.podcast);
  const [img, setImg] = useState(podcastData.img);
  const [duration, setDuration] = useState(podcastData.duration);

  useEffect(() => {
    setName(podcastData.name);
    setArtist(podcastData.artist);
    setPodcast(podcastData.podcast);
    setImg(podcastData.img);
    setDuration(podcastData.duration);
  }, [podcastData]);

  const handleUpdate = async () => {
    const updatedPodcast = {
      ...podcastData,
      name,
      artist,
      podcast,
      img,
      duration,
    };

    try {
      await dispatch(updatePodcast(podcastData._id, updatedPodcast));
      dispatch(fetchPodcasts()); // Fetch all podcasts to reflect the update
      onClose(); // Close the sheet after updating
    } catch (error) {
      console.error("Failed to update podcast:", error);
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
            Update Podcast
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-2">
          <LabeledInput
            label="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <LabeledInput
            label="Artist"
            id="artist"
            value={artist}
            onChange={(e) => setArtist(e.target.value)}
          />
          <LabeledInput
            label="Podcast File"
            id="podcast"
            value={podcast}
            onChange={(e) => setPodcast(e.target.value)}
          />
          <LabeledInput
            label="Image File"
            id="img"
            value={img}
            onChange={(e) => setImg(e.target.value)}
            type="text" // Adjust if needed, e.g., for file uploads
          />
          <LabeledInput
            label="Duration"
            id="duration"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
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
