/**
 * First we will load all of this project's JavaScript dependencies which
 * includes React and other helpers. It's a great starting point while
 * building robust, powerful web applications using React + Laravel.
 */

require('./bootstrap');

/**
 * Next, we will create a fresh React component instance and attach it to
 * the page. Then, you may begin adding components to this application
 * or customize the JavaScript scaffolding to fit your unique needs.
 */

require('./components/Example');

import { App } from '@inertiajs/inertia-react'
import React from 'react'
import { render } from 'react-dom'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
axios.interceptors.request.use(function (config){
    NProgress.start();
    NProgress.set(0.2)
    return config;
}, function (error){
    console.error(error)
    return Promise.reject(error);
});
axios.interceptors.response.use(function (response){
    NProgress.inc()
    NProgress.done();
    return response;
}, function (error){
    console.error(error)
    return Promise.reject(error);
});
$(document).ajaxComplete(function (event,request,settings){
    console.log(2);
    NProgress.done();
});
$(document).ajaxStart(function (){
    NProgress.start();
});


const el = document.getElementById('app')

if(app) {
    render(
        <App
            initialPage={JSON.parse(el.dataset.page)}
            resolveComponent={name => require(`./Pages/${name}`).default}
        />,
        el
    )
}

