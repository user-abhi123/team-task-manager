import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "member",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/signup", form);

      localStorage.setItem("token", res.data.token);

      alert("Registration Successful");

      navigate("/dashboard");
    } catch (err) {
      alert(err.response?.data?.msg || "Register failed");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-900">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded w-96"
      >
        <h2 className="text-white text-2xl mb-5 text-center">
          Register
        </h2>

        <input
          type="text"
          name="name"
          placeholder="Name"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        />

        <select
          name="role"
          onChange={handleChange}
          className="w-full p-2 mb-3 rounded bg-gray-700 text-white"
        >
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>

        <button className="bg-cyan-500 w-full py-2 rounded text-white">
          Register
        </button>

        <p className="text-gray-300 mt-3 text-center">
          Already have account?{" "}
          <Link to="/" className="text-cyan-400">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}