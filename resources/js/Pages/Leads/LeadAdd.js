import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import {InertiaLink, usePage} from "@inertiajs/inertia-react";
import Layout from './../../Shared/Layout';
import TextInput from './../../Shared/TextInput';

export default (props) => {
    const packages = props.packages;
    const error = usePage();
    const { auth } = usePage().props
    const errors = error.props.errors;

    const [values, setValues] = useState({
        id: auth.user.id,
        fname: '',
        email: '',
        phone: '',
        dob: '',
        package:packages[0].name || '',
    });

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await Inertia.post('/leads/save', values)
    }

    function handleChange(e) {
        const key = e.target.name;
        const value = e.target.value
        setValues(values => ({
            ...values,
            [key]: value,
        }))
    }

    return (
        <Layout>
            <div className='container'>
                <form onSubmit={handleSubmit}>
                    <div className='row'>
                        <div className='col-md-6'>
                            <TextInput className='form-group'
                                       label='Name'
                                       name='fname'
                                       type='text'
                                       placeholder='Enter name'
                                       id='name'
                                       tabIndex='1'
                                       errors={errors.fname}
                                       onChange={handleChange}
                                       value={values.fname}
                            />
                            <TextInput className='form-group'
                                       label='Phone'
                                       name='phone'
                                       type='text'
                                       placeholder='Enter phone'
                                       id='phone'
                                       tabIndex='3'
                                       errors={errors.phone}
                                       onChange={handleChange}
                                       value={values.phone}
                            />
                            <div className="form-group">
                                <label htmlFor="package">Interested package</label>
                                <select value={values.package} name="package" id="package" className="form-control" onChange={handleChange} tabIndex='5'>
                                    {packages.map(({ id, name, number_of_days, amount }) => {
                                        return (
                                            <option key={id} value={name}>
                                                {name} ({number_of_days} days for {amount})
                                            </option>
                                        );
                                    })}
                                </select>
                            </div>
                            {/*<TextInput className='form-group'*/}
                            {/*           label='Interested package'*/}
                            {/*           name='package'*/}
                            {/*           type='text'*/}
                            {/*           placeholder='Enter the package interested in'*/}
                            {/*           id='ip'*/}
                            {/*           tabIndex='5'*/}
                            {/*           onChange={handleChange}*/}
                            {/*           value={values.package}*/}
                            {/*/>*/}
                        </div>
                            <div className="col-md-6">
                                <TextInput className='form-group'
                                           label='Email address'
                                           name='email'
                                           type='email'
                                           placeholder='Enter email'
                                           id='email'
                                           tabIndex='2'
                                           errors={errors.email}
                                           onChange={handleChange}
                                           value={values.email}
                                />
                                <TextInput className='form-group'
                                           label='Birthday'
                                           name='dob'
                                           type='date'
                                           placeholder='Enter dob'
                                           id='dob'
                                           tabIndex='4'
                                           errors={errors.dob}
                                           onChange={handleChange}
                                           value={values.dob}
                                />
                            </div>
                        </div>
                   <div className="row">
                        <div className="col-md-12"><button className="btn btn-success mr-1">Save</button>
                            <InertiaLink className='btn btn-warning' href={route('lead.list')}>Back</InertiaLink>
                        </div>
                   </div>
                </form>
            </div>
        </Layout>
    );
};
