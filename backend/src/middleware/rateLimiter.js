import ratelimit from '../config/upstash.js';

const rateLimiter = async(req, res, next) => {
    try{
        const { success } = await ratelimit.limit('my-limit-key');
        if(!success) {
            return res.status(429).json({message: 'Too Many Requests'});
        }
        next();
    }catch(error){
        console.log("Error in rate limiter middleware", error);
        res.status(500).json({message: 'Server Error'});
        next(error);
    }
}

export default rateLimiter;