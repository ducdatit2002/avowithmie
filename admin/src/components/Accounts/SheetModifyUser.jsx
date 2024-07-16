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
import { resetPassword } from "@/redux/actions/actionUser";

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

export function SheetModifyUser({ userData, updateUser, isOpen, onClose }) {
  const dispatch = useDispatch();
  const [gender, setGender] = useState(userData.gender);
  const [email, setEmail] = useState(userData.email);
  const [name, setName] = useState(userData.name);
  const [isAdmin, setIsAdmin] = useState(userData.isAdmin);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [newPassword, setNewPassword] = useState("");

  useEffect(() => {
    setGender(userData.username);
    setEmail(userData.email);
    setName(userData.name);
    setIsAdmin(userData.isAdmin);
  }, [userData]);

  const handleUpdate = async () => {
    const updatedUser = {
      ...userData,
      gender,
      email,
      name,
      isAdmin,
    };

    console.log("Updating user with data:", updatedUser);

    try {
      await dispatch(updateUser(userData._id, updatedUser));
      console.log("User updated successfully:", updatedUser);

      if (newPassword) {
        console.log("Resetting password for user with ID:", userData._id);
        await dispatch(resetPassword(userData._id, newPassword));
        console.log("Password reset successfully");
      }

      onClose(); // Close the sheet after updating
    } catch (error) {
      console.error("Failed to update user or reset password:", error);
    }
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        className="sm:max-w-md overflow-auto"
        style={{ maxHeight: "100%vh" }}
      >
        <SheetHeader className="flex shadow-gray-800 shadow-[0_2px_0_0_rgba(0,0,0,0.1)]">
          <SheetClose asChild>
            <div className="flex items-center cursor-pointer" onClick={onClose}>
              <span className="text-sm font-medium">BACK</span>
            </div>
          </SheetClose>
          <SheetTitle className="text-3xl not-italic font-bold">
            Update User
          </SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-2">
          <LabeledInput
            label="Gender"
            id="gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          />
          <LabeledInput
            label="Email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
          />
          <LabeledInput
            label="Name"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div className="flex items-center gap-4">
            <input
              type="checkbox"
              id="isAdmin"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
              className="h-4 w-4 border-gray-300 rounded text-blue-600 focus:ring-blue-500"
            />
            <Label htmlFor="isAdmin" className="text-sm">
              Admin
            </Label>
          </div>
          <Button
            type="button"
            className="bg-blue_super_dark hover:bg-blue_dark"
            onClick={() => setShowPasswordInput(!showPasswordInput)}
          >
            {showPasswordInput ? "Cancel Password Reset" : "Reset Password"}
          </Button>
          {showPasswordInput && (
            <div className="flex flex-col gap-4">
              <LabeledInput
                label="New Password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                type="password"
              />
            </div>
          )}
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
