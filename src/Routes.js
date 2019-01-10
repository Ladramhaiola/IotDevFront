import React from 'react';
import { Switch } from "react-router-dom";
import Home from "./Home";
import Login from "./Login";
import Applied from "./Routing/AppliedRoute";
import Authenticated from "./Routing/AppliedRoute";
import Unauthenticated from "./Routing/UnauthenticatedRoute";

export default ({ childProps }) =>
    <main>
        <Switch>
            <Applied exact path="/" component={Home} props={childProps}/>
            <Unauthenticated exact path="/login" component={Login} props={childProps} />
        </Switch>
    </main>