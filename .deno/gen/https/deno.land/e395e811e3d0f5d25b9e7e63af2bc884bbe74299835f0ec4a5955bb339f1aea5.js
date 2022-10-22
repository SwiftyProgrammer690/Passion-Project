export var Status;
(function(Status) {
    Status[Status[/** RFC 7231, 6.2.1 */ "Continue"] = 100] = "Continue";
    Status[Status[/** RFC 7231, 6.2.2 */ "SwitchingProtocols"] = 101] = "SwitchingProtocols";
    Status[Status[/** RFC 2518, 10.1 */ "Processing"] = 102] = "Processing";
    Status[Status[/** RFC 8297 **/ "EarlyHints"] = 103] = "EarlyHints";
    Status[Status[/** RFC 7231, 6.3.1 */ "OK"] = 200] = "OK";
    Status[Status[/** RFC 7231, 6.3.2 */ "Created"] = 201] = "Created";
    Status[Status[/** RFC 7231, 6.3.3 */ "Accepted"] = 202] = "Accepted";
    Status[Status[/** RFC 7231, 6.3.4 */ "NonAuthoritativeInfo"] = 203] = "NonAuthoritativeInfo";
    Status[Status[/** RFC 7231, 6.3.5 */ "NoContent"] = 204] = "NoContent";
    Status[Status[/** RFC 7231, 6.3.6 */ "ResetContent"] = 205] = "ResetContent";
    Status[Status[/** RFC 7233, 4.1 */ "PartialContent"] = 206] = "PartialContent";
    Status[Status[/** RFC 4918, 11.1 */ "MultiStatus"] = 207] = "MultiStatus";
    Status[Status[/** RFC 5842, 7.1 */ "AlreadyReported"] = 208] = "AlreadyReported";
    Status[Status[/** RFC 3229, 10.4.1 */ "IMUsed"] = 226] = "IMUsed";
    Status[Status[/** RFC 7231, 6.4.1 */ "MultipleChoices"] = 300] = "MultipleChoices";
    Status[Status[/** RFC 7231, 6.4.2 */ "MovedPermanently"] = 301] = "MovedPermanently";
    Status[Status[/** RFC 7231, 6.4.3 */ "Found"] = 302] = "Found";
    Status[Status[/** RFC 7231, 6.4.4 */ "SeeOther"] = 303] = "SeeOther";
    Status[Status[/** RFC 7232, 4.1 */ "NotModified"] = 304] = "NotModified";
    Status[Status[/** RFC 7231, 6.4.5 */ "UseProxy"] = 305] = "UseProxy";
    Status[Status[/** RFC 7231, 6.4.7 */ "TemporaryRedirect"] = 307] = "TemporaryRedirect";
    Status[Status[/** RFC 7538, 3 */ "PermanentRedirect"] = 308] = "PermanentRedirect";
    Status[Status[/** RFC 7231, 6.5.1 */ "BadRequest"] = 400] = "BadRequest";
    Status[Status[/** RFC 7235, 3.1 */ "Unauthorized"] = 401] = "Unauthorized";
    Status[Status[/** RFC 7231, 6.5.2 */ "PaymentRequired"] = 402] = "PaymentRequired";
    Status[Status[/** RFC 7231, 6.5.3 */ "Forbidden"] = 403] = "Forbidden";
    Status[Status[/** RFC 7231, 6.5.4 */ "NotFound"] = 404] = "NotFound";
    Status[Status[/** RFC 7231, 6.5.5 */ "MethodNotAllowed"] = 405] = "MethodNotAllowed";
    Status[Status[/** RFC 7231, 6.5.6 */ "NotAcceptable"] = 406] = "NotAcceptable";
    Status[Status[/** RFC 7235, 3.2 */ "ProxyAuthRequired"] = 407] = "ProxyAuthRequired";
    Status[Status[/** RFC 7231, 6.5.7 */ "RequestTimeout"] = 408] = "RequestTimeout";
    Status[Status[/** RFC 7231, 6.5.8 */ "Conflict"] = 409] = "Conflict";
    Status[Status[/** RFC 7231, 6.5.9 */ "Gone"] = 410] = "Gone";
    Status[Status[/** RFC 7231, 6.5.10 */ "LengthRequired"] = 411] = "LengthRequired";
    Status[Status[/** RFC 7232, 4.2 */ "PreconditionFailed"] = 412] = "PreconditionFailed";
    Status[Status[/** RFC 7231, 6.5.11 */ "RequestEntityTooLarge"] = 413] = "RequestEntityTooLarge";
    Status[Status[/** RFC 7231, 6.5.12 */ "RequestURITooLong"] = 414] = "RequestURITooLong";
    Status[Status[/** RFC 7231, 6.5.13 */ "UnsupportedMediaType"] = 415] = "UnsupportedMediaType";
    Status[Status[/** RFC 7233, 4.4 */ "RequestedRangeNotSatisfiable"] = 416] = "RequestedRangeNotSatisfiable";
    Status[Status[/** RFC 7231, 6.5.14 */ "ExpectationFailed"] = 417] = "ExpectationFailed";
    Status[Status[/** RFC 7168, 2.3.3 */ "Teapot"] = 418] = "Teapot";
    Status[Status[/** RFC 7540, 9.1.2 */ "MisdirectedRequest"] = 421] = "MisdirectedRequest";
    Status[Status[/** RFC 4918, 11.2 */ "UnprocessableEntity"] = 422] = "UnprocessableEntity";
    Status[Status[/** RFC 4918, 11.3 */ "Locked"] = 423] = "Locked";
    Status[Status[/** RFC 4918, 11.4 */ "FailedDependency"] = 424] = "FailedDependency";
    Status[Status[/** RFC 8470, 5.2 */ "TooEarly"] = 425] = "TooEarly";
    Status[Status[/** RFC 7231, 6.5.15 */ "UpgradeRequired"] = 426] = "UpgradeRequired";
    Status[Status[/** RFC 6585, 3 */ "PreconditionRequired"] = 428] = "PreconditionRequired";
    Status[Status[/** RFC 6585, 4 */ "TooManyRequests"] = 429] = "TooManyRequests";
    Status[Status[/** RFC 6585, 5 */ "RequestHeaderFieldsTooLarge"] = 431] = "RequestHeaderFieldsTooLarge";
    Status[Status[/** RFC 7725, 3 */ "UnavailableForLegalReasons"] = 451] = "UnavailableForLegalReasons";
    Status[Status[/** RFC 7231, 6.6.1 */ "InternalServerError"] = 500] = "InternalServerError";
    Status[Status[/** RFC 7231, 6.6.2 */ "NotImplemented"] = 501] = "NotImplemented";
    Status[Status[/** RFC 7231, 6.6.3 */ "BadGateway"] = 502] = "BadGateway";
    Status[Status[/** RFC 7231, 6.6.4 */ "ServiceUnavailable"] = 503] = "ServiceUnavailable";
    Status[Status[/** RFC 7231, 6.6.5 */ "GatewayTimeout"] = 504] = "GatewayTimeout";
    Status[Status[/** RFC 7231, 6.6.6 */ "HTTPVersionNotSupported"] = 505] = "HTTPVersionNotSupported";
    Status[Status[/** RFC 2295, 8.1 */ "VariantAlsoNegotiates"] = 506] = "VariantAlsoNegotiates";
    Status[Status[/** RFC 4918, 11.5 */ "InsufficientStorage"] = 507] = "InsufficientStorage";
    Status[Status[/** RFC 5842, 7.2 */ "LoopDetected"] = 508] = "LoopDetected";
    Status[Status[/** RFC 2774, 7 */ "NotExtended"] = 510] = "NotExtended";
    Status[Status[/** RFC 6585, 6 */ "NetworkAuthenticationRequired"] = 511] = "NetworkAuthenticationRequired";
})(Status || (Status = {
}));
/**
 * Map from status code to status text.
 *
 * ```ts
 * import {
 *   Status,
 *   STATUS_TEXT,
 * } from "https://deno.land/std@$STD_VERSION/http/http_status.ts";
 *
 * console.log(Status.NotFound); //=> 404
 * console.log(STATUS_TEXT.get(Status.NotFound)); //=> "Not Found"
 * ```
 */ export const STATUS_TEXT = new Map([
    [
        Status.Continue,
        "Continue"
    ],
    [
        Status.SwitchingProtocols,
        "Switching Protocols"
    ],
    [
        Status.Processing,
        "Processing"
    ],
    [
        Status.EarlyHints,
        "Early Hints"
    ],
    [
        Status.OK,
        "OK"
    ],
    [
        Status.Created,
        "Created"
    ],
    [
        Status.Accepted,
        "Accepted"
    ],
    [
        Status.NonAuthoritativeInfo,
        "Non-Authoritative Information"
    ],
    [
        Status.NoContent,
        "No Content"
    ],
    [
        Status.ResetContent,
        "Reset Content"
    ],
    [
        Status.PartialContent,
        "Partial Content"
    ],
    [
        Status.MultiStatus,
        "Multi-Status"
    ],
    [
        Status.AlreadyReported,
        "Already Reported"
    ],
    [
        Status.IMUsed,
        "IM Used"
    ],
    [
        Status.MultipleChoices,
        "Multiple Choices"
    ],
    [
        Status.MovedPermanently,
        "Moved Permanently"
    ],
    [
        Status.Found,
        "Found"
    ],
    [
        Status.SeeOther,
        "See Other"
    ],
    [
        Status.NotModified,
        "Not Modified"
    ],
    [
        Status.UseProxy,
        "Use Proxy"
    ],
    [
        Status.TemporaryRedirect,
        "Temporary Redirect"
    ],
    [
        Status.PermanentRedirect,
        "Permanent Redirect"
    ],
    [
        Status.BadRequest,
        "Bad Request"
    ],
    [
        Status.Unauthorized,
        "Unauthorized"
    ],
    [
        Status.PaymentRequired,
        "Payment Required"
    ],
    [
        Status.Forbidden,
        "Forbidden"
    ],
    [
        Status.NotFound,
        "Not Found"
    ],
    [
        Status.MethodNotAllowed,
        "Method Not Allowed"
    ],
    [
        Status.NotAcceptable,
        "Not Acceptable"
    ],
    [
        Status.ProxyAuthRequired,
        "Proxy Authentication Required"
    ],
    [
        Status.RequestTimeout,
        "Request Timeout"
    ],
    [
        Status.Conflict,
        "Conflict"
    ],
    [
        Status.Gone,
        "Gone"
    ],
    [
        Status.LengthRequired,
        "Length Required"
    ],
    [
        Status.PreconditionFailed,
        "Precondition Failed"
    ],
    [
        Status.RequestEntityTooLarge,
        "Request Entity Too Large"
    ],
    [
        Status.RequestURITooLong,
        "Request URI Too Long"
    ],
    [
        Status.UnsupportedMediaType,
        "Unsupported Media Type"
    ],
    [
        Status.RequestedRangeNotSatisfiable,
        "Requested Range Not Satisfiable"
    ],
    [
        Status.ExpectationFailed,
        "Expectation Failed"
    ],
    [
        Status.Teapot,
        "I'm a teapot"
    ],
    [
        Status.MisdirectedRequest,
        "Misdirected Request"
    ],
    [
        Status.UnprocessableEntity,
        "Unprocessable Entity"
    ],
    [
        Status.Locked,
        "Locked"
    ],
    [
        Status.FailedDependency,
        "Failed Dependency"
    ],
    [
        Status.TooEarly,
        "Too Early"
    ],
    [
        Status.UpgradeRequired,
        "Upgrade Required"
    ],
    [
        Status.PreconditionRequired,
        "Precondition Required"
    ],
    [
        Status.TooManyRequests,
        "Too Many Requests"
    ],
    [
        Status.RequestHeaderFieldsTooLarge,
        "Request Header Fields Too Large"
    ],
    [
        Status.UnavailableForLegalReasons,
        "Unavailable For Legal Reasons"
    ],
    [
        Status.InternalServerError,
        "Internal Server Error"
    ],
    [
        Status.NotImplemented,
        "Not Implemented"
    ],
    [
        Status.BadGateway,
        "Bad Gateway"
    ],
    [
        Status.ServiceUnavailable,
        "Service Unavailable"
    ],
    [
        Status.GatewayTimeout,
        "Gateway Timeout"
    ],
    [
        Status.HTTPVersionNotSupported,
        "HTTP Version Not Supported"
    ],
    [
        Status.VariantAlsoNegotiates,
        "Variant Also Negotiates"
    ],
    [
        Status.InsufficientStorage,
        "Insufficient Storage"
    ],
    [
        Status.LoopDetected,
        "Loop Detected"
    ],
    [
        Status.NotExtended,
        "Not Extended"
    ],
    [
        Status.NetworkAuthenticationRequired,
        "Network Authentication Required"
    ], 
]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL2h0dHAvaHR0cF9zdGF0dXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSB0aGUgRGVubyBhdXRob3JzLiBBbGwgcmlnaHRzIHJlc2VydmVkLiBNSVQgbGljZW5zZS5cblxuLyoqXG4gKiBFbnVtIG9mIEhUVFAgc3RhdHVzIGNvZGVzLlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQge1xuICogICBTdGF0dXMsXG4gKiAgIFNUQVRVU19URVhULFxuICogfSBmcm9tIFwiaHR0cHM6Ly9kZW5vLmxhbmQvc3RkQCRTVERfVkVSU0lPTi9odHRwL2h0dHBfc3RhdHVzLnRzXCI7XG4gKlxuICogY29uc29sZS5sb2coU3RhdHVzLk5vdEZvdW5kKTsgLy89PiA0MDRcbiAqIGNvbnNvbGUubG9nKFNUQVRVU19URVhULmdldChTdGF0dXMuTm90Rm91bmQpKTsgLy89PiBcIk5vdCBGb3VuZFwiXG4gKiBgYGBcbiAqL1xuZXhwb3J0IGVudW0gU3RhdHVzIHtcbiAgLyoqIFJGQyA3MjMxLCA2LjIuMSAqL1xuICBDb250aW51ZSA9IDEwMCxcbiAgLyoqIFJGQyA3MjMxLCA2LjIuMiAqL1xuICBTd2l0Y2hpbmdQcm90b2NvbHMgPSAxMDEsXG4gIC8qKiBSRkMgMjUxOCwgMTAuMSAqL1xuICBQcm9jZXNzaW5nID0gMTAyLFxuICAvKiogUkZDIDgyOTcgKiovXG4gIEVhcmx5SGludHMgPSAxMDMsXG4gIC8qKiBSRkMgNzIzMSwgNi4zLjEgKi9cbiAgT0sgPSAyMDAsXG4gIC8qKiBSRkMgNzIzMSwgNi4zLjIgKi9cbiAgQ3JlYXRlZCA9IDIwMSxcbiAgLyoqIFJGQyA3MjMxLCA2LjMuMyAqL1xuICBBY2NlcHRlZCA9IDIwMixcbiAgLyoqIFJGQyA3MjMxLCA2LjMuNCAqL1xuICBOb25BdXRob3JpdGF0aXZlSW5mbyA9IDIwMyxcbiAgLyoqIFJGQyA3MjMxLCA2LjMuNSAqL1xuICBOb0NvbnRlbnQgPSAyMDQsXG4gIC8qKiBSRkMgNzIzMSwgNi4zLjYgKi9cbiAgUmVzZXRDb250ZW50ID0gMjA1LFxuICAvKiogUkZDIDcyMzMsIDQuMSAqL1xuICBQYXJ0aWFsQ29udGVudCA9IDIwNixcbiAgLyoqIFJGQyA0OTE4LCAxMS4xICovXG4gIE11bHRpU3RhdHVzID0gMjA3LFxuICAvKiogUkZDIDU4NDIsIDcuMSAqL1xuICBBbHJlYWR5UmVwb3J0ZWQgPSAyMDgsXG4gIC8qKiBSRkMgMzIyOSwgMTAuNC4xICovXG4gIElNVXNlZCA9IDIyNixcblxuICAvKiogUkZDIDcyMzEsIDYuNC4xICovXG4gIE11bHRpcGxlQ2hvaWNlcyA9IDMwMCxcbiAgLyoqIFJGQyA3MjMxLCA2LjQuMiAqL1xuICBNb3ZlZFBlcm1hbmVudGx5ID0gMzAxLFxuICAvKiogUkZDIDcyMzEsIDYuNC4zICovXG4gIEZvdW5kID0gMzAyLFxuICAvKiogUkZDIDcyMzEsIDYuNC40ICovXG4gIFNlZU90aGVyID0gMzAzLFxuICAvKiogUkZDIDcyMzIsIDQuMSAqL1xuICBOb3RNb2RpZmllZCA9IDMwNCxcbiAgLyoqIFJGQyA3MjMxLCA2LjQuNSAqL1xuICBVc2VQcm94eSA9IDMwNSxcbiAgLyoqIFJGQyA3MjMxLCA2LjQuNyAqL1xuICBUZW1wb3JhcnlSZWRpcmVjdCA9IDMwNyxcbiAgLyoqIFJGQyA3NTM4LCAzICovXG4gIFBlcm1hbmVudFJlZGlyZWN0ID0gMzA4LFxuXG4gIC8qKiBSRkMgNzIzMSwgNi41LjEgKi9cbiAgQmFkUmVxdWVzdCA9IDQwMCxcbiAgLyoqIFJGQyA3MjM1LCAzLjEgKi9cbiAgVW5hdXRob3JpemVkID0gNDAxLFxuICAvKiogUkZDIDcyMzEsIDYuNS4yICovXG4gIFBheW1lbnRSZXF1aXJlZCA9IDQwMixcbiAgLyoqIFJGQyA3MjMxLCA2LjUuMyAqL1xuICBGb3JiaWRkZW4gPSA0MDMsXG4gIC8qKiBSRkMgNzIzMSwgNi41LjQgKi9cbiAgTm90Rm91bmQgPSA0MDQsXG4gIC8qKiBSRkMgNzIzMSwgNi41LjUgKi9cbiAgTWV0aG9kTm90QWxsb3dlZCA9IDQwNSxcbiAgLyoqIFJGQyA3MjMxLCA2LjUuNiAqL1xuICBOb3RBY2NlcHRhYmxlID0gNDA2LFxuICAvKiogUkZDIDcyMzUsIDMuMiAqL1xuICBQcm94eUF1dGhSZXF1aXJlZCA9IDQwNyxcbiAgLyoqIFJGQyA3MjMxLCA2LjUuNyAqL1xuICBSZXF1ZXN0VGltZW91dCA9IDQwOCxcbiAgLyoqIFJGQyA3MjMxLCA2LjUuOCAqL1xuICBDb25mbGljdCA9IDQwOSxcbiAgLyoqIFJGQyA3MjMxLCA2LjUuOSAqL1xuICBHb25lID0gNDEwLFxuICAvKiogUkZDIDcyMzEsIDYuNS4xMCAqL1xuICBMZW5ndGhSZXF1aXJlZCA9IDQxMSxcbiAgLyoqIFJGQyA3MjMyLCA0LjIgKi9cbiAgUHJlY29uZGl0aW9uRmFpbGVkID0gNDEyLFxuICAvKiogUkZDIDcyMzEsIDYuNS4xMSAqL1xuICBSZXF1ZXN0RW50aXR5VG9vTGFyZ2UgPSA0MTMsXG4gIC8qKiBSRkMgNzIzMSwgNi41LjEyICovXG4gIFJlcXVlc3RVUklUb29Mb25nID0gNDE0LFxuICAvKiogUkZDIDcyMzEsIDYuNS4xMyAqL1xuICBVbnN1cHBvcnRlZE1lZGlhVHlwZSA9IDQxNSxcbiAgLyoqIFJGQyA3MjMzLCA0LjQgKi9cbiAgUmVxdWVzdGVkUmFuZ2VOb3RTYXRpc2ZpYWJsZSA9IDQxNixcbiAgLyoqIFJGQyA3MjMxLCA2LjUuMTQgKi9cbiAgRXhwZWN0YXRpb25GYWlsZWQgPSA0MTcsXG4gIC8qKiBSRkMgNzE2OCwgMi4zLjMgKi9cbiAgVGVhcG90ID0gNDE4LFxuICAvKiogUkZDIDc1NDAsIDkuMS4yICovXG4gIE1pc2RpcmVjdGVkUmVxdWVzdCA9IDQyMSxcbiAgLyoqIFJGQyA0OTE4LCAxMS4yICovXG4gIFVucHJvY2Vzc2FibGVFbnRpdHkgPSA0MjIsXG4gIC8qKiBSRkMgNDkxOCwgMTEuMyAqL1xuICBMb2NrZWQgPSA0MjMsXG4gIC8qKiBSRkMgNDkxOCwgMTEuNCAqL1xuICBGYWlsZWREZXBlbmRlbmN5ID0gNDI0LFxuICAvKiogUkZDIDg0NzAsIDUuMiAqL1xuICBUb29FYXJseSA9IDQyNSxcbiAgLyoqIFJGQyA3MjMxLCA2LjUuMTUgKi9cbiAgVXBncmFkZVJlcXVpcmVkID0gNDI2LFxuICAvKiogUkZDIDY1ODUsIDMgKi9cbiAgUHJlY29uZGl0aW9uUmVxdWlyZWQgPSA0MjgsXG4gIC8qKiBSRkMgNjU4NSwgNCAqL1xuICBUb29NYW55UmVxdWVzdHMgPSA0MjksXG4gIC8qKiBSRkMgNjU4NSwgNSAqL1xuICBSZXF1ZXN0SGVhZGVyRmllbGRzVG9vTGFyZ2UgPSA0MzEsXG4gIC8qKiBSRkMgNzcyNSwgMyAqL1xuICBVbmF2YWlsYWJsZUZvckxlZ2FsUmVhc29ucyA9IDQ1MSxcblxuICAvKiogUkZDIDcyMzEsIDYuNi4xICovXG4gIEludGVybmFsU2VydmVyRXJyb3IgPSA1MDAsXG4gIC8qKiBSRkMgNzIzMSwgNi42LjIgKi9cbiAgTm90SW1wbGVtZW50ZWQgPSA1MDEsXG4gIC8qKiBSRkMgNzIzMSwgNi42LjMgKi9cbiAgQmFkR2F0ZXdheSA9IDUwMixcbiAgLyoqIFJGQyA3MjMxLCA2LjYuNCAqL1xuICBTZXJ2aWNlVW5hdmFpbGFibGUgPSA1MDMsXG4gIC8qKiBSRkMgNzIzMSwgNi42LjUgKi9cbiAgR2F0ZXdheVRpbWVvdXQgPSA1MDQsXG4gIC8qKiBSRkMgNzIzMSwgNi42LjYgKi9cbiAgSFRUUFZlcnNpb25Ob3RTdXBwb3J0ZWQgPSA1MDUsXG4gIC8qKiBSRkMgMjI5NSwgOC4xICovXG4gIFZhcmlhbnRBbHNvTmVnb3RpYXRlcyA9IDUwNixcbiAgLyoqIFJGQyA0OTE4LCAxMS41ICovXG4gIEluc3VmZmljaWVudFN0b3JhZ2UgPSA1MDcsXG4gIC8qKiBSRkMgNTg0MiwgNy4yICovXG4gIExvb3BEZXRlY3RlZCA9IDUwOCxcbiAgLyoqIFJGQyAyNzc0LCA3ICovXG4gIE5vdEV4dGVuZGVkID0gNTEwLFxuICAvKiogUkZDIDY1ODUsIDYgKi9cbiAgTmV0d29ya0F1dGhlbnRpY2F0aW9uUmVxdWlyZWQgPSA1MTEsXG59XG5cbi8qKlxuICogTWFwIGZyb20gc3RhdHVzIGNvZGUgdG8gc3RhdHVzIHRleHQuXG4gKlxuICogYGBgdHNcbiAqIGltcG9ydCB7XG4gKiAgIFN0YXR1cyxcbiAqICAgU1RBVFVTX1RFWFQsXG4gKiB9IGZyb20gXCJodHRwczovL2Rlbm8ubGFuZC9zdGRAJFNURF9WRVJTSU9OL2h0dHAvaHR0cF9zdGF0dXMudHNcIjtcbiAqXG4gKiBjb25zb2xlLmxvZyhTdGF0dXMuTm90Rm91bmQpOyAvLz0+IDQwNFxuICogY29uc29sZS5sb2coU1RBVFVTX1RFWFQuZ2V0KFN0YXR1cy5Ob3RGb3VuZCkpOyAvLz0+IFwiTm90IEZvdW5kXCJcbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgU1RBVFVTX1RFWFQgPSBuZXcgTWFwPFN0YXR1cywgc3RyaW5nPihbXG4gIFtTdGF0dXMuQ29udGludWUsIFwiQ29udGludWVcIl0sXG4gIFtTdGF0dXMuU3dpdGNoaW5nUHJvdG9jb2xzLCBcIlN3aXRjaGluZyBQcm90b2NvbHNcIl0sXG4gIFtTdGF0dXMuUHJvY2Vzc2luZywgXCJQcm9jZXNzaW5nXCJdLFxuICBbU3RhdHVzLkVhcmx5SGludHMsIFwiRWFybHkgSGludHNcIl0sXG4gIFtTdGF0dXMuT0ssIFwiT0tcIl0sXG4gIFtTdGF0dXMuQ3JlYXRlZCwgXCJDcmVhdGVkXCJdLFxuICBbU3RhdHVzLkFjY2VwdGVkLCBcIkFjY2VwdGVkXCJdLFxuICBbU3RhdHVzLk5vbkF1dGhvcml0YXRpdmVJbmZvLCBcIk5vbi1BdXRob3JpdGF0aXZlIEluZm9ybWF0aW9uXCJdLFxuICBbU3RhdHVzLk5vQ29udGVudCwgXCJObyBDb250ZW50XCJdLFxuICBbU3RhdHVzLlJlc2V0Q29udGVudCwgXCJSZXNldCBDb250ZW50XCJdLFxuICBbU3RhdHVzLlBhcnRpYWxDb250ZW50LCBcIlBhcnRpYWwgQ29udGVudFwiXSxcbiAgW1N0YXR1cy5NdWx0aVN0YXR1cywgXCJNdWx0aS1TdGF0dXNcIl0sXG4gIFtTdGF0dXMuQWxyZWFkeVJlcG9ydGVkLCBcIkFscmVhZHkgUmVwb3J0ZWRcIl0sXG4gIFtTdGF0dXMuSU1Vc2VkLCBcIklNIFVzZWRcIl0sXG4gIFtTdGF0dXMuTXVsdGlwbGVDaG9pY2VzLCBcIk11bHRpcGxlIENob2ljZXNcIl0sXG4gIFtTdGF0dXMuTW92ZWRQZXJtYW5lbnRseSwgXCJNb3ZlZCBQZXJtYW5lbnRseVwiXSxcbiAgW1N0YXR1cy5Gb3VuZCwgXCJGb3VuZFwiXSxcbiAgW1N0YXR1cy5TZWVPdGhlciwgXCJTZWUgT3RoZXJcIl0sXG4gIFtTdGF0dXMuTm90TW9kaWZpZWQsIFwiTm90IE1vZGlmaWVkXCJdLFxuICBbU3RhdHVzLlVzZVByb3h5LCBcIlVzZSBQcm94eVwiXSxcbiAgW1N0YXR1cy5UZW1wb3JhcnlSZWRpcmVjdCwgXCJUZW1wb3JhcnkgUmVkaXJlY3RcIl0sXG4gIFtTdGF0dXMuUGVybWFuZW50UmVkaXJlY3QsIFwiUGVybWFuZW50IFJlZGlyZWN0XCJdLFxuICBbU3RhdHVzLkJhZFJlcXVlc3QsIFwiQmFkIFJlcXVlc3RcIl0sXG4gIFtTdGF0dXMuVW5hdXRob3JpemVkLCBcIlVuYXV0aG9yaXplZFwiXSxcbiAgW1N0YXR1cy5QYXltZW50UmVxdWlyZWQsIFwiUGF5bWVudCBSZXF1aXJlZFwiXSxcbiAgW1N0YXR1cy5Gb3JiaWRkZW4sIFwiRm9yYmlkZGVuXCJdLFxuICBbU3RhdHVzLk5vdEZvdW5kLCBcIk5vdCBGb3VuZFwiXSxcbiAgW1N0YXR1cy5NZXRob2ROb3RBbGxvd2VkLCBcIk1ldGhvZCBOb3QgQWxsb3dlZFwiXSxcbiAgW1N0YXR1cy5Ob3RBY2NlcHRhYmxlLCBcIk5vdCBBY2NlcHRhYmxlXCJdLFxuICBbU3RhdHVzLlByb3h5QXV0aFJlcXVpcmVkLCBcIlByb3h5IEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCJdLFxuICBbU3RhdHVzLlJlcXVlc3RUaW1lb3V0LCBcIlJlcXVlc3QgVGltZW91dFwiXSxcbiAgW1N0YXR1cy5Db25mbGljdCwgXCJDb25mbGljdFwiXSxcbiAgW1N0YXR1cy5Hb25lLCBcIkdvbmVcIl0sXG4gIFtTdGF0dXMuTGVuZ3RoUmVxdWlyZWQsIFwiTGVuZ3RoIFJlcXVpcmVkXCJdLFxuICBbU3RhdHVzLlByZWNvbmRpdGlvbkZhaWxlZCwgXCJQcmVjb25kaXRpb24gRmFpbGVkXCJdLFxuICBbU3RhdHVzLlJlcXVlc3RFbnRpdHlUb29MYXJnZSwgXCJSZXF1ZXN0IEVudGl0eSBUb28gTGFyZ2VcIl0sXG4gIFtTdGF0dXMuUmVxdWVzdFVSSVRvb0xvbmcsIFwiUmVxdWVzdCBVUkkgVG9vIExvbmdcIl0sXG4gIFtTdGF0dXMuVW5zdXBwb3J0ZWRNZWRpYVR5cGUsIFwiVW5zdXBwb3J0ZWQgTWVkaWEgVHlwZVwiXSxcbiAgW1N0YXR1cy5SZXF1ZXN0ZWRSYW5nZU5vdFNhdGlzZmlhYmxlLCBcIlJlcXVlc3RlZCBSYW5nZSBOb3QgU2F0aXNmaWFibGVcIl0sXG4gIFtTdGF0dXMuRXhwZWN0YXRpb25GYWlsZWQsIFwiRXhwZWN0YXRpb24gRmFpbGVkXCJdLFxuICBbU3RhdHVzLlRlYXBvdCwgXCJJJ20gYSB0ZWFwb3RcIl0sXG4gIFtTdGF0dXMuTWlzZGlyZWN0ZWRSZXF1ZXN0LCBcIk1pc2RpcmVjdGVkIFJlcXVlc3RcIl0sXG4gIFtTdGF0dXMuVW5wcm9jZXNzYWJsZUVudGl0eSwgXCJVbnByb2Nlc3NhYmxlIEVudGl0eVwiXSxcbiAgW1N0YXR1cy5Mb2NrZWQsIFwiTG9ja2VkXCJdLFxuICBbU3RhdHVzLkZhaWxlZERlcGVuZGVuY3ksIFwiRmFpbGVkIERlcGVuZGVuY3lcIl0sXG4gIFtTdGF0dXMuVG9vRWFybHksIFwiVG9vIEVhcmx5XCJdLFxuICBbU3RhdHVzLlVwZ3JhZGVSZXF1aXJlZCwgXCJVcGdyYWRlIFJlcXVpcmVkXCJdLFxuICBbU3RhdHVzLlByZWNvbmRpdGlvblJlcXVpcmVkLCBcIlByZWNvbmRpdGlvbiBSZXF1aXJlZFwiXSxcbiAgW1N0YXR1cy5Ub29NYW55UmVxdWVzdHMsIFwiVG9vIE1hbnkgUmVxdWVzdHNcIl0sXG4gIFtTdGF0dXMuUmVxdWVzdEhlYWRlckZpZWxkc1Rvb0xhcmdlLCBcIlJlcXVlc3QgSGVhZGVyIEZpZWxkcyBUb28gTGFyZ2VcIl0sXG4gIFtTdGF0dXMuVW5hdmFpbGFibGVGb3JMZWdhbFJlYXNvbnMsIFwiVW5hdmFpbGFibGUgRm9yIExlZ2FsIFJlYXNvbnNcIl0sXG4gIFtTdGF0dXMuSW50ZXJuYWxTZXJ2ZXJFcnJvciwgXCJJbnRlcm5hbCBTZXJ2ZXIgRXJyb3JcIl0sXG4gIFtTdGF0dXMuTm90SW1wbGVtZW50ZWQsIFwiTm90IEltcGxlbWVudGVkXCJdLFxuICBbU3RhdHVzLkJhZEdhdGV3YXksIFwiQmFkIEdhdGV3YXlcIl0sXG4gIFtTdGF0dXMuU2VydmljZVVuYXZhaWxhYmxlLCBcIlNlcnZpY2UgVW5hdmFpbGFibGVcIl0sXG4gIFtTdGF0dXMuR2F0ZXdheVRpbWVvdXQsIFwiR2F0ZXdheSBUaW1lb3V0XCJdLFxuICBbU3RhdHVzLkhUVFBWZXJzaW9uTm90U3VwcG9ydGVkLCBcIkhUVFAgVmVyc2lvbiBOb3QgU3VwcG9ydGVkXCJdLFxuICBbU3RhdHVzLlZhcmlhbnRBbHNvTmVnb3RpYXRlcywgXCJWYXJpYW50IEFsc28gTmVnb3RpYXRlc1wiXSxcbiAgW1N0YXR1cy5JbnN1ZmZpY2llbnRTdG9yYWdlLCBcIkluc3VmZmljaWVudCBTdG9yYWdlXCJdLFxuICBbU3RhdHVzLkxvb3BEZXRlY3RlZCwgXCJMb29wIERldGVjdGVkXCJdLFxuICBbU3RhdHVzLk5vdEV4dGVuZGVkLCBcIk5vdCBFeHRlbmRlZFwiXSxcbiAgW1N0YXR1cy5OZXR3b3JrQXV0aGVudGljYXRpb25SZXF1aXJlZCwgXCJOZXR3b3JrIEF1dGhlbnRpY2F0aW9uIFJlcXVpcmVkXCJdLFxuXSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZU8sTUFBTTtVQUFELE1BQU07SUFBTixNQUFNLENBQU4sTUFBTSxDQUNoQixFQUFzQixBQUF0QixrQkFBc0IsQUFBdEIsRUFBc0IsQ0FDdEIsQ0FBUSxhQUFHLEdBQUcsSUFBZCxDQUFR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