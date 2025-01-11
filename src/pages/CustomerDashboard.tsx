import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const CustomerDashboard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role !== "customer") {
      navigate("/login");
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Customer Dashboard</h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>

        <Card>
          <CardContent className="p-6">
            <h2 className="text-2xl font-semibold">
              Welcome, {localStorage.getItem("user")}!
            </h2>
            <p className="mt-2 text-gray-600">
              Thank you for being our valued customer.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerDashboard;