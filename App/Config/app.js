const config = {
    /**
     * @var VERSION
     * @description application current version
     */
    VERSION: require(__basedir + '/package.json').version,
    /**
     * @var PORT
     * @description application default port setup
     */
    PORT: parseInt(process.env.PORT, 10) || 3000,
    /**
     * @var IP
     * @description application default ip address
     */
    IP: process.env.IP || '0.0.0.0',
    /**
     * @var APIPREFIX
     * @description this is api end point url setup
     * @example api/v1
     */
    APIPREFIX: '/api/v1',
    /**
     * @var REQUESTFILTER
     * @description Filter permitted request
     * @default on
     */
    REQUESTFILTER: 'off',
    /**
     * @var VALIDAGENT
     * @description accepted request agent
     * @default ['sedori-mobile', 'sedori-web']
     */
    VALIDAGENT: ['meal-management']
};
const session = {
    /**
     * @var SECRET
     * @description this is session secret key change with your own secret key
     */
    SECRET: 'i-am-session-super-secret',
    /**
     * @var EXPIRESIN
     * @description set your own session expire time
     * @default 60*60*24*7 1week
     */
    EXPIRESIN: '30d',
    ALGORITHM: "RS256",
    OPTIONS: {
        issuer: 'Softzino',
        subject: 'info@softzino.com',
        audience: 'http://softzino.com'
    }
}
export default config;
export {
    session
};