export class PageButtons {
    get get() {
        return browser.$('button*=get');
    }

    get binary() {
        return browser.$('button*=binary');
    }

    get getAsJsonp() {
        return browser.$('button*=get as jsonp');
    }

    get post() {
        return browser.$('button*=post');
    }
}
