import React, { useState } from 'react';
import { TextField, Button } from '@material-ui/core';
import './register.styles.scss'
import * as Yup from 'yup';
import './register.styles.scss'


const Register = () => {
    const [errors, setErrors] = useState({
        name: '',
        username: '',
        email: "",
        password: '',
        confirmPassword: ''
    })

    const [formValues, setFormValues] = useState({
        name: 'Isaiah',
        username: 'isaiah123',
        email: "Isaiahjfowler7@gmail.com",
        password: 'am_i_long_enough',
        confirmPassword: 'am_i_long_enough?'
    });

    const formSchema = Yup.object().shape({
        name: Yup.string().required('Please enter your name'),
        username: Yup.string().required('Please enter your username').min(4, "Must be longer than 4 characters"),
        email: Yup.string().email('Must be a valid email address.').required('Must include email address.'),
        password: Yup.string()
            .required('Required')
            .min(10, 'Password must be at least 10 characters long.')
            .max(128, "Password cannot exceed 128 characters"),
        confirmPassword: Yup.mixed()
            .oneOf([formValues.password], 'passwords must match')
            .required('Please confirm your password')
    });


    const handleChange = (e) => {
        e.persist();
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
        // formSchema.isValid(formValues).then((valid) => {
        //     if (valid) {
        //         dispatch(register(formValues, history))

        //     } else if (!valid) {
        //         dispatch({ type: 'ERROR', payload: { error: 'Please Fill Out All Fields' } });
        //     }
        // });

        const newUser = {
            name: formValues.name,
            username: formValues.username,
            password: formValues.password
        }

        console.log(newUser)

    };

    const clearForm = () => {
        setFormValues({
            username: '',
            password: ''
        });
    };
    return (
        <form className="form-container" onSubmit={registerUser}>
            <div className="text-field-containers">


                <TextField
                    value={formValues.name}
                    onChange={handleChange}
                    type="text"
                    label="Name"
                    name="name"
                    required
                />

                {
                    errors.username.length
                        ?
                        <TextField
                            value={formValues.username}
                            onChange={handleChange}
                            type="text"
                            label="Username"
                            name="username"
                            required
                            error
                            helperText={errors.username}
                        />
                        :
                        <TextField
                            value={formValues.username}
                            onChange={handleChange}
                            type="text"
                            label="Username"
                            name="username"
                            required
                        />
                }


                {/* {errors.email.length ?
                    <TextField
                        value={formValues.email}
                        onChange={handleChange}
                        type="text"
                        label="Email"
                        name="email"
                        required
                        error
                        helperText={errors.email}
                    />
                    :
                    <TextField
                        value={formValues.email}
                        onChange={handleChange}
                        type="text"
                        label="Email"
                        name="email"
                        required
                    />} */}

                {errors.password.length ?
                    <TextField
                        value={formValues.password}
                        onChange={handleChange}
                        type="password"
                        label="Password"
                        name="password"
                        required
                        error
                        helperText={errors.password}
                    /> :
                    <TextField
                        value={formValues.password}
                        onChange={handleChange}
                        type="password"
                        label="Password"
                        name="password"
                        required
                    />
                }

                {errors.confirmPassword.length ?
                    <TextField value={formValues.confirmPassword}
                        onChange={handleChange}
                        type="password"
                        label="confirm password"
                        name="confirmPassword"
                        required
                        error
                        helperText={errors.confirmPassword}
                    >

                    </TextField>

                    :

                    <TextField value={formValues.confirmPassword}
                        onChange={handleChange}
                        type="password"
                        label="confirm password"
                        name="confirmPassword"
                        required>
                    </TextField>

                }

                {errors.password.length || errors.confirmPassword.length || errors.username.length
                    ?
                    <Button disabled type="submit" color="secondary" variant="outlined" id='submit-btn'>
                        Register
                    </Button>
                    :
                    <Button type="submit" color="secondary" variant="outlined" id='submit-btn'>
                        Register
				    </Button>
                }

            </div>
        </form>
    );
};

export default Register;