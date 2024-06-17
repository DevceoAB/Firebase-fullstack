// src/components/SignUp.js
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, addDoc } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyBDCeIg63-MQ8PT6QQOQff1pvfe72Uyhqk",

    authDomain: "formstore-99a0f.firebaseapp.com",
    
    projectId: "formstore-99a0f",
    
    storageBucket: "formstore-99a0f.appspot.com",
    
    messagingSenderId: "808560656431",
    
    appId: "1:808560656431:web:710754b550d55718db86da",
    
    measurementId: "G-VZQFPDVX9K"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

const schema = z.object({
  username: z.string().nonempty("Username is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm Password must be at least 6 characters long"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"], // path of error
});

function SignUp() {
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, data.email, data.password);
      await addDoc(collection(db, 'users'), {
        username: data.username,
        email: data.email,
        uid: userCredential.user.uid
      });
      navigate('/main');
    } catch (error) {
      console.error("Error signing up: ", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <h2 className="text-3xl font-bold mb-6">Sign Up</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Username</label>
          <input {...register("username")} className="w-full mt-1 p-2 border rounded" />
          {errors.username && <p className="text-red-600">{errors.username.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input {...register("email")} className="w-full mt-1 p-2 border rounded" />
          {errors.email && <p className="text-red-600">{errors.email.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Password</label>
          <input type="password" {...register("password")} className="w-full mt-1 p-2 border rounded" />
          {errors.password && <p className="text-red-600">{errors.password.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirm Password</label>
          <input type="password" {...register("confirmPassword")} className="w-full mt-1 p-2 border rounded" />
          {errors.confirmPassword && <p className="text-red-600">{errors.confirmPassword.message}</p>}
        </div>
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Sign Up</button>
      </form>
    </div>
  );
}

export default SignUp;

