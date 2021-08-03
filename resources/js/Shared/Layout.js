import React from 'react';
import { InertiaLink, usePage } from '@inertiajs/inertia-react';
import { Inertia } from '@inertiajs/inertia';
import axios from 'axios';
import FlashMessages from "./FlashMessages";

export default ({children}) => {
    const { auth } = usePage().props

    async function handleLogout(e) {
        // await axios.post('/logout', {});
        // window.location.href = "/";
        e.preventDefault();
        let response = await Inertia.post('/logout');
    }

    return (
        <div>
            <nav className="navbar navbar-expand-md navbar-light bg-white">
                <div className="container">
                    <InertiaLink className="navbar-brand" href="/">FitApp</InertiaLink>
                    <button className="navbar-toggler" type="button" data-toggle="collapse"
                            data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarSupportedContent">

                        <ul className="navbar-nav mr-auto">
                            <li className="nav-item dropdown">
                                <a id="navbarDropdownLeft" className="nav-link dropdown-toggle" href="#" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    Manage <span className="caret"></span>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdownLeft">
                                    <InertiaLink href="/leads/list" className='dropdown-item'>Leaders</InertiaLink>
                                    <InertiaLink href="/subscribe/list" className='dropdown-item'>Subscribers</InertiaLink>
                                    <InertiaLink href="/packages/list" className='dropdown-item'>Packages</InertiaLink>
                                </div>
                            </li>
                        </ul>


                        <ul className="navbar-nav ml-auto">

                            <li className="nav-item dropdown">
                                <a id="navbarDropdown" className="nav-link dropdown-toggle" href="#" role="button"
                                   data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                    {auth.user.name} <span className="caret"></span>
                                </a>

                                <div className="dropdown-menu dropdown-menu-right" aria-labelledby="navbarDropdown">
                                    <a className="dropdown-item" href="#" onClick={handleLogout}>Logout</a>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <main className="py-4">
                <FlashMessages />
                <article>{children}</article>
            </main>
        </div>
    );
};
