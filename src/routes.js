import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './components/app';
import Dashboard from './pages/dashboard';

import Project from './pages/project';
import ProjectClientView from './components/projects/project-client-view';
import ProjectsView from './components/projects/projects-view';
import ProjectView from './components/projects/project-view';
import ProjectEdit from './components/projects/project-edit';

import Client from './pages/client';
import ClientView from './components/clients/client-view';
import ClientAdd from './components/clients/client-add';

import Supplier from './pages/supplier.jsx';
import SupplierView from './components/suppliers/supplier-view';
import SupplierAdd from './components/suppliers/supplier-add';
import ContactAdd from './components/suppliers/supplier-contact-add';
import ContactEdit from './components/suppliers/supplier-contact-edit';

import File from './pages/file';
import FileContainerAdd from './components/files/file-container-add';
import FileContainerView from './components/files/file-container-view';

import Admin from './pages/admin';
import AdminView from './components/admin/admin-view';
import UserAdd from './components/admin/user-add';
import UserEdit from './components/admin/user-edit';

import Registration from './pages/registration';

export default (
    <Route>
        <Route path="/" component={App}>
            <IndexRoute component={Dashboard} />
            <Route path="/projects" component={Project}>
                <IndexRoute component={ProjectsView} />
                <Route path="/projects/:id" component={ProjectView} />
                <Route path="/projects/clients/:token" component={ProjectClientView} />                
                <Route path="/projects/edit/:id" component={ProjectEdit} />
                <Route path="/project/add" component={ProjectEdit} />
                <Route path="/projects/files/:id" component={FileContainerView} />
                <Route path="/projects/files/add/:id" component={FileContainerAdd} id="ADD_PROJECT" />
            </Route>
            <Route path="/clients/:id" component={Client}>
                <IndexRoute component={ClientView} />
                <Route path="/clients/add/:id" component={ClientAdd} />
                <Route path="/clients/files/:id" component={FileContainerView} />
                <Route path="/clients/files/add/:id" component={FileContainerAdd} id="ADD_CLIENT" />
            </Route>
            <Route path="/suppliers/:id" component={Supplier}>
                <IndexRoute component={SupplierView} />
                <Route path="/suppliers/add/:id" component={SupplierAdd} />
                <Route path="/suppliers/contacts/:id" component={ContactEdit} />
                <Route path="/suppliers/contacts/add/:id" component={ContactAdd} />
            </Route>
            <Route path="/files/:id" component={File}>
                <IndexRoute component={FileContainerView} />
                <Route path="/files/add/:id" component={FileContainerAdd} />
            </Route>
            <Route path="/admin" component={Admin}>
                <IndexRoute component={AdminView} />
                <Route path="/admin/users/view/:id" component={UserEdit} />
                <Route path="/admin/users/add" component={UserAdd} />
            </Route>
        </Route>
        <Route path="/registration/:identity_code" component={Registration} />            
    </Route>
);