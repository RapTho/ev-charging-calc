"use client";

import { useEffect, useState } from "react";
import { User, LockKeyhole, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const handleSignInOut = (un, pw, signedIn, setSignedIn) => {
  if (!signedIn) {
    const encoded = btoa(`${un}:${pw}`);
    localStorage.setItem("auth", `Basic ${encoded}`);
    setSignedIn(true);
  } else {
    localStorage.removeItem("auth");
    setSignedIn(false);
  }
};

const handlePrice = (price) => {
  localStorage.setItem("price", price);
};

export default function SettingsPage() {
  const [signedIn, setSignedIn] = useState(false);

  useEffect(() => {
    setSignedIn(localStorage.getItem("auth") ? true : false);
  }, [signedIn]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [price, setPrice] = useState(0);

  const loginField = (
    <>
      <div className="flex items-center space-x-4">
        <User />
        <Input
          type="email"
          placeholder="Email"
          className="text-base"
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div className=" flex items-center space-x-4">
        <LockKeyhole />
        <Input
          type="password"
          placeholder="Password"
          className="text-base"
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
    </>
  );

  const signedInComponent = (
    // <h1 id="signedInComponent">You already signed in</h1>
    <Check className="h-12 w-12 text-green-600" />
  );
  return (
    <div className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card className="auto-rows-auto grid gap-2 content-between">
          <CardHeader>
            <CardTitle className="text-3xl">My account</CardTitle>
            <CardDescription className="text-base">
              Sign in with your{" "}
              <a href="https://admin.ecarup.com/authentication/login">eCarUp</a>{" "}
              account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            {signedIn ? signedInComponent : loginField}
          </CardContent>
          <CardFooter>
            <Button
              className="w-full text-base"
              onClick={() =>
                handleSignInOut(username, password, signedIn, setSignedIn)
              }
            >
              {signedIn ? "Sign out" : "Sign in"}
            </Button>
          </CardFooter>
        </Card>
        <Card className="auto-rows-auto grid gap-2 content-between">
          <CardHeader>
            <CardTitle className="text-3xl">CHF / kWh</CardTitle>
            <CardDescription>
              This value will be used to calculate the cost for your charges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input
              type="number"
              placeholder="0.32"
              className="text-3xl h-20"
              step="0.01"
              onChange={(e) => setPrice(e.target.value)}
            />
          </CardContent>
          <CardFooter className="end-0">
            <Button
              className="w-full text-base"
              onClick={() => handlePrice(price)}
            >
              Save
            </Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
