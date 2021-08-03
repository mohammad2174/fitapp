import React, { useState } from 'react';
import TextInput from './../../Shared/TextInput';
import {InertiaLink, usePage} from "@inertiajs/inertia-react";
import Layout from './../../Shared/Layout';
import {Inertia} from "@inertiajs/inertia";

export default (props) => {
    const packages = props.activePackages
    const error = usePage();
    const { auth } = usePage().props
    const errors = error.props.errors;

    const [values, setValues] = useState({
        name: '',
        amount: '',
        number_of_days: '',
    });

    async function handleSubmit(e) {
        e.preventDefault()
        let response = await Inertia.post('/packages/save', values)
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
                <div className='row mb-3'>
                    <div className='col-md-12'>
                        <h1 className='float-left'>Packages</h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <div className='card'>
                            <div className='card-header'>List of packages</div>
                            <div className="card-body">
                                {(packages.length !==0) ? (
                                <ul className="list-group list-group-flush">
                                    {packages.map(({ id, name, number_of_days, amount }) => {
                                        return (
                                            <li className="list-group-item" key={id}>
                                                <InertiaLink className={'text-decoration-none'} href={route('package.view', id)}>{name} ({number_of_days} days)</InertiaLink>
                                                <span className="float-right"><strong>{amount}</strong></span>
                                            </li>
                                        );
                                    })}
                                </ul>
                                    ) : (<div>No packages added yet.</div>) }
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        {auth.user.id !== 1 ? ('') : (
                            <div className="card">
                            <div className="card-header">Add new package</div>
                            <div className="card-body">
                                <form onSubmit={handleSubmit}>
                                            <TextInput className='form-group'
                                                       label='Name'
                                                       name='name'
                                                       type='text'
                                                       id='name'
                                                       errors={errors.name}
                                                       onChange={handleChange}
                                                       value={values.name}
                                            />
                                            <TextInput className='form-group'
                                                       label='Amount'
                                                       name='amount'
                                                       type='text'
                                                       id='amount'
                                                       errors={errors.amount}
                                                       onChange={handleChange}
                                                       value={values.amount}
                                            />
                                            <TextInput className='form-group'
                                                       label='Number of days'
                                                       name='number_of_days'
                                                       type='number'
                                                       id='number_of_days'
                                                       errors={errors.number_of_days}
                                                       onChange={handleChange}
                                                       value={values.number_of_days}
                                            />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <button className="btn btn-success">Save</button>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        )}
                    </div>
                </div>
            </div>
        </Layout>
    );
};
