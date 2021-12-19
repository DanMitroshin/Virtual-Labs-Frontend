import React from "react";
import {Route, Switch, Redirect} from 'react-router-dom';
import {MAIN_URL} from "../constants";
import AboutPage from "../pages/AboutPage";
import ProjectsPage from "../pages/ProjectsPage";
import Profile from "../pages/Profile";
import ExampleProject from "../pages/Projects/ExampleProject";
import CrosSolverProject from "../pages/Projects/CrosSolver";
import EnLstSolverProject from "../pages/Projects/EnLstSolver";
import GasDynamicsProject from "../pages/Projects/GasDynamics";
import HplProject from "../pages/Projects/HplSolver";

const MainRouter = () => {
        return <Switch>
                <Route exact path={MAIN_URL.ABOUT_US} component={AboutPage}/>
                <Route exact path={MAIN_URL.PROJECTS} component={ProjectsPage}/>
                <Route exact path={MAIN_URL.PROFILE} component={Profile}/>
                <Route exact path={MAIN_URL.PROJECTS_LIST.EXAMPLE}
                       component={ExampleProject}/>
                <Route exact path={MAIN_URL.PROJECTS_LIST.CROS_SOLVER}
                       component={CrosSolverProject}/>
                <Route exact path={MAIN_URL.PROJECTS_LIST.EN_LST_SOLVER}
                       component={EnLstSolverProject}/>
                <Route exact path={MAIN_URL.PROJECTS_LIST.GAS_DYNAMICS}
                       component={GasDynamicsProject}/>
                <Route exact path={MAIN_URL.PROJECTS_LIST.HPL_SOLVER}
                       component={HplProject}/>


                <Redirect to={MAIN_URL.PROJECTS}/>
        </Switch>
};


export default MainRouter;
