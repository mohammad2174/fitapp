import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import Layout from './../../Shared/Layout';
import Pagination from './../../Shared/Pagination';
import SearchFilter from './../../Shared/SearchFilter';

export default (props) => {
const leads  = props.leads.data;
const pckg = props.packages;
const page = usePage();
const links = page.props.leads.links;
const { auth } = usePage().props;

    return (
        <Layout>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='float-left'>Leaders</h1>
                        <InertiaLink className='float-right btn btn-primary' href='/leads/add'>Add Lead</InertiaLink>
                    </div>
                </div>
                <SearchFilter props={pckg} />
                <div className='row'>
                    <div className='col-md-12 table-responsive'>
                        <table className="table table-bordered bg-white">
                            <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone number</th>
                                <th>Age</th>
                                <th>Package</th>
                                <th>Added On</th>
                                <th>Details</th>
                            </tr>
                            </thead>
                            <tbody>
                            {leads.map(
                                ({ id, name, email, phone, age, interested_package, created_at }) => (
                                    <tr key={id}>
                                        <td>
                                            {id}
                                        </td>
                                        <td>
                                            {name}
                                        </td>
                                        <td>
                                            {email}
                                        </td>
                                        <td>
                                            {phone}
                                        </td>
                                        <td>
                                            {age}
                                        </td>
                                        <td>
                                            {interested_package}
                                        </td>
                                        <td>
                                            {created_at}
                                        </td>
                                        <td>
                                            <InertiaLink href={route('lead.view', id)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 30 30" className='arrow-icon'>
                                                    <polygon points="12.95 10.707 13.657 10 8 4.343 6.586 5.757 10.828 10 6.586 14.243 8 15.657 12.95 10.707" />
                                                </svg>
                                            </InertiaLink>
                                        </td>
                                    </tr>
                                )
                            )}
                            </tbody>
                        </table>
                    </div>
                </div>
                <Pagination links={links} />
            </div>
        </Layout>
    );
};
