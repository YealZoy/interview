const ELEMENT = document.querySelector('#page');

class BaseRouter {
    constructor(list) {
        this.list = list;
    }

    render(state){
        let routeItem = this.list.find(item => item.path == state);
        routeItem = routeItem ? routeItem : this.list.find(item => item.path == '*');
        ELEMENT.innerHTML = routeItem.component;
    }
}

export default BaseRouter;