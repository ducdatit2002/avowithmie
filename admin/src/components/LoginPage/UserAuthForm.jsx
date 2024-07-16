import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";

const formSchema = z.object({
  email: z.string().min(1, "Please enter an email").email("Invalid email"),
  password: z.string().min(1, "Please enter a password"),
});

export default function UserAuthForm() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const defaultValues = {
    email: "",
    password: "",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues,
  });

  const onSubmit = (data) => {
    const { email, password } = data;
    if (email === "admin@gmail.com" && password === "Admin123@") {
      localStorage.setItem(
        "x-auth-token",
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjQwNmJhN2JkNGVjYzMwMmQyOThiN2YiLCJpc0FkbWluIjp0cnVlLCJpYXQiOjE3MTg3MDUwNzB9.ZKZbBONnV8QfA0Ofy4d2l1ke2hLZqFBy4pv7DKscGZA"
      );
      setLoading(false);
      navigate("/");
    } else {
      setError("Incorrect username or password.");
      setLoading(false);
    }
  };

  return (
    <>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-2"
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    type="email"
                    placeholder="Enter your email..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="Enter your password..."
                    disabled={loading}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            disabled={loading}
            className="ml-auto w-full bg-blue_super_dark hover:bg-blue_dark text-white"
            type="submit"
          >
            SIGN IN
          </Button>
        </form>
      </Form>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">
            Or continue with
          </span>
        </div>
      </div>
    </>
  );
}
