// src/components/SignIn.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const auth = getAuth();

function SignIn() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await signInWithEmailAndPassword(auth, data.email, data.password);
      navigate('/main');
    } catch (error) {
      console.error("Error signing in: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Sign In</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input {...register("email", { required: "Email is required" })} className="w-full mt-1 p-2 border rounded" />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" {...register("password", { required: "Password is required" })} className="w-full mt-1 p-2 border rounded" />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Sign In</button>
      </form>
    </div>
  );
}

export default SignIn;
