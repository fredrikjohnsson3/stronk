export const getHrefParams = () => {
    return window.location.href
        .substring(window.location.href.indexOf('?') + 1)
        .split('&')
        .reduce(function (initial: { [key: string]: string }, item) {
            if (item) {
                var parts = item.split('=');
                initial[parts[0]] = decodeURIComponent(parts[1]);
            }
            return initial;
        }, {});
};
