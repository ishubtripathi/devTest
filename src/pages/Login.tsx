import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { User, UserPlus, Shield } from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [role, setRole] = useState("customer");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Demo credentials
    if (username === "admin" && password === "admin") {
      localStorage.setItem("role", "admin");
      localStorage.setItem("user", "Admin User");
      toast.success("Welcome Admin!");
      navigate("/admin");
    } else if (username === "customer" && password === "customer") {
      localStorage.setItem("role", "customer");
      localStorage.setItem("user", "John Doe");
      toast.success("Welcome Customer!");
      navigate("/customer");
    } else {
      toast.error("Invalid credentials!");
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would make an API call to create the account
    localStorage.setItem("role", role);
    localStorage.setItem("user", newUsername);
    toast.success("Account created successfully! Please login.");
    setIsRegister(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-purple-500 p-4"
    >
      <Card className="w-[400px] shadow-xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center gap-2">
            <User className="w-6 h-6" />
            Welcome Back
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Username</Label>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
              />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
          </form>

          <div className="mt-6">
            <Dialog open={isRegister} onOpenChange={setIsRegister}>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  <UserPlus className="mr-2 h-4 w-4" />
                  Create Account
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Create New Account</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleRegister} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="newUsername">Username</Label>
                    <Input
                      id="newUsername"
                      type="text"
                      placeholder="Choose a username"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="Choose a password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Select Role</Label>
                    <RadioGroup
                      value={role}
                      onValueChange={setRole}
                      className="flex flex-col space-y-2"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="customer" id="customer" />
                        <Label htmlFor="customer" className="flex items-center gap-2">
                          <User className="w-4 h-4" />
                          Customer
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="admin" id="admin" />
                        <Label htmlFor="admin" className="flex items-center gap-2">
                          <Shield className="w-4 h-4" />
                          Admin
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>
                  <Button type="submit" className="w-full">
                    Create Account
                  </Button>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          <div className="mt-4 text-sm text-gray-500 text-center">
            Demo credentials:<br />
            Admin: admin/admin<br />
            Customer: customer/customer
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Login;