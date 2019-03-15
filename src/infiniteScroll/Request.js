import "idempotent-babel-polyfill";
import { request, regexp } from "./config.json";

class NextContent {
    constructor(config) {
        this.config = Object.assign(request, config);
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
            const REG_EXP = new RegExp(regexp, "g");
            const URL = url.match(REG_EXP);
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
        const RESPONSE = { success: false };
        try {
            if (active) {
                const REQUEST = await fetch(url);
                const DATA = await REQUEST.json();
                if (DATA._type === type) {
                    Object.assign(RESPONSE, { data: DATA, success: true });
                }
            }
            return RESPONSE;
        } catch (Error) {
            return RESPONSE;
        }
    }
}

export default NextContent;
