import BaseRouter from "./base";

class HashRouter extends BaseRouter{
    constructor(list) {
        super(list);
        this.handle()
        let _this = this;
        window.addEventListener('hashchange',e => {
            this.handle(_this.getState())
        })
    }

    handle(){
       this.render(this.getState());
    }

    getUrl(path){
        let href = window.location.href;
        const i = href.indexOf('#');
        const base = i >= 0 ? href.slice(0, i) : href;
        return `${base}#${path}`;
    }


    getState(){
        const hash = window.location.hash;
        return hash ? hash.slice(1) : '/';
    }

    push(path){
        window.location.hash = path;
    }

    replace(path){
        window.location.replace(this.getUrl(path))
    }

    go(num){
        window.go(num);
    }
}