import { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';

type TypeOut = {
	ref: any;
	isShown: boolean;
	setIsShown: Dispatch<SetStateAction<boolean>>;
};

export const useOutside = (initialIsVisible: boolean): TypeOut => {
	const [isShown, setIsShown] = useState(initialIsVisible);
	const ref = useRef<HTMLElement>(null);

	const handleClickOutside = (event: any) => {
		if (ref.current && !ref.current.contains(event.target)) {
			setIsShown(false);
		}
	};

	useEffect(() => {
		document.addEventListener('click', handleClickOutside, true);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
		};
	});

	return { ref, isShown, setIsShown };
};
