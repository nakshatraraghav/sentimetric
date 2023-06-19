import type { Request, Response } from "express";
import { payload } from "../../middlewares/check-user";
import { getAllApiRequests } from "./requests.service";

export async function getAllApiRequestsHandler(req: Request, res: Response) {
  try {
    const payload = res.locals.user as payload;

    const requests = await getAllApiRequests(payload.uid);

    if (requests.length === 0) {
      return res.json("No requests made yet");
    }

    return res.status(200).json(requests);
  } catch (error: any) {
    return res.status(500).json({
      status: "error",
      message: error.message,
    });
  }
}
