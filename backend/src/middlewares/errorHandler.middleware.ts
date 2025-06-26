import { Request, Response, NextFunction } from "express";

 const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error("[Error]", err);

  if (err.name === "ValidationError") {
    return res.status(400).json({ error: err.message });
  }

  if (err.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ error: "Duplicate entry" });
  }

  return res.status(500).json({
    error: "Internal Server Error",
    message: err.message || "Something went wrong",
  });
};
export default errorHandler;