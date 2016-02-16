class Util {
// module.exports = {
    uuid() {
        let i;
        let random;
        let uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            /*eslint-disable */
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
            /*eslint-enable */
        }

        return uuid;
    }
    pluralize(count, word) { return count === 1 ? word : `${word}s`; }

    store(namespace, data) {
        const store = localStorage.getItem(namespace);
        if (arguments.length > 1) {
            return localStorage.setItem(namespace, JSON.stringify(data));
        }
        return (store && JSON.parse(store)) || [];

    }
}

export default new Util();
