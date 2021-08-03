import React from 'react';
import { usePage } from '@inertiajs/inertia-react';
import Layout from './../../Shared/Layout';
import ReminderList from './ReminderList';

export default (props) => {
    const reminders = props.reminders;
    const { auth } = usePage().props

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <p>This is a dashboard, {auth.user.name}</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-4">
                    <ReminderList reminders={reminders}></ReminderList>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

