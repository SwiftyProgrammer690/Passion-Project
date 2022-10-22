/*!
 * Adapted directly from http-errors at https://github.com/jshttp/http-errors
 * which is licensed as follows:
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2014 Jonathan Ong me@jongleberry.com
 * Copyright (c) 2016 Douglas Christopher Wilson doug@somethingdoug.com
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */ import { Status, STATUS_TEXT } from "./deps.ts";
const errorStatusMap = {
    "BadRequest": 400,
    "Unauthorized": 401,
    "PaymentRequired": 402,
    "Forbidden": 403,
    "NotFound": 404,
    "MethodNotAllowed": 405,
    "NotAcceptable": 406,
    "ProxyAuthRequired": 407,
    "RequestTimeout": 408,
    "Conflict": 409,
    "Gone": 410,
    "LengthRequired": 411,
    "PreconditionFailed": 412,
    "RequestEntityTooLarge": 413,
    "RequestURITooLong": 414,
    "UnsupportedMediaType": 415,
    "RequestedRangeNotSatisfiable": 416,
    "ExpectationFailed": 417,
    "Teapot": 418,
    "MisdirectedRequest": 421,
    "UnprocessableEntity": 422,
    "Locked": 423,
    "FailedDependency": 424,
    "UpgradeRequired": 426,
    "PreconditionRequired": 428,
    "TooManyRequests": 429,
    "RequestHeaderFieldsTooLarge": 431,
    "UnavailableForLegalReasons": 451,
    "InternalServerError": 500,
    "NotImplemented": 501,
    "BadGateway": 502,
    "ServiceUnavailable": 503,
    "GatewayTimeout": 504,
    "HTTPVersionNotSupported": 505,
    "VariantAlsoNegotiates": 506,
    "InsufficientStorage": 507,
    "LoopDetected": 508,
    "NotExtended": 510,
    "NetworkAuthenticationRequired": 511
};
/** A base class for individual classes of HTTP errors. */ export class HttpError extends Error {
    /** Determines if details about the error should be automatically exposed
   * in a response.  This is automatically set to `true` for 4XX errors, as
   * they represent errors in the request, while 5XX errors are set to `false`
   * as they are internal server errors and exposing details could leak
   * important server security information. */ expose = false;
    /** The HTTP error status associated with this class of error. */ status = Status.InternalServerError;
}
function createHttpErrorConstructor(status) {
    const name = `${Status[status]}Error`;
    const Ctor = class extends HttpError {
        constructor(message){
            super(message || STATUS_TEXT.get(status));
            this.status = status;
            this.expose = status >= 400 && status < 500;
            Object.defineProperty(this, "name", {
                configurable: true,
                enumerable: false,
                value: name,
                writable: true
            });
        }
    };
    return Ctor;
}
/** An object which contains an individual HTTP Error for each HTTP status
 * error code (4XX and 5XX).  When errors are raised related to a particular
 * HTTP status code, they will be of the appropriate instance located on this
 * object.  Also, context's `.throw()` will throw errors based on the passed
 * status code. */ export const httpErrors = // deno-lint-ignore no-explicit-any
{
};
for (const [key, value] of Object.entries(errorStatusMap)){
    httpErrors[key] = createHttpErrorConstructor(value);
}
/** Create a specific class of `HttpError` based on the status, which defaults
 * to _500 Internal Server Error_. */ export function createHttpError(status = 500, message) {
    return new httpErrors[Status[status]](message);
}
// deno-lint-ignore no-explicit-any
export function isHttpError(value) {
    return value instanceof HttpError;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3gvb2FrQHYxMC4xLjAvaHR0cEVycm9yLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8qIVxuICogQWRhcHRlZCBkaXJlY3RseSBmcm9tIGh0dHAtZXJyb3JzIGF0IGh0dHBzOi8vZ2l0aHViLmNvbS9qc2h0dHAvaHR0cC1lcnJvcnNcbiAqIHdoaWNoIGlzIGxpY2Vuc2VkIGFzIGZvbGxvd3M6XG4gKlxuICogVGhlIE1JVCBMaWNlbnNlIChNSVQpXG4gKlxuICogQ29weXJpZ2h0IChjKSAyMDE0IEpvbmF0aGFuIE9uZyBtZUBqb25nbGViZXJyeS5jb21cbiAqIENvcHlyaWdodCAoYykgMjAxNiBEb3VnbGFzIENocmlzdG9waGVyIFdpbHNvbiBkb3VnQHNvbWV0aGluZ2RvdWcuY29tXG4gKlxuICogUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuICogb2YgdGhpcyBzb2Z0d2FyZSBhbmQgYXNzb2NpYXRlZCBkb2N1bWVudGF0aW9uIGZpbGVzICh0aGUgXCJTb2Z0d2FyZVwiKSwgdG8gZGVhbFxuICogaW4gdGhlIFNvZnR3YXJlIHdpdGhvdXQgcmVzdHJpY3Rpb24sIGluY2x1ZGluZyB3aXRob3V0IGxpbWl0YXRpb24gdGhlIHJpZ2h0c1xuICogdG8gdXNlLCBjb3B5LCBtb2RpZnksIG1lcmdlLCBwdWJsaXNoLCBkaXN0cmlidXRlLCBzdWJsaWNlbnNlLCBhbmQvb3Igc2VsbFxuICogY29waWVzIG9mIHRoZSBTb2Z0d2FyZSwgYW5kIHRvIHBlcm1pdCBwZXJzb25zIHRvIHdob20gdGhlIFNvZnR3YXJlIGlzXG4gKiBmdXJuaXNoZWQgdG8gZG8gc28sIHN1YmplY3QgdG8gdGhlIGZvbGxvd2luZyBjb25kaXRpb25zOlxuICpcbiAqIFRoZSBhYm92ZSBjb3B5cmlnaHQgbm90aWNlIGFuZCB0aGlzIHBlcm1pc3Npb24gbm90aWNlIHNoYWxsIGJlIGluY2x1ZGVkIGluXG4gKiBhbGwgY29waWVzIG9yIHN1YnN0YW50aWFsIHBvcnRpb25zIG9mIHRoZSBTb2Z0d2FyZS5cbiAqXG4gKiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gKiBJTVBMSUVELCBJTkNMVURJTkcgQlVUIE5PVCBMSU1JVEVEIFRPIFRIRSBXQVJSQU5USUVTIE9GIE1FUkNIQU5UQUJJTElUWSxcbiAqIEZJVE5FU1MgRk9SIEEgUEFSVElDVUxBUiBQVVJQT1NFIEFORCBOT05JTkZSSU5HRU1FTlQuIElOIE5PIEVWRU5UIFNIQUxMIFRIRVxuICogQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuICogTElBQklMSVRZLCBXSEVUSEVSIElOIEFOIEFDVElPTiBPRiBDT05UUkFDVCwgVE9SVCBPUiBPVEhFUldJU0UsIEFSSVNJTkcgRlJPTSxcbiAqIE9VVCBPRiBPUiBJTiBDT05ORUNUSU9OIFdJVEggVEhFIFNPRlRXQVJFIE9SIFRIRSBVU0UgT1IgT1RIRVIgREVBTElOR1MgSU5cbiAqIFRIRSBTT0ZUV0FSRS5cbiAqL1xuXG5pbXBvcnQgeyBTdGF0dXMsIFNUQVRVU19URVhUIH0gZnJvbSBcIi4vZGVwcy50c1wiO1xuaW1wb3J0IHR5cGUgeyBFcnJvclN0YXR1cyB9IGZyb20gXCIuL3R5cGVzLmQudHNcIjtcblxuY29uc3QgZXJyb3JTdGF0dXNNYXAgPSB7XG4gIFwiQmFkUmVxdWVzdFwiOiA0MDAsXG4gIFwiVW5hdXRob3JpemVkXCI6IDQwMSxcbiAgXCJQYXltZW50UmVxdWlyZWRcIjogNDAyLFxuICBcIkZvcmJpZGRlblwiOiA0MDMsXG4gIFwiTm90Rm91bmRcIjogNDA0LFxuICBcIk1ldGhvZE5vdEFsbG93ZWRcIjogNDA1LFxuICBcIk5vdEFjY2VwdGFibGVcIjogNDA2LFxuICBcIlByb3h5QXV0aFJlcXVpcmVkXCI6IDQwNyxcbiAgXCJSZXF1ZXN0VGltZW91dFwiOiA0MDgsXG4gIFwiQ29uZmxpY3RcIjogNDA5LFxuICBcIkdvbmVcIjogNDEwLFxuICBcIkxlbmd0aFJlcXVpcmVkXCI6IDQxMSxcbiAgXCJQcmVjb25kaXRpb25GYWlsZWRcIjogNDEyLFxuICBcIlJlcXVlc3RFbnRpdHlUb29MYXJnZVwiOiA0MTMsXG4gIFwiUmVxdWVzdFVSSVRvb0xvbmdcIjogNDE0LFxuICBcIlVuc3VwcG9ydGVkTWVkaWFUeXBlXCI6IDQxNSxcbiAgXCJSZXF1ZXN0ZWRSYW5nZU5vdFNhdGlzZmlhYmxlXCI6IDQxNixcbiAgXCJFeHBlY3RhdGlvbkZhaWxlZFwiOiA0MTcsXG4gIFwiVGVhcG90XCI6IDQxOCxcbiAgXCJNaXNkaXJlY3RlZFJlcXVlc3RcIjogNDIxLFxuICBcIlVucHJvY2Vzc2FibGVFbnRpdHlcIjogNDIyLFxuICBcIkxvY2tlZFwiOiA0MjMsXG4gIFwiRmFpbGVkRGVwZW5kZW5jeVwiOiA0MjQsXG4gIFwiVXBncmFkZVJlcXVpcmVkXCI6IDQyNixcbiAgXCJQcmVjb25kaXRpb25SZXF1aXJlZFwiOiA0MjgsXG4gIFwiVG9vTWFueVJlcXVlc3RzXCI6IDQyOSxcbiAgXCJSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2VcIjogNDMxLFxuICBcIlVuYXZhaWxhYmxlRm9yTGVnYWxSZWFzb25zXCI6IDQ1MSxcbiAgXCJJbnRlcm5hbFNlcnZlckVycm9yXCI6IDUwMCxcbiAgXCJOb3RJbXBsZW1lbnRlZFwiOiA1MDEsXG4gIFwiQmFkR2F0ZXdheVwiOiA1MDIsXG4gIFwiU2VydmljZVVuYXZhaWxhYmxlXCI6IDUwMyxcbiAgXCJHYXRld2F5VGltZW91dFwiOiA1MDQsXG4gIFwiSFRUUFZlcnNpb25Ob3RTdXBwb3J0ZWRcIjogNTA1LFxuICBcIlZhcmlhbnRBbHNvTmVnb3RpYXRlc1wiOiA1MDYsXG4gIFwiSW5zdWZmaWNpZW50U3RvcmFnZVwiOiA1MDcsXG4gIFwiTG9vcERldGVjdGVkXCI6IDUwOCxcbiAgXCJOb3RFeHRlbmRlZFwiOiA1MTAsXG4gIFwiTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWRcIjogNTExLFxufTtcblxuLyoqIEEgYmFzZSBjbGFzcyBmb3IgaW5kaXZpZHVhbCBjbGFzc2VzIG9mIEhUVFAgZXJyb3JzLiAqL1xuZXhwb3J0IGNsYXNzIEh0dHBFcnJvciBleHRlbmRzIEVycm9yIHtcbiAgLyoqIERldGVybWluZXMgaWYgZGV0YWlscyBhYm91dCB0aGUgZXJyb3Igc2hvdWxkIGJlIGF1dG9tYXRpY2FsbHkgZXhwb3NlZFxuICAgKiBpbiBhIHJlc3BvbnNlLiAgVGhpcyBpcyBhdXRvbWF0aWNhbGx5IHNldCB0byBgdHJ1ZWAgZm9yIDRYWCBlcnJvcnMsIGFzXG4gICAqIHRoZXkgcmVwcmVzZW50IGVycm9ycyBpbiB0aGUgcmVxdWVzdCwgd2hpbGUgNVhYIGVycm9ycyBhcmUgc2V0IHRvIGBmYWxzZWBcbiAgICogYXMgdGhleSBhcmUgaW50ZXJuYWwgc2VydmVyIGVycm9ycyBhbmQgZXhwb3NpbmcgZGV0YWlscyBjb3VsZCBsZWFrXG4gICAqIGltcG9ydGFudCBzZXJ2ZXIgc2VjdXJpdHkgaW5mb3JtYXRpb24uICovXG4gIGV4cG9zZSA9IGZhbHNlO1xuXG4gIC8qKiBUaGUgSFRUUCBlcnJvciBzdGF0dXMgYXNzb2NpYXRlZCB3aXRoIHRoaXMgY2xhc3Mgb2YgZXJyb3IuICovXG4gIHN0YXR1cyA9IFN0YXR1cy5JbnRlcm5hbFNlcnZlckVycm9yO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVIdHRwRXJyb3JDb25zdHJ1Y3RvcjxFIGV4dGVuZHMgdHlwZW9mIEh0dHBFcnJvcj4oXG4gIHN0YXR1czogRXJyb3JTdGF0dXMsXG4pOiBFIHtcbiAgY29uc3QgbmFtZSA9IGAke1N0YXR1c1tzdGF0dXNdfUVycm9yYDtcbiAgY29uc3QgQ3RvciA9IGNsYXNzIGV4dGVuZHMgSHR0cEVycm9yIHtcbiAgICBjb25zdHJ1Y3RvcihtZXNzYWdlPzogc3RyaW5nKSB7XG4gICAgICBzdXBlcihtZXNzYWdlIHx8IFNUQVRVU19URVhULmdldChzdGF0dXMpKTtcbiAgICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgICAgdGhpcy5leHBvc2UgPSBzdGF0dXMgPj0gNDAwICYmIHN0YXR1cyA8IDUwMDtcbiAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0aGlzLCBcIm5hbWVcIiwge1xuICAgICAgICBjb25maWd1cmFibGU6IHRydWUsXG4gICAgICAgIGVudW1lcmFibGU6IGZhbHNlLFxuICAgICAgICB2YWx1ZTogbmFtZSxcbiAgICAgICAgd3JpdGFibGU6IHRydWUsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG4gIHJldHVybiBDdG9yIGFzIEU7XG59XG5cbi8qKiBBbiBvYmplY3Qgd2hpY2ggY29udGFpbnMgYW4gaW5kaXZpZHVhbCBIVFRQIEVycm9yIGZvciBlYWNoIEhUVFAgc3RhdHVzXG4gKiBlcnJvciBjb2RlICg0WFggYW5kIDVYWCkuICBXaGVuIGVycm9ycyBhcmUgcmFpc2VkIHJlbGF0ZWQgdG8gYSBwYXJ0aWN1bGFyXG4gKiBIVFRQIHN0YXR1cyBjb2RlLCB0aGV5IHdpbGwgYmUgb2YgdGhlIGFwcHJvcHJpYXRlIGluc3RhbmNlIGxvY2F0ZWQgb24gdGhpc1xuICogb2JqZWN0LiAgQWxzbywgY29udGV4dCdzIGAudGhyb3coKWAgd2lsbCB0aHJvdyBlcnJvcnMgYmFzZWQgb24gdGhlIHBhc3NlZFxuICogc3RhdHVzIGNvZGUuICovXG5leHBvcnQgY29uc3QgaHR0cEVycm9yczogUmVjb3JkPGtleW9mIHR5cGVvZiBlcnJvclN0YXR1c01hcCwgdHlwZW9mIEh0dHBFcnJvcj4gPVxuICAvLyBkZW5vLWxpbnQtaWdub3JlIG5vLWV4cGxpY2l0LWFueVxuICB7fSBhcyBhbnk7XG5cbmZvciAoY29uc3QgW2tleSwgdmFsdWVdIG9mIE9iamVjdC5lbnRyaWVzKGVycm9yU3RhdHVzTWFwKSkge1xuICBodHRwRXJyb3JzW2tleSBhcyBrZXlvZiB0eXBlb2YgZXJyb3JTdGF0dXNNYXBdID0gY3JlYXRlSHR0cEVycm9yQ29uc3RydWN0b3IoXG4gICAgdmFsdWUsXG4gICk7XG59XG5cbi8qKiBDcmVhdGUgYSBzcGVjaWZpYyBjbGFzcyBvZiBgSHR0cEVycm9yYCBiYXNlZCBvbiB0aGUgc3RhdHVzLCB3aGljaCBkZWZhdWx0c1xuICogdG8gXzUwMCBJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JfLiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUh0dHBFcnJvcihcbiAgc3RhdHVzOiBFcnJvclN0YXR1cyA9IDUwMCxcbiAgbWVzc2FnZT86IHN0cmluZyxcbik6IEh0dHBFcnJvciB7XG4gIHJldHVybiBuZXcgaHR0cEVycm9yc1tTdGF0dXNbc3RhdHVzXSBhcyBrZXlvZiB0eXBlb2YgZXJyb3JTdGF0dXNNYXBdKG1lc3NhZ2UpO1xufVxuXG4vLyBkZW5vLWxpbnQtaWdub3JlIG5vLWV4cGxpY2l0LWFueVxuZXhwb3J0IGZ1bmN0aW9uIGlzSHR0cEVycm9yKHZhbHVlOiBhbnkpOiB2YWx1ZSBpcyBIdHRwRXJyb3Ige1xuICByZXR1cm4gdmFsdWUgaW5zdGFuY2VvZiBIdHRwRXJyb3I7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsRUEwQkcsQUExQkg7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBMEJHLEFBMUJILEVBMEJHLENBRUgsTUFBTSxHQUFHLE1BQU0sRUFBRSxXQUFXLFFBQVEsQ0FBVztBQUcvQyxLQUFLLENBQUMsY0FBYyxHQUFHLENBQUM7SUFDdEIsQ0FBWSxhQUFFLEdBQUc7SUFDakIsQ0FBYyxlQUFFLEdBQUc7SUFDbkIsQ0FBaUIsa0JBQUUsR0FBRztJQUN0QixDQUFXLFlBQUUsR0FBRztJQUNoQixDQUFVLFdBQUUsR0FBRztJQUNmLENBQWtCLG1CQUFFLEdBQUc7SUFDdkIsQ0FBZSxnQkFBRSxHQUFHO0lBQ3BCLENBQW1CLG9CQUFFLEdBQUc7SUFDeEIsQ0FBZ0IsaUJBQUUsR0FBRztJQUNyQixDQUFVLFdBQUUsR0FBRztJQUNmLENBQU0sT0FBRSxHQUFHO0lBQ1gs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