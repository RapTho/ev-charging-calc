"use client";

import { User, LockKeyhole } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function SettingsPage() {
  return (
    <div className="p-4">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">My account</CardTitle>
            <CardDescription className="text-base">
              Sign in with your{" "}
              <a href="https://admin.ecarup.com/authentication/login">eCarUp</a>{" "}
              account
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-5">
            <div className="flex items-center space-x-4">
              <User />
              <Input type="email" placeholder="Email" className="text-base" />
            </div>
            <div className=" flex items-center space-x-4">
              <LockKeyhole />
              <Input
                type="password"
                placeholder="Password"
                className="text-base"
              />
            </div>

            <div className="flex space-x-6 items-center">
              <Checkbox id="terms1" />
              <div className="grid gap-1.5 leading-none">
                <label
                  htmlFor="terms1"
                  className="text-base font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Remember me
                </label>
              </div>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full text-base">Sign in</Button>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-3xl">Cost per kWh</CardTitle>
            <CardDescription className="text-base">
              This value will be used to calculate the cost for your charges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <h1>someting</h1>
          </CardContent>
          <CardFooter>
            <Button className="w-full text-base">Save</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
