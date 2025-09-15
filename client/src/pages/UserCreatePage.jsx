import React from "react";
import UserForm from "../utils/UserForm";
import { useDispatch } from "react-redux";
import { createUser } from "../usersSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function UserCreatePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const res = await dispatch(createUser(values)).unwrap(); // unwrap handles errors cleanly
      toast.success("✅ User created successfully");
      navigate("/users"); // redirect to users list instead of home
    } catch (err) {
      console.error("❌ Error creating user:", err);
      toast.error("Failed to create user");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Create User</h2>
      <UserForm onSubmit={handleSubmit} />
    </div>
  );
}
