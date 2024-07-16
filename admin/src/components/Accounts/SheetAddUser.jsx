import { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "@/redux/actions/actionUser";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet, SheetClose, SheetContent, SheetFooter, SheetHeader, SheetTitle
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

const validatePassword = (password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return passwordRegex.test(password);
};

export function SheetAddUser({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [month, setMonth] = useState("");
  const [date, setDate] = useState("");
  const [year, setYear] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleAdd = async () => {
    if (!validatePassword(password)) {
      setErrorMessage("Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.");
      return;
    }

    const newUser = {
      gender,
      email,
      password,
      name,
      month,
      date,
      year
    };

    try {
      const addedUser = await dispatch(addUser(newUser));
      console.log("User added successfully:", addedUser);
      onClose(); // Close the modal on success
    } catch (error) {
      console.error("Failed to add user:", error);
      setErrorMessage("Failed to add user: " + error.message);
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
          <SheetTitle className="text-3xl not-italic font-bold">Add User</SheetTitle>
        </SheetHeader>
        <div className="grid gap-4 py-2">
          <LabeledInput label="Name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
          <LabeledInput label="Gender" id="gender" value={gender} onChange={(e) => setGender(e.target.value)} />
          <LabeledInput label="Email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
          <LabeledInput label="Password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
          <LabeledInput label="Month" id="month" value={month} onChange={(e) => setMonth(e.target.value)} />
          <LabeledInput label="Date" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
          <LabeledInput label="Year" id="year" value={year} onChange={(e) => setYear(e.target.value)} />
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
