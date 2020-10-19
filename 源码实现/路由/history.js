import BaseRouter from "./base";

class HistoryRouter extends BaseRouter{
    constructor(list) {
        super(list);
        this.handler();
        window.addEventListener('popstate', e => {
            this.handler();
        });
    }

    handler() {
        this.render(this.getState());
    }
    getState() {
        const path = window.location.pathname;
        return path ? path : '/';
    }

    push(){
        history.pushState(null, null, path);
        this.handler();
    }

    replace(){
        history.replaceState(null, null, path);
        this.handler();
    }

    go(){
        window.history.go(n);
    }

}