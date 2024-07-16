import UserAuthForm from "../LoginPage/UserAuthForm";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";
import Transition from "@/utils/Transition";

function SignInPage() {
  return (
    <Transition className="relative h-screen flex flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <Link
        to="/"
        className={cn(
          buttonVariants({ variant: "ghost" }),
          "absolute right-4 top-4 hidden md:right-8 md:top-8"
        )}
      >
        Login
      </Link>
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
        <div className="absolute inset-0 bg-blue_super_dark dark:bg-secondary" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <img src={logo} alt="Logo" className="h-40 w-auto" />
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;A website for manage user, book and podcast &rdquo;
            </p>
            <p className="text-sm text-white_blue">Contact: +84 90 285 0103 </p>
            <footer className="text-sm">Duc Dat & Mie</footer>
          </blockquote>
        </div>
      </div>
      <div className="flex h-full items-center p-4 lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">
              LOGIN 
            </h1>
            <p className="text-sm text-muted-foreground">
              Enter your username and password to continue
            </p>
          </div>
          <UserAuthForm />
          <p className="px-8 text-center text-sm text-muted-foreground">
            Do not have an account?
            <br></br>
            Please contact to the admin.
            <br></br>
            Email: ducdatit2002@gmail.com
          </p>
        </div>
      </div>
    </Transition>
  );
}

export default SignInPage;
