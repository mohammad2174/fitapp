import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { InertiaLink } from '@inertiajs/inertia-react';
import { usePage } from '@inertiajs/inertia-react';
import Layout from './../../Shared/Layout';
import TextInput from './../../Shared/TextInput';

export default (props) => {
    const { auth } = usePage().props
    const leadProp = props.leadProp;
    const packages = props.packages;
    const lead = leadProp;
    const reminders = lead.reminders;

    const [values, setValues] = useState({
        id:leadProp.id,
        name:leadProp.name || '',
        email:leadProp.email || '',
        phone:leadProp.phone || '',
        dob:leadProp.dob || '',
        interested_package:leadProp.interested_package || '',
    });

     async function handleSubmit(e) {
        e.preventDefault()
        let response = await Inertia.post('/leads/update', values)
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
            <div className="container">
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='flex-lg-row'><InertiaLink className='float-left text-decoration-none' href='/leads/list'>Leaders</InertiaLink>
                        <span className="breadcrumb-sep">/</span>
                            Lead details
                        </h1>
                    </div>
                </div>
            <div className="card mt-1 mr-1 ml-1">
                <div className="card-header">Lead details</div>
                <div className='card-body'>
                    <div className='container'>
                        <form onSubmit={handleSubmit}>
                            <div className='row'>
                                <div className='col-md-6'>
                                    <TextInput className='form-group'
                                               label='Name'
                                               name='name'
                                               type='text'
                                               placeholder='Enter name'
                                               id='name'
                                               tabIndex='1'
                                               onChange={handleChange}
                                               value={values.name}
                                    />

                                    <TextInput className='form-group'
                                               label='Phone'
                                               name='phone'
                                               type='text'
                                               placeholder='Enter phone'
                                               id='phone'
                                               tabIndex='3'
                                               onChange={handleChange}
                                               value={values.phone}
                                    />
                                    <div className="form-group">
                                        <label htmlFor="interested_package">Interested package</label>
                                        <select value={values.interested_package} name="interested_package" id="interested_package" className="form-control" onChange={handleChange} tabIndex='5'>
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
                                    {/*           name='interested_package'*/}
                                    {/*           type='text'*/}
                                    {/*           placeholder='Enter the package interested in'*/}
                                    {/*           id='ip'*/}
                                    {/*           tabIndex='5'*/}
                                    {/*           onChange={handleChange}*/}
                                    {/*           value={values.interested_package}*/}
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
                                               onChange={handleChange}
                                               value={values.dob}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6"><button className="btn btn-success mr-1">Save</button>
                                    <InertiaLink className='btn btn-warning' href={route('lead.list')}>Back</InertiaLink>
                                </div>
                                <div className="col-md-6">
                                    <InertiaLink className='btn btn-success float-right' href={route('lead.subscribe', {lead})}>Make subscriber</InertiaLink>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
                <div className="row">
                    <div className="col-md-12">
                        {(leadProp.reminders.length > 0 ) ?
                            <div className="card  mt-3 mr-1 ml-1">
                                <div className="card-header">Lead reminders</div>
                                <div className="card-body">
                                    <ul className="list-group list-group-flush">
                                        {reminders.map(({ id, reminder, reminder_data, status }) => {
                                            return (
                                        <li className="list-group-item list-group-item-action" key={id}>
                                            <InertiaLink href={route('reminder.view', [lead,id])} className="text-decoration-none">
                                                <div className="row">
                                                    <div className="col-md-6">{reminder}</div>
                                                    <div className="col-md-2">{reminder_data}</div>
                                                    <div className="col-md-2"><strong>{status}</strong></div>
                                                    <div className="w-2" style={{width:'2%'}}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" className='arrow-icon'>
                                                            <polygon points="12.95 10.707 13.657 10 8 4.343 6.586 5.757 10.828 10 6.586 14.243 8 15.657 12.95 10.707" />
                                                        </svg>
                                                    </div>
                                                </div>
                                            </InertiaLink>
                                        </li>
                                            );
                                        })}
                                    </ul>
                                </div>
                            </div>
                            :
                            <div className="card  mt-3 mr-1 ml-1">
                                <div className="card-header">Lead reminders</div>
                                <div className="card-body">
                                    <InertiaLink href={route('reminder.add', {lead})} className="btn btn-success">Add new reminder</InertiaLink>
                                </div>
                            </div>
                        }
                    </div>
                </div>
            </div>
        </Layout>
    );
};
