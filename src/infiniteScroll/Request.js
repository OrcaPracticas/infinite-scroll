import "idempotent-babel-polyfill";

class Request {
    constructor(config) {
        const INIT_CONFIG = {
            url: "",
            type: "ArticlePage",
            active: false,
        };
        this.config = Object.assign(INIT_CONFIG, config);
        return this.formatUrl.getNextContent();
    }

    /**
     * Build URL
     *
     * @return {Request} self Fluent interface.
     */
    get formatUrl() {
        const { url } = this.config;
        if (url) {
            const URL = url.match(/^(https?:\/\/)([a-z0-9-]){3,5}\.?([a-z0-9-])*\..[a-z0-9]{1,4}:?([0-9]){4,4}?\/?/g);
            const DOMAIN = (URL) ? URL[0] : "";
            if (DOMAIN) {
                const REDUX = DOMAIN.endsWith("/") ? "redux/" : "/redux/";
                this.config.url = url.replace(DOMAIN, `${DOMAIN}${REDUX}`);
                this.config.active = true;
            }
        }
        return this;
    }

    /**
     * Request for new data.
     *
     * @return {Promise}
     */
    getNextContent = async () => {
        const { url, active, type } = this.config;
        let request = { success: false };
        try {
            if (active) {
                const REQUEST = await fetch(url);
                const DATA = await REQUEST.json();
                if (DATA._type === type) {
                    request = {
                        success: true,
                        data: DATA,
                    };
                }
            }
            return request;
        } catch (Error) {
            return request;
        }
    }
}

export default Request;
