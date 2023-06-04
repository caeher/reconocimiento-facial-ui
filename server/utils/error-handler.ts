import {  } from "nuxt/"
export function errorHandler(error:any, event:any) {
    event.node.res.statusCode = 500;
    return error;
}