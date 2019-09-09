import methodOverride from "method-override";
import bodyParser from "body-parser";
import helmet from "helmet";
import cors from "cors";

module.exports = app => {
    app.use(bodyParser.urlencoded({
        extended: false
    }));
    app.use(methodOverride('_method'));
    app.use(methodOverride('X-HTTP-Method')); //          Microsoft
    app.use(methodOverride('X-HTTP-Method-Override')); // Google/GData
    app.use(methodOverride('X-Method-Override')); //      IBM

    app.use(methodOverride((req, res) => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            var method = req.body._method
            delete req.body._method
            return method
        }
    }));
    app.use(bodyParser.json());
    app.use(helmet());
    app.use(cors());
};