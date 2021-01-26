export default {
    methods: {
        generateRouterPath(el) {
            return `/aktualnosci/${el.title}`;
        },
        getLogo(el) {
            const { API_ADDRESS } = this;
            return `${API_ADDRESS}/api/events/single/${el.id}/logo`;
        },
        generateDate(item) {
            return item.createdAt.slice(0, 10);
        }
    }
};
