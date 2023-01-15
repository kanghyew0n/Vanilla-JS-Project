// console.log("here");

// import { addStationName } from "../util/station.js";

const getItem = (e) => document.querySelector(e);
const getAllItem = (e) => document.querySelectorAll(e);

// log()

const $header = getItem("#header");
const $buttons = getAllItem("#button");
const $state = getItem("#state");

$buttons.forEach((button) => {
    button.addEventListener("click", () => {
        const pathname = button.className;
        addRouter(pathname);
        renderHTML();
    });
});

const addRouter = (pathname) => {
    window.history.pushState(
        { router: pathname },
        "",
        `/js-subway/index.html/${pathname}`
    );
};

const renderHTML = () => {
    $state.innerHTML = history.state.router;
};
