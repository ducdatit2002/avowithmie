import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPodcasts } from "../../redux/actions/actionPodcast"; // Update the path as per your file structure
import Transition from "@/utils/Transition";
import { FiPlus } from "react-icons/fi";

import { PodcastTable } from "./PodcastTable"; // Make sure to create or update PodcastTable component
import { SheetAddPodcast } from "./SheetAddPodcast"; // This will be similar to SheetAddBook

import IconButton from "../components/IconButton";

const Podcasts = () => {
  const podcasts = useSelector(state => state.podcasts.podcasts || []); // Make sure your state structure is correct
  const dispatch = useDispatch();
  const [showAddPodcast, setShowAddPodcast] = useState(false); // State to manage the SheetAddPodcast visibility

  useEffect(() => {
    dispatch(fetchPodcasts());
  }, [dispatch]);

  const handleAddPodcast = () => {
    setShowAddPodcast(true); // Set the state to true to open the sheet
  };

  const handleCloseAddPodcast = () => {
    setShowAddPodcast(false); // Set the state to false to close the sheet
  };

  return (
    <>
      <div className="relative">
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <p className="text-3xl not-italic font-bold text-black">Podcasts</p>
          <div className="flex items-center gap-4">
            <IconButton
              icon={FiPlus}
              label="Add Podcast"
              onClick={handleAddPodcast}
              className="bg-blue_super_dark text-white rounded px-3 py-1.5 hover:bg-blue_dark"
            />
          </div>
        </div>
        <div className="flex items-center justify-between p-4 ">
          <p className="text-xl not-italic text-black">
            Number of Podcasts: {podcasts.length}
          </p>
        </div>
        <SheetAddPodcast isOpen={showAddPodcast} onClose={handleCloseAddPodcast} /> {/* Ensure to implement SheetAddPodcast */}

        <Transition className="flex flex-col p-4">
          <PodcastTable podcasts={podcasts} /> {/* Make sure PodcastTable is correctly implemented to handle podcasts */}
        </Transition>
      </div>
    </>
  );
};

export default Podcasts;
