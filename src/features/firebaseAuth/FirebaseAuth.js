import React from 'react';
import { useSelector } from 'react-redux';
import { selectLogged } from './firebaseAuthSlice';
import Cargando from '../../components/Cargando'

export const FirebaseAuth = ({ children }) => {
  const logged = useSelector(selectLogged);

  return (
    <div>
    {children}
    </div>
  );
}
