import { useAuth } from '@/hooks/Auth';
import React from 'react';


const MyAddedPets = () => {
  const currentUser=useAuth()
  return <div>My Added Pets</div>;
};

export default MyAddedPets;