
import config from "../../App/Config/app";

export default async (Request, Response, next) => {
    //Do something here
    if(config.REQUESTFILTER === "on") {

        if(Request.headers["request-agent"] !== undefined){
            const reqId = Request.headers["request-agent"];
            if(config.VALIDAGENT.indexOf(reqId) === -1){
                return Response.status(401).json({
                    success: false,
                    message: 'Invalid request agent you don\'t have a permission to communicate with server:('
                });
            }
        }else{
            return Response.status(401).json({
                success: false,
                message: 'Must required request agent for communicate with server:('
            });
        }
        
    }
    next();
};