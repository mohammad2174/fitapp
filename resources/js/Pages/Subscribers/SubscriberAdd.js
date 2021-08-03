import React, { useState } from 'react';
import { Inertia } from '@inertiajs/inertia';
import { usePage } from '@inertiajs/inertia-react';
import { InertiaLink } from '@inertiajs/inertia-react';
import Layout from './../../Shared/Layout';
import TextInput from './../../Shared/TextInput';
import moment from "moment";

export default (props) => {
    const { auth } = usePage().props;
    const lead = props.lead;
    const packages = props.packages;
    const [values, setValues] = useState({
        user_id: auth.user.id,
        lead_id: lead.id,
        name: lead.name || '',
        amount:usePaymentAmount || '',
        renewal_date:subscriptionEndsDate || '',
        interested_package: lead.interested_package || '',
    });
    const userPackage = packages.filter(pckg => {
        return pckg.name === values.interested_package;
    })[0];
    const subscriptionEndsDate = moment().add(userPackage.number_of_days, 'days').format('YYYY-MM-DD');
    const usePaymentAmount = userPackage.amount;
    values.package_id = userPackage.id;
    values.amount = usePaymentAmount;
    values.renewal_date = subscriptionEndsDate;
    async function handleSubmit(e) {
        e.preventDefault();
        let response = await Inertia.post('/leads/subscribe/save', values)
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
                            New subscriber
                        </h1>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                <div className="card">
                    <div className="card-body">
                        <div className="card mt-1 mr-1 ml-1">
                            <div className="card-header">Lead details</div>
                            <div className='card-body'>
                                <div className='container'>
                                    <form onSubmit={handleSubmit}>
                                                <TextInput className='form-group'
                                                           label='Name'
                                                           name='name'
                                                           type='text'
                                                           id='name'
                                                           tabIndex='1'
                                                           disabled
                                                           onChange={handleChange}
                                                           value={values.name}
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
                                                <TextInput className='form-group'
                                                           label='renewal_date'
                                                           name='renewal_date'
                                                           type='date'
                                                           id='date'
                                                           tabIndex='4'
                                                           disabled
                                                           onChange={handleChange}
                                                           value={values.renewal_date}
                                                />
                                        <TextInput className='form-group'
                                                   label='Subscription price'
                                                   name='amount'
                                                   type='text'
                                                   id='amount'
                                                   tabIndex='4'
                                                   disabled
                                                   onChange={handleChange}
                                                   value={values.amount}
                                        />
                                        <div className="row">
                                            <div className="col-md-12"><button className="btn btn-success mr-1">Save</button>
                                                <InertiaLink className='btn btn-warning' href={route('lead.list')}>Back</InertiaLink>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};
