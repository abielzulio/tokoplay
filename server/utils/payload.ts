import type { Request, Response } from "express"

/**
 * Function to check payload request
 * @param req express request
 * @param res express response
 * @param type "body" | "params" | "query
 * @param requiredPayload Array of required payload
 * @returns Return response if payload is missing
 */
function checkPayloadRequest<T extends Record<string, any>>(
  req: Request,
  res: Response,
  type: "body" | "params" | "query",
  requiredPayload: Array<keyof T>
) {
  const missingPayloads: Array<keyof T> = []

  for (const param of requiredPayload) {
    if (!(param in req.body)) {
      missingPayloads.push(param)
    }
  }

  if (missingPayloads.length > 0) {
    return res.status(400).json({
      meta: {
        status: 400,
        message: `Missing required ${type}: ${missingPayloads.join(", ")}`,
      },
    })
  }
}

export default checkPayloadRequest
