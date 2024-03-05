import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { addDoc, collection } from 'firebase/firestore';
import { db, auth } from '../../config/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
export const EntryForm = () => {

  const [ user ] = useAuthState(auth);

  const schema = yup.object().shape({
    description: yup.string().max(20).required('you must add description'),
    amount: yup.number().min(1,"amount should be positive").required('you must enter amount')
  });

  const { register, handleSubmit, formState: { errors },  } = useForm({
    resolver: yupResolver(schema),
  });

  const postsRef = collection(db, 'Posts');

  const onCreatePost = async (data) => {

    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      date: new Date(),
      userId: user?.uid,
    });
  }
  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder="description" {...register("description")} />
      <p> {errors.description?.message}</p>
      <input  type='number' placeholder="amount" {...register("amount")} />
      <p> {errors.amount?.message}</p>
      <input type="submit" />
    </form>
  );
}
