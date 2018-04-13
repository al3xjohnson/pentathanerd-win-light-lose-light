import * as React from 'react';
import { Route } from 'react-router-dom';
import { Layout } from './views/landmarks/Layout';
import { Home } from './views/home/Home';

export const routes = <Layout>
    <Route exact path='/' component={ Home } />
</Layout>;
