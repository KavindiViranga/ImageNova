import jwt from 'jsonwebtoken'

const userAuth = async (req, res, next) =>{
    const {token} = req.headers;

    if(!token){
        return res.json({ success: false, message: 'Not Authorized. Login Again'});
    }

    try{
        const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
        
        if (!req.body) {
            req.body = {}
        }

        if(tokenDecode.id) {
            req.body.userId = tokenDecode.id;
        }else{
            return res.json({ success: false, message: 'Not Authorized. Login Again'});
        }

        next();

    }catch (error){
        res.json({ success: false, message: error.message});
    }
};

export default userAuth;

/*import jwt from "jsonwebtoken";

const userAuth = (req, res, next) => {
  try {
    // Expect: Authorization: Bearer <token>
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again"
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded || !decoded.id) {
      return res.json({
        success: false,
        message: "Not Authorized. Login Again"
      });
    }

    // ✅ Attach user info safely
    req.user = {
      id: decoded.id
    };

    next();
  } catch (error) {
    return res.json({
      success: false,
      message: "Invalid or expired token"
    });
  }
};

export default userAuth;
*/