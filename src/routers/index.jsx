import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import {MAIN_URL} from "../constants";
import Block1Page from "../pages/Block1Page";
import AboutPage from "../pages/AboutPage";
import ProjectsPage from "../pages/ProjectsPage";
import Profile from "../pages/Profile";
import ExampleProject from "../pages/Projects/ExampleProject";

const MainRouter = () => {
        return <Switch>
                <Route exact path={MAIN_URL.ABOUT_US} component={AboutPage}/>
                <Route exact path={MAIN_URL.PROJECTS} component={ProjectsPage}/>
                <Route exact path={MAIN_URL.PROFILE} component={Profile}/>
                <Route exact path={MAIN_URL.PROJECTS_LIST.EXAMPLE}
                       component={ExampleProject}/>

                <Redirect to={MAIN_URL.BLOCK_1}/>
        </Switch>
};


export default MainRouter;
