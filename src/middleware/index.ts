import {
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
} from "./common";

import { handleAPIDocs } from "./apiDocs";

export default [
  handleCors,
  handleBodyRequestParsing,
  handleCompression,
  handleLogging,
  handleAPIDocs,
];
