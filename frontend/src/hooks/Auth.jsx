import { useContext } from 'react';
import { AuthContext } from '../context/Contexts';

const useAuth = () => useContext(AuthContext);

export default useAuth;