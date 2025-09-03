import jwt from "jsonwebtoken";
import User from "../models/User.js";

function extractToken(req) {
  if (req.cookies?.jwt) return req.cookies.jwt;

  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith("Bearer ")) {
    return authHeader.split(" ")[1];
  }

  return null;
}

export async function authorize(req, res, next) {
  try {
    const token = extractToken(req);
    if (!token)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorize - No Token Provided" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res
        .status(401)
        .json({ success: false, message: "Token is invalid" });
    const user = await User.findById(decoded.userId).select("-password");

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "Unauthorize - No User found" });
        
    req.user = user;
    next();

  } catch (error) {
    console.log("Error in auth middleWare: ", error.message);
    return res
      .status(401)
      .json({
        success: false,
        message: "Unauthorized - Invalid or expired token",
      });
  }
}
