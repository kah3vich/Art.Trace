import { useStore } from '@nanostores/react';
import Link from 'next/link';
import { useEffect } from 'react';
import { TUser, users } from '../store/users';

const User = () => {
	const storeUser: TUser[] = useStore(users);

	useEffect(() => {
		console.log('storeUser    ', storeUser);
	}, [storeUser]);

	return (
		<>
			{storeUser.map(el => (
				<div key={el.id}>{el.name}</div>
			))}
			<hr />
			<p>{storeUser[0]?.name}</p>
			<Link href='/' passHref>
				back
			</Link>
		</>
	);
};

export default User;
