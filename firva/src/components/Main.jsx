// src/components/Main.js
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const db = getFirestore();
const auth = getAuth();

const schema = z.object({
  name: z.string().nonempty("Name is required"),
  age: z.number().positive().int("Age must be a positive integer"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

function Main() {
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(schema)
  });

  const onSubmit = async (data) => {
    try {
      await addDoc(collection(db, 'users'), data);
      alert('User data saved successfully!');
    } catch (error) {
      console.error("Error saving user data: ", error);
    }
  };

  const [searchResult, setSearchResult] = useState(null);
  const [searchName, setSearchName] = useState("");

  const handleSearch = async () => {
    const q = query(collection(db, 'users'), where('name', '==', searchName));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      setSearchResult(querySnapshot.docs[0].data());
    } else {
      setSearchResult(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-md bg-white p-8 rounded shadow-md">
        <div className="mb-4">
          <label className="block text-gray-700">Name</label>
          <input {...register("name")} className="w-full mt-1 p-2 border rounded" />
          {errors.name && <p className="text-red-600">{errors.name.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Age</label>
          <input type="number" {...register("age", { valueAsNumber: true })} className="w-full mt-1 p-2 border rounded" />
          {errors.age && <p className="text-red-600">{errors.age.message}</p>}
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
        <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Submit</button>
      </form>

      <div className="mt-10 w-full max-w-md bg-white p-8 rounded shadow-md">
        <h2 className="text-xl font-bold mb-4">Search User by Name</h2>
        <input
          type="text"
          value={searchName}
          onChange={(e) => setSearchName(e.target.value)}
          className="w-full mt-1 p-2 border rounded mb-4"
        />
        <button onClick={handleSearch} className="w-full p-2 bg-green-500 text-white rounded">Search</button>
        {searchResult && (
          <div className="mt-4">
            <p><strong>Name:</strong> {searchResult.name}</p>
            <p><strong>Age:</strong> {searchResult.age}</p>
            <p><strong>Email:</strong> {searchResult.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Main;
