import lectureRoutes from "./lecture/routes";
import userRoutes from "./user/routes";
import alarmRoutes from "./alarm/routes";

export default [...lectureRoutes, ...userRoutes, ...alarmRoutes];
