import { useState } from 'react';

export default initialVal => {
	const [value, setvalue] = useState(initialVal);

	const handleChange = e => {
		setvalue(e.target.value);
	};

	const reset = () => {
		setvalue('');
	};

	return [value, handleChange, reset];
};
