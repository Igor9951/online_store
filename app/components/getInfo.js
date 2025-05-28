
import { headers } from "next/headers";
import {UAParser} from "ua-parser-js";

export async function getInfo() {
  const userHeaders = await headers();

  const userAgent = userHeaders.get("user-agent") || "Unknown";
  const parser = UAParser(userAgent);


  const info = {
     model:parser.device.model,
     os: parser.os.name,
     browser:parser.browser.name,
  }

  console.log(info)
  return info;
}