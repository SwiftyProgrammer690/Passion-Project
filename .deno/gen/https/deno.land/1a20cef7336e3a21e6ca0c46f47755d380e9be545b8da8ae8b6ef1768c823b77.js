export function addSignalListener(...args) {
    if (typeof Deno.addSignalListener == "function") {
        return Deno.addSignalListener(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function createHttpClient(...args) {
    if (typeof Deno.createHttpClient == "function") {
        return Deno.createHttpClient(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function consoleSize(...args) {
    if (typeof Deno.consoleSize == "function") {
        return Deno.consoleSize(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function futime(...args) {
    if (typeof Deno.futime == "function") {
        return Deno.futime(...args);
    } else {
        return Promise.reject(new TypeError("Requires --unstable"));
    }
}
export function futimeSync(...args) {
    if (typeof Deno.futimeSync == "function") {
        return Deno.futimeSync(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function getUid(...args) {
    if (typeof Deno.getUid == "function") {
        return Deno.getUid(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function hostname(...args) {
    if (typeof Deno.hostname == "function") {
        return Deno.hostname(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function loadavg(...args) {
    if (typeof Deno.loadavg == "function") {
        return Deno.loadavg(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function osRelease(...args) {
    if (typeof Deno.osRelease == "function") {
        return Deno.osRelease(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function removeSignalListener(...args) {
    if (typeof Deno.removeSignalListener == "function") {
        return Deno.removeSignalListener(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function setRaw(...args) {
    if (typeof Deno.setRaw == "function") {
        return Deno.setRaw(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function systemMemoryInfo(...args) {
    if (typeof Deno.systemMemoryInfo == "function") {
        return Deno.systemMemoryInfo(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function utime(...args) {
    if (typeof Deno.utime == "function") {
        return Deno.utime(...args);
    } else {
        return Promise.reject(new TypeError("Requires --unstable"));
    }
}
export function utimeSync(...args) {
    if (typeof Deno.utimeSync == "function") {
        return Deno.utimeSync(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function networkInterfaces(...args) {
    if (typeof Deno.networkInterfaces == "function") {
        return Deno.networkInterfaces(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export async function connect(options) {
    return await Deno.connect(options);
}
export function listen(options) {
    return Deno.listen(options);
}
export function listenDatagram(options) {
    return Deno.listenDatagram(options);
}
export function ListenerRef(listener, ...args) {
    if (typeof listener.ref == "function") {
        return listener.ref(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
export function ListenerUnref(listener, ...args) {
    if (typeof listener.unref == "function") {
        return listener.unref(...args);
    } else {
        throw new TypeError("Requires --unstable");
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE0Ny4wL19kZW5vX3Vuc3RhYmxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgdGhlIERlbm8gYXV0aG9ycy4gQWxsIHJpZ2h0cyByZXNlcnZlZC4gTUlUIGxpY2Vuc2UuXG4vLyBAdHMtbm9jaGVjayBCeXBhc3Mgc3RhdGljIGVycm9ycyBmb3IgbWlzc2luZyAtLXVuc3RhYmxlLlxuXG5leHBvcnQgdHlwZSBIdHRwQ2xpZW50ID0gRGVuby5IdHRwQ2xpZW50O1xuZXhwb3J0IHR5cGUgVW5peENvbm5lY3RPcHRpb25zID0gRGVuby5Vbml4Q29ubmVjdE9wdGlvbnM7XG5leHBvcnQgdHlwZSBVbml4TGlzdGVuT3B0aW9ucyA9IERlbm8uVW5peExpc3Rlbk9wdGlvbnM7XG5leHBvcnQgdHlwZSBEYXRhZ3JhbUNvbm4gPSBEZW5vLkRhdGFncmFtQ29ubjtcblxuZXhwb3J0IGZ1bmN0aW9uIGFkZFNpZ25hbExpc3RlbmVyKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBEZW5vLmFkZFNpZ25hbExpc3RlbmVyPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5hZGRTaWduYWxMaXN0ZW5lcj4ge1xuICBpZiAodHlwZW9mIERlbm8uYWRkU2lnbmFsTGlzdGVuZXIgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIERlbm8uYWRkU2lnbmFsTGlzdGVuZXIoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUh0dHBDbGllbnQoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIERlbm8uY3JlYXRlSHR0cENsaWVudD5cbik6IFJldHVyblR5cGU8dHlwZW9mIERlbm8uY3JlYXRlSHR0cENsaWVudD4ge1xuICBpZiAodHlwZW9mIERlbm8uY3JlYXRlSHR0cENsaWVudCA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gRGVuby5jcmVhdGVIdHRwQ2xpZW50KC4uLmFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJSZXF1aXJlcyAtLXVuc3RhYmxlXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb25zb2xlU2l6ZShcbiAgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgRGVuby5jb25zb2xlU2l6ZT5cbik6IFJldHVyblR5cGU8dHlwZW9mIERlbm8uY29uc29sZVNpemU+IHtcbiAgaWYgKHR5cGVvZiBEZW5vLmNvbnNvbGVTaXplID09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBEZW5vLmNvbnNvbGVTaXplKC4uLmFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJSZXF1aXJlcyAtLXVuc3RhYmxlXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmdXRpbWUoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIERlbm8uZnV0aW1lPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5mdXRpbWU+IHtcbiAgaWYgKHR5cGVvZiBEZW5vLmZ1dGltZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gRGVuby5mdXRpbWUoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIFByb21pc2UucmVqZWN0KG5ldyBUeXBlRXJyb3IoXCJSZXF1aXJlcyAtLXVuc3RhYmxlXCIpKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gZnV0aW1lU3luYyhcbiAgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgRGVuby5mdXRpbWVTeW5jPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5mdXRpbWVTeW5jPiB7XG4gIGlmICh0eXBlb2YgRGVuby5mdXRpbWVTeW5jID09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBEZW5vLmZ1dGltZVN5bmMoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVpZChcbiAgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgRGVuby5nZXRVaWQ+XG4pOiBSZXR1cm5UeXBlPHR5cGVvZiBEZW5vLmdldFVpZD4ge1xuICBpZiAodHlwZW9mIERlbm8uZ2V0VWlkID09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBEZW5vLmdldFVpZCguLi5hcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVxdWlyZXMgLS11bnN0YWJsZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gaG9zdG5hbWUoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIERlbm8uaG9zdG5hbWU+XG4pOiBSZXR1cm5UeXBlPHR5cGVvZiBEZW5vLmhvc3RuYW1lPiB7XG4gIGlmICh0eXBlb2YgRGVuby5ob3N0bmFtZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gRGVuby5ob3N0bmFtZSguLi5hcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVxdWlyZXMgLS11bnN0YWJsZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbG9hZGF2ZyhcbiAgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgRGVuby5sb2FkYXZnPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5sb2FkYXZnPiB7XG4gIGlmICh0eXBlb2YgRGVuby5sb2FkYXZnID09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBEZW5vLmxvYWRhdmcoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG9zUmVsZWFzZShcbiAgLi4uYXJnczogUGFyYW1ldGVyczx0eXBlb2YgRGVuby5vc1JlbGVhc2U+XG4pOiBSZXR1cm5UeXBlPHR5cGVvZiBEZW5vLm9zUmVsZWFzZT4ge1xuICBpZiAodHlwZW9mIERlbm8ub3NSZWxlYXNlID09IFwiZnVuY3Rpb25cIikge1xuICAgIHJldHVybiBEZW5vLm9zUmVsZWFzZSguLi5hcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVxdWlyZXMgLS11bnN0YWJsZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gcmVtb3ZlU2lnbmFsTGlzdGVuZXIoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIERlbm8ucmVtb3ZlU2lnbmFsTGlzdGVuZXI+XG4pOiBSZXR1cm5UeXBlPHR5cGVvZiBEZW5vLnJlbW92ZVNpZ25hbExpc3RlbmVyPiB7XG4gIGlmICh0eXBlb2YgRGVuby5yZW1vdmVTaWduYWxMaXN0ZW5lciA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gRGVuby5yZW1vdmVTaWduYWxMaXN0ZW5lciguLi5hcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVxdWlyZXMgLS11bnN0YWJsZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gc2V0UmF3KFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBEZW5vLnNldFJhdz5cbik6IFJldHVyblR5cGU8dHlwZW9mIERlbm8uc2V0UmF3PiB7XG4gIGlmICh0eXBlb2YgRGVuby5zZXRSYXcgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIERlbm8uc2V0UmF3KC4uLmFyZ3MpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCJSZXF1aXJlcyAtLXVuc3RhYmxlXCIpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBzeXN0ZW1NZW1vcnlJbmZvKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBEZW5vLnN5c3RlbU1lbW9yeUluZm8+XG4pOiBSZXR1cm5UeXBlPHR5cGVvZiBEZW5vLnN5c3RlbU1lbW9yeUluZm8+IHtcbiAgaWYgKHR5cGVvZiBEZW5vLnN5c3RlbU1lbW9yeUluZm8gPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIERlbm8uc3lzdGVtTWVtb3J5SW5mbyguLi5hcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVxdWlyZXMgLS11bnN0YWJsZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdXRpbWUoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIERlbm8udXRpbWU+XG4pOiBSZXR1cm5UeXBlPHR5cGVvZiBEZW5vLnV0aW1lPiB7XG4gIGlmICh0eXBlb2YgRGVuby51dGltZSA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gRGVuby51dGltZSguLi5hcmdzKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gUHJvbWlzZS5yZWplY3QobmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIikpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB1dGltZVN5bmMoXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8dHlwZW9mIERlbm8udXRpbWVTeW5jPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby51dGltZVN5bmM+IHtcbiAgaWYgKHR5cGVvZiBEZW5vLnV0aW1lU3luYyA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gRGVuby51dGltZVN5bmMoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG5ldHdvcmtJbnRlcmZhY2VzKFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBEZW5vLm5ldHdvcmtJbnRlcmZhY2VzPlxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5uZXR3b3JrSW50ZXJmYWNlcz4ge1xuICBpZiAodHlwZW9mIERlbm8ubmV0d29ya0ludGVyZmFjZXMgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIERlbm8ubmV0d29ya0ludGVyZmFjZXMoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbm5lY3QoXG4gIG9wdGlvbnM6IFVuaXhDb25uZWN0T3B0aW9ucyxcbik6IFByb21pc2U8RGVuby5Vbml4Q29ubj4ge1xuICByZXR1cm4gYXdhaXQgRGVuby5jb25uZWN0KG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuKFxuICBvcHRpb25zOiBVbml4TGlzdGVuT3B0aW9ucyAmIHsgdHJhbnNwb3J0OiBcInVuaXhcIiB9LFxuKTogUmV0dXJuVHlwZTx0eXBlb2YgRGVuby5saXN0ZW4+IHtcbiAgcmV0dXJuIERlbm8ubGlzdGVuKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbGlzdGVuRGF0YWdyYW0oXG4gIG9wdGlvbnM6IERlbm8uTGlzdGVuT3B0aW9ucyAmIHsgdHJhbnNwb3J0OiBcInVkcFwiIH0sXG4pOiBSZXR1cm5UeXBlPHR5cGVvZiBEZW5vLmxpc3RlbkRhdGFncmFtPiB7XG4gIHJldHVybiBEZW5vLmxpc3RlbkRhdGFncmFtKG9wdGlvbnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gTGlzdGVuZXJSZWYoXG4gIGxpc3RlbmVyOiBEZW5vLkxpc3RlbmVyLFxuICAuLi5hcmdzOiBQYXJhbWV0ZXJzPERlbm8uTGlzdGVuZXJbXCJyZWZcIl0+XG4pOiBSZXR1cm5UeXBlPERlbm8uTGlzdGVuZXJbXCJyZWZcIl0+IHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lci5yZWYgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgcmV0dXJuIGxpc3RlbmVyLnJlZiguLi5hcmdzKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiUmVxdWlyZXMgLS11bnN0YWJsZVwiKTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gTGlzdGVuZXJVbnJlZihcbiAgbGlzdGVuZXI6IERlbm8uTGlzdGVuZXIsXG4gIC4uLmFyZ3M6IFBhcmFtZXRlcnM8RGVuby5MaXN0ZW5lcltcInVucmVmXCJdPlxuKTogUmV0dXJuVHlwZTxEZW5vLkxpc3RlbmVyW1widW5yZWZcIl0+IHtcbiAgaWYgKHR5cGVvZiBsaXN0ZW5lci51bnJlZiA9PSBcImZ1bmN0aW9uXCIpIHtcbiAgICByZXR1cm4gbGlzdGVuZXIudW5yZWYoLi4uYXJncyk7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIlJlcXVpcmVzIC0tdW5zdGFibGVcIik7XG4gIH1cbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFRQSxPQUFPLFNBQVMsaUJBQWlCLENBQy9CLEdBQUcsSUFBSSxBQUEyQyxFQUNQO0lBQzNDLElBQUksT0FBTyxJQUFJLENBQUMsaUJBQWlCLElBQUksVUFBVSxFQUFFO1FBQy9DLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixJQUFJLElBQUksQ0FBQyxDQUFDO0tBQ3hDLE1BQU07UUFDTCxNQUFNLElBQUksU0FBUyxDQUFDLHFCQUFxQixDQUFDLENBQUM7S0FDNUM7Q0FDRjtBQUVELE9BQU8sU0FBUyxnQkFBZ0IsQ0FDOUIsR0FBRyxJQUFJLEFBQTBDLEVBQ1A7SUFDMUMsSUFBSSxPQUFPLElBQUksQ0FBQyxnQkFBZ0IsSUFBSSxVQUFVLEVBQUU7UUFDOUMsT0FBTyxJQUFJLENBQUMsZ0JBQWdCLElBQUksSUFBSSxDQUFDLENBQUM7S0FDdkMsTUFBTTtRQUNMLE1BQU0sSUFBSSxTQUFTLENBQUMscUJBQXFCLENBQUMsQ0FBQztLQUM1QztDQUNGO0FBRUQsT0FBTyxTQUFTLFdBQVcsQ0FDekIsR0FBRyxJQUFJLEFBQXFDLEVBQ1A7SUFDckMsSUFBSSxPQUFPLElBQUksQ0FBQyxXQUFXLElB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