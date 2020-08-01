import { issueAdminToken } from "./AuthController";
import { checkAdminAuthBody } from "./../../middleware/checks";

export default [
  {
    path: "/auth/admin",
    method: "post",
    handler: [checkAdminAuthBody, issueAdminToken],
  },
];
