// Copyright 2018-2022 the Deno authors. All rights reserved. MIT license.
/**
 * This module is browser compatible.
 *
 * @module
 */ import { assert } from "../_util/assert.ts";
const { hasOwn  } = Object;
function get(obj, key) {
    if (hasOwn(obj, key)) {
        return obj[key];
    }
}
function getForce(obj, key) {
    const v = get(obj, key);
    assert(v != null);
    return v;
}
function isNumber(x) {
    if (typeof x === "number") return true;
    if (/^0x[0-9a-f]+$/i.test(String(x))) return true;
    return /^[-+]?(?:\d+(?:\.\d*)?|\.\d+)(e[-+]?\d+)?$/.test(String(x));
}
function hasKey(obj, keys) {
    let o = obj;
    keys.slice(0, -1).forEach((key)=>{
        o = get(o, key) ?? {};
    });
    const key = keys[keys.length - 1];
    return key in o;
}
/** Take a set of command line arguments, optionally with a set of options, and
 * return an object representing the flags found in the passed arguments.
 *
 * By default any arguments starting with `-` or `--` are considered boolean
 * flags. If the argument name is followed by an equal sign (`=`) it is
 * considered a key-value pair. Any arguments which could not be parsed are
 * available in the `_` property of the returned object.
 *
 * ```ts
 * import { parse } from "./mod.ts";
 * const parsedArgs = parse(Deno.args);
 * ```
 *
 * ```ts
 * import { parse } from "./mod.ts";
 * const parsedArgs = parse(["--foo", "--bar=baz", "--no-qux", "./quux.txt"]);
 * // parsedArgs: { foo: true, bar: "baz", qux: false, _: ["./quux.txt"] }
 * ```
 */ export function parse(args, { "--": doubleDash = false , alias ={} , boolean =false , default: defaults = {} , stopEarly =false , string =[] , unknown =(i)=>i  } = {}) {
    const flags = {
        bools: {},
        strings: {},
        unknownFn: unknown,
        allBools: false
    };
    if (boolean !== undefined) {
        if (typeof boolean === "boolean") {
            flags.allBools = !!boolean;
        } else {
            const booleanArgs = typeof boolean === "string" ? [
                boolean
            ] : boolean;
            for (const key of booleanArgs.filter(Boolean)){
                flags.bools[key] = true;
            }
        }
    }
    const aliases = {};
    if (alias !== undefined) {
        for(const key1 in alias){
            const val = getForce(alias, key1);
            if (typeof val === "string") {
                aliases[key1] = [
                    val
                ];
            } else {
                aliases[key1] = val;
            }
            for (const alias1 of getForce(aliases, key1)){
                aliases[alias1] = [
                    key1
                ].concat(aliases[key1].filter((y)=>alias1 !== y));
            }
        }
    }
    if (string !== undefined) {
        const stringArgs = typeof string === "string" ? [
            string
        ] : string;
        for (const key2 of stringArgs.filter(Boolean)){
            flags.strings[key2] = true;
            const alias2 = get(aliases, key2);
            if (alias2) {
                for (const al of alias2){
                    flags.strings[al] = true;
                }
            }
        }
    }
    const argv = {
        _: []
    };
    function argDefined(key, arg) {
        return flags.allBools && /^--[^=]+$/.test(arg) || get(flags.bools, key) || !!get(flags.strings, key) || !!get(aliases, key);
    }
    function setKey(obj, keys, value) {
        let o = obj;
        keys.slice(0, -1).forEach(function(key) {
            if (get(o, key) === undefined) {
                o[key] = {};
            }
            o = get(o, key);
        });
        const key = keys[keys.length - 1];
        if (get(o, key) === undefined || get(flags.bools, key) || typeof get(o, key) === "boolean") {
            o[key] = value;
        } else if (Array.isArray(get(o, key))) {
            o[key].push(value);
        } else {
            o[key] = [
                get(o, key),
                value
            ];
        }
    }
    function setArg(key, val, arg = undefined) {
        if (arg && flags.unknownFn && !argDefined(key, arg)) {
            if (flags.unknownFn(arg, key, val) === false) return;
        }
        const value = !get(flags.strings, key) && isNumber(val) ? Number(val) : val;
        setKey(argv, key.split("."), value);
        const alias = get(aliases, key);
        if (alias) {
            for (const x of alias){
                setKey(argv, x.split("."), value);
            }
        }
    }
    function aliasIsBoolean(key) {
        return getForce(aliases, key).some((x)=>typeof get(flags.bools, x) === "boolean");
    }
    for (const key3 of Object.keys(flags.bools)){
        setArg(key3, defaults[key3] === undefined ? false : defaults[key3]);
    }
    let notFlags = [];
    // all args after "--" are not parsed
    if (args.includes("--")) {
        notFlags = args.slice(args.indexOf("--") + 1);
        args = args.slice(0, args.indexOf("--"));
    }
    for(let i = 0; i < args.length; i++){
        const arg = args[i];
        if (/^--.+=/.test(arg)) {
            const m = arg.match(/^--([^=]+)=(.*)$/s);
            assert(m != null);
            const [, key4, value] = m;
            if (flags.bools[key4]) {
                const booleanValue = value !== "false";
                setArg(key4, booleanValue, arg);
            } else {
                setArg(key4, value, arg);
            }
        } else if (/^--no-.+/.test(arg)) {
            const m1 = arg.match(/^--no-(.+)/);
            assert(m1 != null);
            setArg(m1[1], false, arg);
        } else if (/^--.+/.test(arg)) {
            const m2 = arg.match(/^--(.+)/);
            assert(m2 != null);
            const [, key5] = m2;
            const next = args[i + 1];
            if (next !== undefined && !/^-/.test(next) && !get(flags.bools, key5) && !flags.allBools && (get(aliases, key5) ? !aliasIsBoolean(key5) : true)) {
                setArg(key5, next, arg);
                i++;
            } else if (/^(true|false)$/.test(next)) {
                setArg(key5, next === "true", arg);
                i++;
            } else {
                setArg(key5, get(flags.strings, key5) ? "" : true, arg);
            }
        } else if (/^-[^-]+/.test(arg)) {
            const letters = arg.slice(1, -1).split("");
            let broken = false;
            for(let j = 0; j < letters.length; j++){
                const next1 = arg.slice(j + 2);
                if (next1 === "-") {
                    setArg(letters[j], next1, arg);
                    continue;
                }
                if (/[A-Za-z]/.test(letters[j]) && /=/.test(next1)) {
                    setArg(letters[j], next1.split(/=(.+)/)[1], arg);
                    broken = true;
                    break;
                }
                if (/[A-Za-z]/.test(letters[j]) && /-?\d+(\.\d*)?(e-?\d+)?$/.test(next1)) {
                    setArg(letters[j], next1, arg);
                    broken = true;
                    break;
                }
                if (letters[j + 1] && letters[j + 1].match(/\W/)) {
                    setArg(letters[j], arg.slice(j + 2), arg);
                    broken = true;
                    break;
                } else {
                    setArg(letters[j], get(flags.strings, letters[j]) ? "" : true, arg);
                }
            }
            const [key6] = arg.slice(-1);
            if (!broken && key6 !== "-") {
                if (args[i + 1] && !/^(-|--)[^-]/.test(args[i + 1]) && !get(flags.bools, key6) && (get(aliases, key6) ? !aliasIsBoolean(key6) : true)) {
                    setArg(key6, args[i + 1], arg);
                    i++;
                } else if (args[i + 1] && /^(true|false)$/.test(args[i + 1])) {
                    setArg(key6, args[i + 1] === "true", arg);
                    i++;
                } else {
                    setArg(key6, get(flags.strings, key6) ? "" : true, arg);
                }
            }
        } else {
            if (!flags.unknownFn || flags.unknownFn(arg) !== false) {
                argv._.push(flags.strings["_"] ?? !isNumber(arg) ? arg : Number(arg));
            }
            if (stopEarly) {
                argv._.push(...args.slice(i + 1));
                break;
            }
        }
    }
    for (const key7 of Object.keys(defaults)){
        if (!hasKey(argv, key7.split("."))) {
            setKey(argv, key7.split("."), defaults[key7]);
            if (aliases[key7]) {
                for (const x of aliases[key7]){
                    setKey(argv, x.split("."), defaults[key7]);
                }
            }
        }
    }
    if (doubleDash) {
        argv["--"] = [];
        for (const key8 of notFlags){
            argv["--"].push(key8);
        }
    } else {
        for (const key9 of notFlags){
            argv._.push(key9);
        }
    }
    return argv;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjE0MC4wL2ZsYWdzL21vZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuLyoqXG4gKiBUaGlzIG1vZHVsZSBpcyBicm93c2VyIGNvbXBhdGlibGUuXG4gKlxuICogQG1vZHVsZVxuICovXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tIFwiLi4vX3V0aWwvYXNzZXJ0LnRzXCI7XG5cbi8qKiBUaGUgdmFsdWUgcmV0dXJuZWQgZnJvbSBgcGFyc2VgLiAqL1xuZXhwb3J0IGludGVyZmFjZSBBcmdzIHtcbiAgLyoqIENvbnRhaW5zIGFsbCB0aGUgYXJndW1lbnRzIHRoYXQgZGlkbid0IGhhdmUgYW4gb3B0aW9uIGFzc29jaWF0ZWQgd2l0aFxuICAgKiB0aGVtLiAqL1xuICBfOiBBcnJheTxzdHJpbmcgfCBudW1iZXI+O1xuICAvLyBkZW5vLWxpbnQtaWdub3JlIG5vLWV4cGxpY2l0LWFueVxuICBba2V5OiBzdHJpbmddOiBhbnk7XG59XG5cbi8qKiBUaGUgb3B0aW9ucyBmb3IgdGhlIGBwYXJzZWAgY2FsbC4gKi9cbmV4cG9ydCBpbnRlcmZhY2UgUGFyc2VPcHRpb25zIHtcbiAgLyoqIFdoZW4gYHRydWVgLCBwb3B1bGF0ZSB0aGUgcmVzdWx0IGBfYCB3aXRoIGV2ZXJ5dGhpbmcgYmVmb3JlIHRoZSBgLS1gIGFuZFxuICAgKiB0aGUgcmVzdWx0IGBbJy0tJ11gIHdpdGggZXZlcnl0aGluZyBhZnRlciB0aGUgYC0tYC4gSGVyZSdzIGFuIGV4YW1wbGU6XG4gICAqXG4gICAqIGBgYHRzXG4gICAqIC8vICQgZGVubyBydW4gZXhhbXBsZS50cyAtLSBhIGFyZzFcbiAgICogaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiLi9tb2QudHNcIjtcbiAgICogY29uc29sZS5kaXIocGFyc2UoRGVuby5hcmdzLCB7IFwiLS1cIjogZmFsc2UgfSkpO1xuICAgKiAvLyBvdXRwdXQ6IHsgXzogWyBcImFcIiwgXCJhcmcxXCIgXSB9XG4gICAqIGNvbnNvbGUuZGlyKHBhcnNlKERlbm8uYXJncywgeyBcIi0tXCI6IHRydWUgfSkpO1xuICAgKiAvLyBvdXRwdXQ6IHsgXzogW10sIC0tOiBbIFwiYVwiLCBcImFyZzFcIiBdIH1cbiAgICogYGBgXG4gICAqXG4gICAqIERlZmF1bHRzIHRvIGBmYWxzZWAuXG4gICAqL1xuICBcIi0tXCI/OiBib29sZWFuO1xuXG4gIC8qKiBBbiBvYmplY3QgbWFwcGluZyBzdHJpbmcgbmFtZXMgdG8gc3RyaW5ncyBvciBhcnJheXMgb2Ygc3RyaW5nIGFyZ3VtZW50XG4gICAqIG5hbWVzIHRvIHVzZSBhcyBhbGlhc2VzLiAqL1xuICBhbGlhcz86IFJlY29yZDxzdHJpbmcsIHN0cmluZyB8IHN0cmluZ1tdPjtcblxuICAvKiogQSBib29sZWFuLCBzdHJpbmcgb3IgYXJyYXkgb2Ygc3RyaW5ncyB0byBhbHdheXMgdHJlYXQgYXMgYm9vbGVhbnMuIElmXG4gICAqIGB0cnVlYCB3aWxsIHRyZWF0IGFsbCBkb3VibGUgaHlwaGVuYXRlZCBhcmd1bWVudHMgd2l0aG91dCBlcXVhbCBzaWducyBhc1xuICAgKiBgYm9vbGVhbmAgKGUuZy4gYWZmZWN0cyBgLS1mb29gLCBub3QgYC1mYCBvciBgLS1mb289YmFyYCkgKi9cbiAgYm9vbGVhbj86IGJvb2xlYW4gfCBzdHJpbmcgfCBzdHJpbmdbXTtcblxuICAvKiogQW4gb2JqZWN0IG1hcHBpbmcgc3RyaW5nIGFyZ3VtZW50IG5hbWVzIHRvIGRlZmF1bHQgdmFsdWVzLiAqL1xuICBkZWZhdWx0PzogUmVjb3JkPHN0cmluZywgdW5rbm93bj47XG5cbiAgLyoqIFdoZW4gYHRydWVgLCBwb3B1bGF0ZSB0aGUgcmVzdWx0IGBfYCB3aXRoIGV2ZXJ5dGhpbmcgYWZ0ZXIgdGhlIGZpcnN0XG4gICAqIG5vbi1vcHRpb24uICovXG4gIHN0b3BFYXJseT86IGJvb2xlYW47XG5cbiAgLyoqIEEgc3RyaW5nIG9yIGFycmF5IG9mIHN0cmluZ3MgYXJndW1lbnQgbmFtZXMgdG8gYWx3YXlzIHRyZWF0IGFzIHN0cmluZ3MuICovXG4gIHN0cmluZz86IHN0cmluZyB8IHN0cmluZ1tdO1xuXG4gIC8qKiBBIGZ1bmN0aW9uIHdoaWNoIGlzIGludm9rZWQgd2l0aCBhIGNvbW1hbmQgbGluZSBwYXJhbWV0ZXIgbm90IGRlZmluZWQgaW5cbiAgICogdGhlIGBvcHRpb25zYCBjb25maWd1cmF0aW9uIG9iamVjdC4gSWYgdGhlIGZ1bmN0aW9uIHJldHVybnMgYGZhbHNlYCwgdGhlXG4gICAqIHVua25vd24gb3B0aW9uIGlzIG5vdCBhZGRlZCB0byBgcGFyc2VkQXJnc2AuICovXG4gIHVua25vd24/OiAoYXJnOiBzdHJpbmcsIGtleT86IHN0cmluZywgdmFsdWU/OiB1bmtub3duKSA9PiB1bmtub3duO1xufVxuXG5pbnRlcmZhY2UgRmxhZ3Mge1xuICBib29sczogUmVjb3JkPHN0cmluZywgYm9vbGVhbj47XG4gIHN0cmluZ3M6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xuICB1bmtub3duRm46IChhcmc6IHN0cmluZywga2V5Pzogc3RyaW5nLCB2YWx1ZT86IHVua25vd24pID0+IHVua25vd247XG4gIGFsbEJvb2xzOiBib29sZWFuO1xufVxuXG5pbnRlcmZhY2UgTmVzdGVkTWFwcGluZyB7XG4gIFtrZXk6IHN0cmluZ106IE5lc3RlZE1hcHBpbmcgfCB1bmtub3duO1xufVxuXG5jb25zdCB7IGhhc093biB9ID0gT2JqZWN0O1xuXG5mdW5jdGlvbiBnZXQ8VD4ob2JqOiBSZWNvcmQ8c3RyaW5nLCBUPiwga2V5OiBzdHJpbmcpOiBUIHwgdW5kZWZpbmVkIHtcbiAgaWYgKGhhc093bihvYmosIGtleSkpIHtcbiAgICByZXR1cm4gb2JqW2tleV07XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0Rm9yY2U8VD4ob2JqOiBSZWNvcmQ8c3RyaW5nLCBUPiwga2V5OiBzdHJpbmcpOiBUIHtcbiAgY29uc3QgdiA9IGdldChvYmosIGtleSk7XG4gIGFzc2VydCh2ICE9IG51bGwpO1xuICByZXR1cm4gdjtcbn1cblxuZnVuY3Rpb24gaXNOdW1iZXIoeDogdW5rbm93bik6IGJvb2xlYW4ge1xuICBpZiAodHlwZW9mIHggPT09IFwibnVtYmVyXCIpIHJldHVybiB0cnVlO1xuICBpZiAoL14weFswLTlhLWZdKyQvaS50ZXN0KFN0cmluZyh4KSkpIHJldHVybiB0cnVlO1xuICByZXR1cm4gL15bLStdPyg/OlxcZCsoPzpcXC5cXGQqKT98XFwuXFxkKykoZVstK10/XFxkKyk/JC8udGVzdChTdHJpbmcoeCkpO1xufVxuXG5mdW5jdGlvbiBoYXNLZXkob2JqOiBOZXN0ZWRNYXBwaW5nLCBrZXlzOiBzdHJpbmdbXSk6IGJvb2xlYW4ge1xuICBsZXQgbyA9IG9iajtcbiAga2V5cy5zbGljZSgwLCAtMSkuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgbyA9IChnZXQobywga2V5KSA/PyB7fSkgYXMgTmVzdGVkTWFwcGluZztcbiAgfSk7XG5cbiAgY29uc3Qga2V5ID0ga2V5c1trZXlzLmxlbmd0aCAtIDFdO1xuICByZXR1cm4ga2V5IGluIG87XG59XG5cbi8qKiBUYWtlIGEgc2V0IG9mIGNvbW1hbmQgbGluZSBhcmd1bWVudHMsIG9wdGlvbmFsbHkgd2l0aCBhIHNldCBvZiBvcHRpb25zLCBhbmRcbiAqIHJldHVybiBhbiBvYmplY3QgcmVwcmVzZW50aW5nIHRoZSBmbGFncyBmb3VuZCBpbiB0aGUgcGFzc2VkIGFyZ3VtZW50cy5cbiAqXG4gKiBCeSBkZWZhdWx0IGFueSBhcmd1bWVudHMgc3RhcnRpbmcgd2l0aCBgLWAgb3IgYC0tYCBhcmUgY29uc2lkZXJlZCBib29sZWFuXG4gKiBmbGFncy4gSWYgdGhlIGFyZ3VtZW50IG5hbWUgaXMgZm9sbG93ZWQgYnkgYW4gZXF1YWwgc2lnbiAoYD1gKSBpdCBpc1xuICogY29uc2lkZXJlZCBhIGtleS12YWx1ZSBwYWlyLiBBbnkgYXJndW1lbnRzIHdoaWNoIGNvdWxkIG5vdCBiZSBwYXJzZWQgYXJlXG4gKiBhdmFpbGFibGUgaW4gdGhlIGBfYCBwcm9wZXJ0eSBvZiB0aGUgcmV0dXJuZWQgb2JqZWN0LlxuICpcbiAqIGBgYHRzXG4gKiBpbXBvcnQgeyBwYXJzZSB9IGZyb20gXCIuL21vZC50c1wiO1xuICogY29uc3QgcGFyc2VkQXJncyA9IHBhcnNlKERlbm8uYXJncyk7XG4gKiBgYGBcbiAqXG4gKiBgYGB0c1xuICogaW1wb3J0IHsgcGFyc2UgfSBmcm9tIFwiLi9tb2QudHNcIjtcbiAqIGNvbnN0IHBhcnNlZEFyZ3MgPSBwYXJzZShbXCItLWZvb1wiLCBcIi0tYmFyPWJhelwiLCBcIi0tbm8tcXV4XCIsIFwiLi9xdXV4LnR4dFwiXSk7XG4gKiAvLyBwYXJzZWRBcmdzOiB7IGZvbzogdHJ1ZSwgYmFyOiBcImJhelwiLCBxdXg6IGZhbHNlLCBfOiBbXCIuL3F1dXgudHh0XCJdIH1cbiAqIGBgYFxuICovXG5leHBvcnQgZnVuY3Rpb24gcGFyc2UoXG4gIGFyZ3M6IHN0cmluZ1tdLFxuICB7XG4gICAgXCItLVwiOiBkb3VibGVEYXNoID0gZmFsc2UsXG4gICAgYWxpYXMgPSB7fSxcbiAgICBib29sZWFuID0gZmFsc2UsXG4gICAgZGVmYXVsdDogZGVmYXVsdHMgPSB7fSxcbiAgICBzdG9wRWFybHkgPSBmYWxzZSxcbiAgICBzdHJpbmcgPSBbXSxcbiAgICB1bmtub3duID0gKGk6IHN0cmluZyk6IHVua25vd24gPT4gaSxcbiAgfTogUGFyc2VPcHRpb25zID0ge30sXG4pOiBBcmdzIHtcbiAgY29uc3QgZmxhZ3M6IEZsYWdzID0ge1xuICAgIGJvb2xzOiB7fSxcbiAgICBzdHJpbmdzOiB7fSxcbiAgICB1bmtub3duRm46IHVua25vd24sXG4gICAgYWxsQm9vbHM6IGZhbHNlLFxuICB9O1xuXG4gIGlmIChib29sZWFuICE9PSB1bmRlZmluZWQpIHtcbiAgICBpZiAodHlwZW9mIGJvb2xlYW4gPT09IFwiYm9vbGVhblwiKSB7XG4gICAgICBmbGFncy5hbGxCb29scyA9ICEhYm9vbGVhbjtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgYm9vbGVhbkFyZ3MgPSB0eXBlb2YgYm9vbGVhbiA9PT0gXCJzdHJpbmdcIiA/IFtib29sZWFuXSA6IGJvb2xlYW47XG5cbiAgICAgIGZvciAoY29uc3Qga2V5IG9mIGJvb2xlYW5BcmdzLmZpbHRlcihCb29sZWFuKSkge1xuICAgICAgICBmbGFncy5ib29sc1trZXldID0gdHJ1ZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjb25zdCBhbGlhc2VzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmdbXT4gPSB7fTtcbiAgaWYgKGFsaWFzICE9PSB1bmRlZmluZWQpIHtcbiAgICBmb3IgKGNvbnN0IGtleSBpbiBhbGlhcykge1xuICAgICAgY29uc3QgdmFsID0gZ2V0Rm9yY2UoYWxpYXMsIGtleSk7XG4gICAgICBpZiAodHlwZW9mIHZhbCA9PT0gXCJzdHJpbmdcIikge1xuICAgICAgICBhbGlhc2VzW2tleV0gPSBbdmFsXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGFsaWFzZXNba2V5XSA9IHZhbDtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgYWxpYXMgb2YgZ2V0Rm9yY2UoYWxpYXNlcywga2V5KSkge1xuICAgICAgICBhbGlhc2VzW2FsaWFzXSA9IFtrZXldLmNvbmNhdChhbGlhc2VzW2tleV0uZmlsdGVyKCh5KSA9PiBhbGlhcyAhPT0geSkpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmIChzdHJpbmcgIT09IHVuZGVmaW5lZCkge1xuICAgIGNvbnN0IHN0cmluZ0FyZ3MgPSB0eXBlb2Ygc3RyaW5nID09PSBcInN0cmluZ1wiID8gW3N0cmluZ10gOiBzdHJpbmc7XG5cbiAgICBmb3IgKGNvbnN0IGtleSBvZiBzdHJpbmdBcmdzLmZpbHRlcihCb29sZWFuKSkge1xuICAgICAgZmxhZ3Muc3RyaW5nc1trZXldID0gdHJ1ZTtcbiAgICAgIGNvbnN0IGFsaWFzID0gZ2V0KGFsaWFzZXMsIGtleSk7XG4gICAgICBpZiAoYWxpYXMpIHtcbiAgICAgICAgZm9yIChjb25zdCBhbCBvZiBhbGlhcykge1xuICAgICAgICAgIGZsYWdzLnN0cmluZ3NbYWxdID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGNvbnN0IGFyZ3Y6IEFyZ3MgPSB7IF86IFtdIH07XG5cbiAgZnVuY3Rpb24gYXJnRGVmaW5lZChrZXk6IHN0cmluZywgYXJnOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgKGZsYWdzLmFsbEJvb2xzICYmIC9eLS1bXj1dKyQvLnRlc3QoYXJnKSkgfHxcbiAgICAgIGdldChmbGFncy5ib29scywga2V5KSB8fFxuICAgICAgISFnZXQoZmxhZ3Muc3RyaW5ncywga2V5KSB8fFxuICAgICAgISFnZXQoYWxpYXNlcywga2V5KVxuICAgICk7XG4gIH1cblxuICBmdW5jdGlvbiBzZXRLZXkob2JqOiBOZXN0ZWRNYXBwaW5nLCBrZXlzOiBzdHJpbmdbXSwgdmFsdWU6IHVua25vd24pOiB2b2lkIHtcbiAgICBsZXQgbyA9IG9iajtcbiAgICBrZXlzLnNsaWNlKDAsIC0xKS5mb3JFYWNoKGZ1bmN0aW9uIChrZXkpOiB2b2lkIHtcbiAgICAgIGlmIChnZXQobywga2V5KSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIG9ba2V5XSA9IHt9O1xuICAgICAgfVxuICAgICAgbyA9IGdldChvLCBrZXkpIGFzIE5lc3RlZE1hcHBpbmc7XG4gICAgfSk7XG5cbiAgICBjb25zdCBrZXkgPSBrZXlzW2tleXMubGVuZ3RoIC0gMV07XG4gICAgaWYgKFxuICAgICAgZ2V0KG8sIGtleSkgPT09IHVuZGVmaW5lZCB8fFxuICAgICAgZ2V0KGZsYWdzLmJvb2xzLCBrZXkpIHx8XG4gICAgICB0eXBlb2YgZ2V0KG8sIGtleSkgPT09IFwiYm9vbGVhblwiXG4gICAgKSB7XG4gICAgICBvW2tleV0gPSB2YWx1ZTtcbiAgICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkoZ2V0KG8sIGtleSkpKSB7XG4gICAgICAob1trZXldIGFzIHVua25vd25bXSkucHVzaCh2YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9ba2V5XSA9IFtnZXQobywga2V5KSwgdmFsdWVdO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIHNldEFyZyhcbiAgICBrZXk6IHN0cmluZyxcbiAgICB2YWw6IHVua25vd24sXG4gICAgYXJnOiBzdHJpbmcgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQsXG4gICk6IHZvaWQge1xuICAgIGlmIChhcmcgJiYgZmxhZ3MudW5rbm93bkZuICYmICFhcmdEZWZpbmVkKGtleSwgYXJnKSkge1xuICAgICAgaWYgKGZsYWdzLnVua25vd25GbihhcmcsIGtleSwgdmFsKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB2YWx1ZSA9ICFnZXQoZmxhZ3Muc3RyaW5ncywga2V5KSAmJiBpc051bWJlcih2YWwpID8gTnVtYmVyKHZhbCkgOiB2YWw7XG4gICAgc2V0S2V5KGFyZ3YsIGtleS5zcGxpdChcIi5cIiksIHZhbHVlKTtcblxuICAgIGNvbnN0IGFsaWFzID0gZ2V0KGFsaWFzZXMsIGtleSk7XG4gICAgaWYgKGFsaWFzKSB7XG4gICAgICBmb3IgKGNvbnN0IHggb2YgYWxpYXMpIHtcbiAgICAgICAgc2V0S2V5KGFyZ3YsIHguc3BsaXQoXCIuXCIpLCB2YWx1ZSk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gYWxpYXNJc0Jvb2xlYW4oa2V5OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gZ2V0Rm9yY2UoYWxpYXNlcywga2V5KS5zb21lKFxuICAgICAgKHgpID0+IHR5cGVvZiBnZXQoZmxhZ3MuYm9vbHMsIHgpID09PSBcImJvb2xlYW5cIixcbiAgICApO1xuICB9XG5cbiAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMoZmxhZ3MuYm9vbHMpKSB7XG4gICAgc2V0QXJnKGtleSwgZGVmYXVsdHNba2V5XSA9PT0gdW5kZWZpbmVkID8gZmFsc2UgOiBkZWZhdWx0c1trZXldKTtcbiAgfVxuXG4gIGxldCBub3RGbGFnczogc3RyaW5nW10gPSBbXTtcblxuICAvLyBhbGwgYXJncyBhZnRlciBcIi0tXCIgYXJlIG5vdCBwYXJzZWRcbiAgaWYgKGFyZ3MuaW5jbHVkZXMoXCItLVwiKSkge1xuICAgIG5vdEZsYWdzID0gYXJncy5zbGljZShhcmdzLmluZGV4T2YoXCItLVwiKSArIDEpO1xuICAgIGFyZ3MgPSBhcmdzLnNsaWNlKDAsIGFyZ3MuaW5kZXhPZihcIi0tXCIpKTtcbiAgfVxuXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgYXJncy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGFyZyA9IGFyZ3NbaV07XG5cbiAgICBpZiAoL14tLS4rPS8udGVzdChhcmcpKSB7XG4gICAgICBjb25zdCBtID0gYXJnLm1hdGNoKC9eLS0oW149XSspPSguKikkL3MpO1xuICAgICAgYXNzZXJ0KG0gIT0gbnVsbCk7XG4gICAgICBjb25zdCBbLCBrZXksIHZhbHVlXSA9IG07XG5cbiAgICAgIGlmIChmbGFncy5ib29sc1trZXldKSB7XG4gICAgICAgIGNvbnN0IGJvb2xlYW5WYWx1ZSA9IHZhbHVlICE9PSBcImZhbHNlXCI7XG4gICAgICAgIHNldEFyZyhrZXksIGJvb2xlYW5WYWx1ZSwgYXJnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHNldEFyZyhrZXksIHZhbHVlLCBhcmcpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoL14tLW5vLS4rLy50ZXN0KGFyZykpIHtcbiAgICAgIGNvbnN0IG0gPSBhcmcubWF0Y2goL14tLW5vLSguKykvKTtcbiAgICAgIGFzc2VydChtICE9IG51bGwpO1xuICAgICAgc2V0QXJnKG1bMV0sIGZhbHNlLCBhcmcpO1xuICAgIH0gZWxzZSBpZiAoL14tLS4rLy50ZXN0KGFyZykpIHtcbiAgICAgIGNvbnN0IG0gPSBhcmcubWF0Y2goL14tLSguKykvKTtcbiAgICAgIGFzc2VydChtICE9IG51bGwpO1xuICAgICAgY29uc3QgWywga2V5XSA9IG07XG4gICAgICBjb25zdCBuZXh0ID0gYXJnc1tpICsgMV07XG4gICAgICBpZiAoXG4gICAgICAgIG5leHQgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgICAhL14tLy50ZXN0KG5leHQpICYmXG4gICAgICAgICFnZXQoZmxhZ3MuYm9vbHMsIGtleSkgJiZcbiAgICAgICAgIWZsYWdzLmFsbEJvb2xzICYmXG4gICAgICAgIChnZXQoYWxpYXNlcywga2V5KSA/ICFhbGlhc0lzQm9vbGVhbihrZXkpIDogdHJ1ZSlcbiAgICAgICkge1xuICAgICAgICBzZXRBcmcoa2V5LCBuZXh0LCBhcmcpO1xuICAgICAgICBpKys7XG4gICAgICB9IGVsc2UgaWYgKC9eKHRydWV8ZmFsc2UpJC8udGVzdChuZXh0KSkge1xuICAgICAgICBzZXRBcmcoa2V5LCBuZXh0ID09PSBcInRydWVcIiwgYXJnKTtcbiAgICAgICAgaSsrO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0QXJnKGtleSwgZ2V0KGZsYWdzLnN0cmluZ3MsIGtleSkgPyBcIlwiIDogdHJ1ZSwgYXJnKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKC9eLVteLV0rLy50ZXN0KGFyZykpIHtcbiAgICAgIGNvbnN0IGxldHRlcnMgPSBhcmcuc2xpY2UoMSwgLTEpLnNwbGl0KFwiXCIpO1xuXG4gICAgICBsZXQgYnJva2VuID0gZmFsc2U7XG4gICAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxldHRlcnMubGVuZ3RoOyBqKyspIHtcbiAgICAgICAgY29uc3QgbmV4dCA9IGFyZy5zbGljZShqICsgMik7XG5cbiAgICAgICAgaWYgKG5leHQgPT09IFwiLVwiKSB7XG4gICAgICAgICAgc2V0QXJnKGxldHRlcnNbal0sIG5leHQsIGFyZyk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoL1tBLVphLXpdLy50ZXN0KGxldHRlcnNbal0pICYmIC89Ly50ZXN0KG5leHQpKSB7XG4gICAgICAgICAgc2V0QXJnKGxldHRlcnNbal0sIG5leHQuc3BsaXQoLz0oLispLylbMV0sIGFyZyk7XG4gICAgICAgICAgYnJva2VuID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChcbiAgICAgICAgICAvW0EtWmEtel0vLnRlc3QobGV0dGVyc1tqXSkgJiZcbiAgICAgICAgICAvLT9cXGQrKFxcLlxcZCopPyhlLT9cXGQrKT8kLy50ZXN0KG5leHQpXG4gICAgICAgICkge1xuICAgICAgICAgIHNldEFyZyhsZXR0ZXJzW2pdLCBuZXh0LCBhcmcpO1xuICAgICAgICAgIGJyb2tlbiA9IHRydWU7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobGV0dGVyc1tqICsgMV0gJiYgbGV0dGVyc1tqICsgMV0ubWF0Y2goL1xcVy8pKSB7XG4gICAgICAgICAgc2V0QXJnKGxldHRlcnNbal0sIGFyZy5zbGljZShqICsgMiksIGFyZyk7XG4gICAgICAgICAgYnJva2VuID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRBcmcobGV0dGVyc1tqXSwgZ2V0KGZsYWdzLnN0cmluZ3MsIGxldHRlcnNbal0pID8gXCJcIiA6IHRydWUsIGFyZyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgY29uc3QgW2tleV0gPSBhcmcuc2xpY2UoLTEpO1xuICAgICAgaWYgKCFicm9rZW4gJiYga2V5ICE9PSBcIi1cIikge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgYXJnc1tpICsgMV0gJiZcbiAgICAgICAgICAhL14oLXwtLSlbXi1dLy50ZXN0KGFyZ3NbaSArIDFdKSAmJlxuICAgICAgICAgICFnZXQoZmxhZ3MuYm9vbHMsIGtleSkgJiZcbiAgICAgICAgICAoZ2V0KGFsaWFzZXMsIGtleSkgPyAhYWxpYXNJc0Jvb2xlYW4oa2V5KSA6IHRydWUpXG4gICAgICAgICkge1xuICAgICAgICAgIHNldEFyZyhrZXksIGFyZ3NbaSArIDFdLCBhcmcpO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfSBlbHNlIGlmIChhcmdzW2kgKyAxXSAmJiAvXih0cnVlfGZhbHNlKSQvLnRlc3QoYXJnc1tpICsgMV0pKSB7XG4gICAgICAgICAgc2V0QXJnKGtleSwgYXJnc1tpICsgMV0gPT09IFwidHJ1ZVwiLCBhcmcpO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzZXRBcmcoa2V5LCBnZXQoZmxhZ3Muc3RyaW5ncywga2V5KSA/IFwiXCIgOiB0cnVlLCBhcmcpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIGlmICghZmxhZ3MudW5rbm93bkZuIHx8IGZsYWdzLnVua25vd25GbihhcmcpICE9PSBmYWxzZSkge1xuICAgICAgICBhcmd2Ll8ucHVzaChmbGFncy5zdHJpbmdzW1wiX1wiXSA/PyAhaXNOdW1iZXIoYXJnKSA/IGFyZyA6IE51bWJlcihhcmcpKTtcbiAgICAgIH1cbiAgICAgIGlmIChzdG9wRWFybHkpIHtcbiAgICAgICAgYXJndi5fLnB1c2goLi4uYXJncy5zbGljZShpICsgMSkpO1xuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhkZWZhdWx0cykpIHtcbiAgICBpZiAoIWhhc0tleShhcmd2LCBrZXkuc3BsaXQoXCIuXCIpKSkge1xuICAgICAgc2V0S2V5KGFyZ3YsIGtleS5zcGxpdChcIi5cIiksIGRlZmF1bHRzW2tleV0pO1xuXG4gICAgICBpZiAoYWxpYXNlc1trZXldKSB7XG4gICAgICAgIGZvciAoY29uc3QgeCBvZiBhbGlhc2VzW2tleV0pIHtcbiAgICAgICAgICBzZXRLZXkoYXJndiwgeC5zcGxpdChcIi5cIiksIGRlZmF1bHRzW2tleV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgaWYgKGRvdWJsZURhc2gpIHtcbiAgICBhcmd2W1wiLS1cIl0gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGtleSBvZiBub3RGbGFncykge1xuICAgICAgYXJndltcIi0tXCJdLnB1c2goa2V5KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgZm9yIChjb25zdCBrZXkgb2Ygbm90RmxhZ3MpIHtcbiAgICAgIGFyZ3YuXy5wdXNoKGtleSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGFyZ3Y7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsMEVBQTBFO0FBQzFFOzs7O0dBSUcsQ0FDSCxTQUFTLE1BQU0sUUFBUSxvQkFBb0IsQ0FBQztBQWlFNUMsTUFBTSxFQUFFLE1BQU0sQ0FBQSxFQUFFLEdBQUcsTUFBTSxBQUFDO0FBRTFCLFNBQVMsR0FBRyxDQUFJLEdBQXNCLEVBQUUsR0FBVyxFQUFpQjtJQUNsRSxJQUFJLE1BQU0sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEVBQUU7UUFDcEIsT0FBTyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDakI7Q0FDRjtBQUVELFNBQVMsUUFBUSxDQUFJLEdBQXNCLEVBQUUsR0FBVyxFQUFLO0lBQzNELE1BQU0sQ0FBQyxHQUFHLEdBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLEFBQUM7SUFDeEIsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztJQUNsQixPQUFPLENBQUMsQ0FBQztDQUNWO0FBRUQsU0FBUyxRQUFRLENBQUMsQ0FBVSxFQUFXO0lBQ3JDLElBQUksT0FBTyxDQUFDLEtBQUssUUFBUSxFQUFFLE9BQU8sSUFBSSxDQUFDO0lBQ3ZDLElBQUksaUJBQWlCLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxPQUFPLElBQUksQ0FBQztJQUNsRCxPQUFPLDZDQUE2QyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7Q0FDckU7QUFFRCxTQUFTLE1BQU0sQ0FBQyxHQUFrQixFQUFFLElBQWMsRUFBVztJQUMzRCxJQUFJLENBQUMsR0FBRyxHQUFHLEFBQUM7SUFDWixJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsR0FBSztRQUNqQyxDQUFDLEdBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsSUFBSSxFQUFFLEFBQWtCLENBQUM7S0FDMUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLEdBQUcsQ0FBQyxDQUFDLEFBQUM7SUFDbEMsT0FBTyxHQUFHLElBQUksQ0FBQyxDQUFDO0NBQ2pCO0FBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQWtCRyxDQUNILE9BQU8sU0FBUyxLQUFLLENBQ25CLElBQWMsRUFDZCxFQUNFLElBQUksRUFBRSxVQUFVLEdBQUcsS0FBSyxDQUFBLEVBQ3hCLEtBQUssRUFBRyxFQUFFLENBQUEsRUFDVixPQUFPLEVBQUcsS0FBSyxDQUFBLEVBQ2YsT0FBTyxFQUFFLFFBQVEsR0FBRyxFQUFFLENBQUEsRUFDdEIsU0FBUyxFQUFHLEtBQUssQ0FBQSxFQUNqQixNQUFNLEVBQUcsRUFBRSxDQUFBLEVBQ1gsT0FBTyxFQUFHLENBQUMsQ0FBUyxHQUFjLENBQUMsQ0FBQSxFQUN0QixHQUFHLEVBQUUsRUFDZDtJQUNOLE1BQU0sS0FBSyxHQUFVO1FBQ25CLEtBQUssRUFBRSxFQUFFO1FBQ1QsT0FBTyxFQUFFLEVBQUU7UUFDWCxTQUFTLEVBQUUsT0FBTztRQUNsQixRQUFRLEVBQUUsS0FBSztLQUNoQixBQUFDO0lBRUYsSUFBSSxPQUFPLEtBQUssU0FBUyxFQUFFO1FBQ3pCLElBQUksT0FBTyxPQUFPLEtBQUssU0FBUyxFQUFFO1lBQ2hDLEtBQUssQ0FBQyxRQUFRLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQztTQUM1QixNQUFNO1lBQ0wsTUFBTSxXQUFXLEdBQUcsT0FBTyxPQUFPLEtBQUssUUFBUSxHQUFHO2dCQUFDLE9BQU87YUFBQyxHQUFHLE9BQU8sQUFBQztZQUV0RSxLQUFLLE1BQU0sR0FBRyxJQUFJLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUU7Z0JBQzdDLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO2FBQ3pCO1NBQ0Y7S0FDRjtJQUVELE1BQU0sT0FBTyxHQUE2QixFQUFFLEFBQUM7SUFDN0MsSUFBSSxLQUFLLEtBQUssU0FBUyxFQUFFO1FBQ3ZCLElBQUssTUFBTSxJQUFHLElBQUksS0FBSyxDQUFFO1lBQ3ZCLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxLQUFLLEVBQUUsSUFBRyxDQUFDLEFBQUM7WUFDakMsSUFBSSxPQUFPLEdBQUcsS0FBSyxRQUFRLEVBQUU7Z0JBQzNCLE9BQU8sQ0FBQyxJQUFHLENBQUMsR0FBRztvQkFBQyxHQUFHO2lCQUFDLENBQUM7YUFDdEIsTUFBTTtnQkFDTCxPQUFPLENBQUMsSUFBRyxDQUFDLEdBQUcsR0FBRyxDQUFDO2FBQ3BCO1lBQ0QsS0FBSyxNQUFNLE1BQUssSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFLElBQUcsQ0FBQyxDQUFFO2dCQUMxQyxPQUFPLENBQUMsTUFBSyxDQUFDLEdBQUc7b0JBQUMsSUFBRztpQkFBQyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBRyxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxHQUFLLE1BQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDO2FBQ3hFO1NBQ0Y7S0FDRjtJQUVELElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtRQUN4QixNQUFNLFVBQVUsR0FBRyxPQUFPLE1BQU0sS0FBSyxRQUFRLEdBQUc7WUFBQyxNQUFNO1NBQUMsR0FBRyxNQUFNLEFBQUM7UUFFbEUsS0FBSyxNQUFNLElBQUcsSUFBSSxVQUFVLENBQUMsTUFBTSxDQUFDLE9BQU8sQ0FBQyxDQUFFO1lBQzVDLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDO1lBQzFCLE1BQU0sTUFBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBRyxDQUFDLEFBQUM7WUFDaEMsSUFBSSxNQUFLLEVBQUU7Z0JBQ1QsS0FBSyxNQUFNLEVBQUUsSUFBSSxNQUFLLENBQUU7b0JBQ3RCLEtBQUssQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUMxQjthQUNGO1NBQ0Y7S0FDRjtJQUVELE1BQU0sSUFBSSxHQUFTO1FBQUUsQ0FBQyxFQUFFLEVBQUU7S0FBRSxBQUFDO0lBRTdCLFNBQVMsVUFBVSxDQUFDLEdBQVcsRUFBRSxHQUFXLEVBQVc7UUFDckQsT0FDRSxBQUFDLEtBQUssQ0FBQyxRQUFRLElBQUksWUFBWSxJQUFJLENBQUMsR0FBRyxDQUFDLElBQ3hDLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUNyQixDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQ3pCLENBQUMsQ0FBQyxHQUFHLENBQUMsT0FBTyxFQUFFLEdBQUcsQ0FBQyxDQUNuQjtLQUNIO0lBRUQsU0FBUyxNQUFNLENBQUMsR0FBa0IsRUFBRSxJQUFjLEVBQUUsS0FBYyxFQUFRO1FBQ3hFLElBQUksQ0FBQyxHQUFHLEdBQUcsQUFBQztRQUNaLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVUsR0FBRyxFQUFRO1lBQzdDLElBQUksR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxTQUFTLEVBQUU7Z0JBQzdCLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDYjtZQUNELENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxBQUFpQixDQUFDO1NBQ2xDLENBQUMsQ0FBQztRQUVILE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxHQUFHLENBQUMsQ0FBQyxBQUFDO1FBQ2xDLElBQ0UsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsS0FBSyxTQUFTLElBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUNyQixPQUFPLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssU0FBUyxFQUNoQztZQUNBLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUM7U0FDaEIsTUFBTSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQyxFQUFFO1lBQ3BDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBZSxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7U0FDbkMsTUFBTTtZQUNMLENBQUMsQ0FBQyxHQUFHLENBQUMsR0FBRztnQkFBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQztnQkFBRSxLQUFLO2FBQUMsQ0FBQztTQUMvQjtLQUNGO0lBRUQsU0FBUyxNQUFNLENBQ2IsR0FBVyxFQUNYLEdBQVksRUFDWixHQUF1QixHQUFHLFNBQVMsRUFDN0I7UUFDTixJQUFJLEdBQUcsSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUMsRUFBRTtZQUNuRCxJQUFJLEtBQUssQ0FBQyxTQUFTLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUUsT0FBTztTQUN0RDtRQUVELE1BQU0sS0FBSyxHQUFHLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLElBQUksUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLEFBQUM7UUFDNUUsTUFBTSxDQUFDLElBQUksRUFBRSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBRXBDLE1BQU0sS0FBSyxHQUFHLEdBQUcsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLEFBQUM7UUFDaEMsSUFBSSxLQUFLLEVBQUU7WUFDVCxLQUFLLE1BQU0sQ0FBQyxJQUFJLEtBQUssQ0FBRTtnQkFDckIsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLEtBQUssQ0FBQyxDQUFDO2FBQ25DO1NBQ0Y7S0FDRjtJQUVELFNBQVMsY0FBYyxDQUFDLEdBQVcsRUFBVztRQUM1QyxPQUFPLFFBQVEsQ0FBQyxPQUFPLEVBQUUsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUNoQyxDQUFDLENBQUMsR0FBSyxPQUFPLEdBQUcsQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQyxLQUFLLFNBQVMsQ0FDaEQsQ0FBQztLQUNIO0lBRUQsS0FBSyxNQUFNLElBQUcsSUFBSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBRTtRQUMxQyxNQUFNLENBQUMsSUFBRyxFQUFFLFFBQVEsQ0FBQyxJQUFHLENBQUMsS0FBSyxTQUFTLEdBQUcsS0FBSyxHQUFHLFFBQVEsQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFDO0tBQ2xFO0lBRUQsSUFBSSxRQUFRLEdBQWEsRUFBRSxBQUFDO0lBRTVCLHFDQUFxQztJQUNyQyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUU7UUFDdkIsUUFBUSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUM5QyxJQUFJLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0tBQzFDO0lBRUQsSUFBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLENBQUU7UUFDcEMsTUFBTSxHQUFHLEdBQUcsSUFBSSxDQUFDLENBQUMsQ0FBQyxBQUFDO1FBRXBCLElBQUksU0FBUyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDdEIsTUFBTSxDQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUsscUJBQXFCLEFBQUM7WUFDekMsTUFBTSxDQUFDLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztZQUNsQixNQUFNLEdBQUcsSUFBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLENBQUMsQUFBQztZQUV6QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsSUFBRyxDQUFDLEVBQUU7Z0JBQ3BCLE1BQU0sWUFBWSxHQUFHLEtBQUssS0FBSyxPQUFPLEFBQUM7Z0JBQ3ZDLE1BQU0sQ0FBQyxJQUFHLEVBQUUsWUFBWSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2FBQ2hDLE1BQU07Z0JBQ0wsTUFBTSxDQUFDLElBQUcsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDekI7U0FDRixNQUFNLElBQUksV0FBVyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDL0IsTUFBTSxFQUFDLEdBQUcsR0FBRyxDQUFDLEtBQUssY0FBYyxBQUFDO1lBQ2xDLE1BQU0sQ0FBQyxFQUFDLElBQUksSUFBSSxDQUFDLENBQUM7WUFDbEIsTUFBTSxDQUFDLEVBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUM7U0FDMUIsTUFBTSxJQUFJLFFBQVEsSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFO1lBQzVCLE1BQU0sRUFBQyxHQUFHLEdBQUcsQ0FBQyxLQUFLLFdBQVcsQUFBQztZQUMvQixNQUFNLENBQUMsRUFBQyxJQUFJLElBQUksQ0FBQyxDQUFDO1lBQ2xCLE1BQU0sR0FBRyxJQUFHLENBQUMsR0FBRyxFQUFDLEFBQUM7WUFDbEIsTUFBTSxJQUFJLEdBQUcsSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQUFBQztZQUN6QixJQUNFLElBQUksS0FBSyxTQUFTLElBQ2xCLENBQUMsS0FBSyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQ2hCLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBRyxDQUFDLElBQ3RCLENBQUMsS0FBSyxDQUFDLFFBQVEsSUFDZixDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsSUFBRyxDQUFDLEdBQUcsQ0FBQyxjQUFjLENBQUMsSUFBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEVBQ2pEO2dCQUNBLE1BQU0sQ0FBQyxJQUFHLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO2dCQUN2QixDQUFDLEVBQUUsQ0FBQzthQUNMLE1BQU0sSUFBSSxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN0QyxNQUFNLENBQUMsSUFBRyxFQUFFLElBQUksS0FBSyxNQUFNLEVBQUUsR0FBRyxDQUFDLENBQUM7Z0JBQ2xDLENBQUMsRUFBRSxDQUFDO2FBQ0wsTUFBTTtnQkFDTCxNQUFNLENBQUMsSUFBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7YUFDdkQ7U0FDRixNQUFNLElBQUksVUFBVSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUU7WUFDOUIsTUFBTSxPQUFPLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDLEFBQUM7WUFFM0MsSUFBSSxNQUFNLEdBQUcsS0FBSyxBQUFDO1lBQ25CLElBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxDQUFFO2dCQUN2QyxNQUFNLEtBQUksR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQUFBQztnQkFFOUIsSUFBSSxLQUFJLEtBQUssR0FBRyxFQUFFO29CQUNoQixNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDOUIsU0FBUztpQkFDVjtnQkFFRCxJQUFJLFdBQVcsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUksQ0FBQyxFQUFFO29CQUNqRCxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFLEtBQUksQ0FBQyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDaEQsTUFBTSxHQUFHLElBQUksQ0FBQztvQkFDZCxNQUFNO2lCQUNQO2dCQUVELElBQ0UsV0FBVyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQzNCLDBCQUEwQixJQUFJLENBQUMsS0FBSSxDQUFDLEVBQ3BDO29CQUNBLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsS0FBSSxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixNQUFNLEdBQUcsSUFBSSxDQUFDO29CQUNkLE1BQU07aUJBQ1A7Z0JBRUQsSUFBSSxPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsS0FBSyxNQUFNLEVBQUU7b0JBQ2hELE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUM7b0JBQzFDLE1BQU0sR0FBRyxJQUFJLENBQUM7b0JBQ2QsTUFBTTtpQkFDUCxNQUFNO29CQUNMLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQUUsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsRUFBRSxHQUFHLElBQUksRUFBRSxHQUFHLENBQUMsQ0FBQztpQkFDckU7YUFDRjtZQUVELE1BQU0sQ0FBQyxJQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEFBQUM7WUFDNUIsSUFBSSxDQUFDLE1BQU0sSUFBSSxJQUFHLEtBQUssR0FBRyxFQUFFO2dCQUMxQixJQUNFLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQ1gsQ0FBQyxjQUFjLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLElBQ2hDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsSUFBRyxDQUFDLElBQ3RCLENBQUMsR0FBRyxDQUFDLE9BQU8sRUFBRSxJQUFHLENBQUMsR0FBRyxDQUFDLGNBQWMsQ0FBQyxJQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsRUFDakQ7b0JBQ0EsTUFBTSxDQUFDLElBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxFQUFFLEdBQUcsQ0FBQyxDQUFDO29CQUM5QixDQUFDLEVBQUUsQ0FBQztpQkFDTCxNQUFNLElBQUksSUFBSSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxpQkFBaUIsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDNUQsTUFBTSxDQUFDLElBQUcsRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLE1BQU0sRUFBRSxHQUFHLENBQUMsQ0FBQztvQkFDekMsQ0FBQyxFQUFFLENBQUM7aUJBQ0wsTUFBTTtvQkFDTCxNQUFNLENBQUMsSUFBRyxFQUFFLEdBQUcsQ0FBQyxLQUFLLENBQUMsT0FBTyxFQUFFLElBQUcsQ0FBQyxHQUFHLEVBQUUsR0FBRyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7aUJBQ3ZEO2FBQ0Y7U0FDRixNQUFNO1lBQ0wsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsS0FBSyxLQUFLLEVBQUU7Z0JBQ3RELElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEdBQUcsR0FBRyxHQUFHLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO2FBQ3ZFO1lBQ0QsSUFBSSxTQUFTLEVBQUU7Z0JBQ2IsSUFBSSxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDbEMsTUFBTTthQUNQO1NBQ0Y7S0FDRjtJQUVELEtBQUssTUFBTSxJQUFHLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBRTtRQUN2QyxJQUFJLENBQUMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEVBQUU7WUFDakMsTUFBTSxDQUFDLElBQUksRUFBRSxJQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFDO1lBRTVDLElBQUksT0FBTyxDQUFDLElBQUcsQ0FBQyxFQUFFO2dCQUNoQixLQUFLLE1BQU0sQ0FBQyxJQUFJLE9BQU8sQ0FBQyxJQUFHLENBQUMsQ0FBRTtvQkFDNUIsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxJQUFHLENBQUMsQ0FBQyxDQUFDO2lCQUMzQzthQUNGO1NBQ0Y7S0FDRjtJQUVELElBQUksVUFBVSxFQUFFO1FBQ2QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQztRQUNoQixLQUFLLE1BQU0sSUFBRyxJQUFJLFFBQVEsQ0FBRTtZQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUcsQ0FBQyxDQUFDO1NBQ3RCO0tBQ0YsTUFBTTtRQUNMLEtBQUssTUFBTSxJQUFHLElBQUksUUFBUSxDQUFFO1lBQzFCLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUcsQ0FBQyxDQUFDO1NBQ2xCO0tBQ0Y7SUFFRCxPQUFPLElBQUksQ0FBQztDQUNiIn0=