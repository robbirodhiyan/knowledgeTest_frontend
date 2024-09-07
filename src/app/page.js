"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Navigation from "./components/Navigation";

export default function Home() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("male"); // Default to male
  const [isRegistering, setIsRegistering] = useState(true);
  const [authMessage, setAuthMessage] = useState("");
  const router = useRouter();

  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isRegistering) {
        // Register user
        const { data } = await axios.post(
          "http://localhost:5000/api/users/register",
          { name, email, password, gender }
        );

        // Automatically log in the user after registration
        const loginResponse = await axios.post(
          "http://localhost:5000/api/users/login",
          { email, password }
        );
        localStorage.setItem("token", loginResponse.data.token);
        router.push("/products"); // Redirect to products page
      } else {
        // Login user
        const { data } = await axios.post(
          "http://localhost:5000/api/users/login",
          { email, password }
        );
        localStorage.setItem("token", data.token);
        router.push("/products"); // Redirect to products page
      }
      setAuthMessage("Success");
    } catch (error) {
      console.error("Error:", error);
      setAuthMessage("Failed");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-8 bg-gray-100">
      <main className="w-full max-w-md bg-white p-6 rounded-lg shadow-md space-y-8">
        <section>
          <h1 className="text-2xl font-bold mb-4 text-blue-900">
            {isRegistering ? "Register" : "Login"}
          </h1>
          <form onSubmit={handleAuthSubmit} className="space-y-4">
            {isRegistering && (
              <>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Name"
                  className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                  required
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
              </>
            )}
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-600 text-black"
              required
            />
            <button
              type="submit"
              className="w-full p-2 bg-blue-700 text-white rounded hover:bg-blue-800 transition"
            >
              {isRegistering ? "Register" : "Login"}
            </button>
            <button
              type="button"
              onClick={() => setIsRegistering(!isRegistering)}
              className="w-full p-2 bg-gray-400 text-gray-800 rounded hover:bg-gray-500 transition"
            >
              Switch to {isRegistering ? "Login" : "Register"}
            </button>
            {authMessage && (
              <p className="text-center text-red-600">{authMessage}</p>
            )}
          </form>
        </section>
      </main>
    </div>
  );
}
