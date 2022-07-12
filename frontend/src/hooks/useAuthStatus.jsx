import { useState, useEffect, useContext } from 'react';
import { GlobalContext } from '../context/GlobalState';

export const useAuthStatus = () => {
	const [loggedIn, setLoggedIn] = useState(false);
	const [checkingStatus, setCheckingStatus] = useState(true);
	const { user } = useContext(GlobalContext);

	useEffect(() => {
		if (user) {
			setLoggedIn(true);
		} else {
			setLoggedIn(false);
		}
		setCheckingStatus(false);
	}, [user]);

	return { loggedIn, checkingStatus };
};
