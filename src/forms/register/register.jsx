import React, { useState, useEffect } from 'react';

import { TextField, Button } from '@material-ui/core';
import './register.styles.scss';
import * as Yup from 'yup';
import './register.styles.scss';
import { register } from '../../redux/actions/actions';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ProgressBar from '../../components/progress-bar/progress-bar';
import { clearErrors } from '../../redux/actions/actions';
import faker from 'faker';

const Register = () => {
	const isLoading = useSelector((state) => state.isLoading);
	const dispatch = useDispatch();
	const history = useHistory();
	let apiError = useSelector((state) => state.apiError);

	useEffect(() => {
		dispatch(clearErrors());
	}, []);

	const [ errors, setErrors ] = useState({
		name: '',
		email: '',
		email: '',
		password: '',
		confirmPassword: '',
		apiError
	});

	const [ formValues, setFormValues ] = useState({
		first_name: 'Bruce',
		last_name: 'Wayne',
		email: faker.internet.email(),
		pin: '1124',
		password: 'development123',
		confirmPassword: 'development123'
	});

	const formSchema = Yup.object().shape({
		first_name: Yup.string().required('Please enter your name'),
		last_name: Yup.string().required('Please enter your name'),
		pin: Yup.string().required('Please enter your pin'),
		email: Yup.string().required('Please enter your email').min(4, 'Must be longer than 4 characters'),
		password: Yup.string()
			.required('Required')
			.min(10, 'Password must be at least 10 characters long.')
			.max(128, 'Password cannot exceed 128 characters'),
		confirmPassword: Yup.mixed()
			.oneOf([ formValues.password ], 'passwords must match')
			.required('Please confirm your password')
	});

	const handleChange = (e) => {
		e.persist();

		if (apiError) {
			dispatch(clearErrors());
		}

		Yup.reach(formSchema, e.target.name)
			.validate(e.target.value)
			.then((valid) => {
				setErrors({
					...errors,
					[e.target.name]: ''
				});
			})
			.catch((err) => {
				setErrors({
					...errors,
					[e.target.name]: err.message
				});
			});

		setFormValues({
			...formValues,
			[e.target.name]: e.target.value
		});
	};

	const registerUser = (e) => {
		e.preventDefault();

		const user = {
			first_name: formValues.first_name,
			last_name: formValues.last_name,
			email: formValues.email,
			password: formValues.password,
			pin: formValues.pin
		};

		formSchema.isValid(formValues).then((valid) => {
			if (valid) {
				dispatch(register(user, history));
			} else if (!valid) {
				console.log('Not valid');
				dispatch({ type: 'ERROR', payload: { error: 'Please Fill Out All Fields' } });
			}
		});
	};

	return (
		<div>
			<form className="form-container" onSubmit={registerUser}>
				<div className="text-field-containers">
					<div className="name-container" style={{display: 'flex', gridGap: '1rem'}}>
						<TextField
							value={formValues.first_name}
							onChange={handleChange}
							type="text"
							label="First Name"
							name="first_name"
							required
						/>
						<TextField
							value={formValues.last_name}
							onChange={handleChange}
							type="text"
							label="Last Name"
							name="last_name"
							required
						/>
					</div>
					{errors.email.length ? (
						<TextField
							value={formValues.email}
							onChange={handleChange}
							type="email"
							label="email"
							name="email"
							required
							error
							helperText={errors.email}
						/>
					) : (
						<TextField
							value={formValues.email}
							onChange={handleChange}
							type="email"
							label="email"
							name="email"
							required
						/>
					)}

					{errors.password.length ? (
						<TextField
							value={formValues.password}
							onChange={handleChange}
							type="password"
							label="Password"
							name="password"
							required
							error
							helperText={errors.password}
						/>
					) : (
						<TextField
							value={formValues.password}
							onChange={handleChange}
							type="password"
							label="Password"
							name="password"
							required
						/>
					)}

					{errors.confirmPassword.length ? (
						<TextField
							value={formValues.confirmPassword}
							onChange={handleChange}
							type="password"
							label="confirm password"
							name="confirmPassword"
							required
							error
							helperText={errors.confirmPassword}
						/>
					) : (
						<TextField
							value={formValues.confirmPassword}
							onChange={handleChange}
							type="password"
							label="confirm password"
							name="confirmPassword"
							required
						/>
					)}
					<TextField
						value={formValues.pin}
						onChange={handleChange}
						type="text"
						label="PIN"
						name="pin"
						required
					/>

					{errors.password.length || errors.confirmPassword.length || errors.email.length ? (
						<Button disabled type="submit" color="secondary" variant="outlined" id="submit-btn">
							Register
						</Button>
					) : (
						<div className="register-btn">
							<Button
								onClick={() => dispatch(clearErrors())}
								type="submit"
								color="secondary"
								variant="outlined"
								id="submit-btn"
							>
								Register
							</Button>
							{apiError && <span>{apiError}</span>}
						</div>
					)}
				</div>
			</form>
			{isLoading && <ProgressBar />}
		</div>
	);
};

export default Register;
