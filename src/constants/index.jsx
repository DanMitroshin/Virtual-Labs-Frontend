export const C_USER = {
    CHANGE_DATA: "CHANGE_DATA",
    CHANGE_AVATAR: "CHANGE_AVATAR",
    ADD_USER: "ADD_USER",
    REMOVE_USER: "REMOVE_USER"
};

const PROJECTS = "/projects"

export const MAIN_URL = {
    BLOCK_1: "/block1",
    BLOCK_2: "/block2",
    PROJECTS,
    PROFILE: "/profile",
    ABOUT_US: "/about_us",
    LANDING: "/",
    NOT_FOUND: "/notfound",

    PROJECTS_LIST: {
        EXAMPLE: PROJECTS + "/example",
        CROS_SOLVER: PROJECTS + "/cros_solver",
        EN_LST_SOLVER: PROJECTS + "/en_lst_solver",
        GAS_DYNAMICS: PROJECTS + "/gas_dynamics_1d",
        HPL_SOLVER: PROJECTS + "/hpl_solver",
    }
};

export const DB_URL = {
    URL: "http://127.0.0.1:5000", //"http://localhost:8080",
    USERS: "users"
};

export const COOKIES_NAMES = {
    TOKEN: "token",
    ROLE: "role",
    STATUS: "status",
    USER_NAME: "user_name",
    ACCEPT: "accept"
}