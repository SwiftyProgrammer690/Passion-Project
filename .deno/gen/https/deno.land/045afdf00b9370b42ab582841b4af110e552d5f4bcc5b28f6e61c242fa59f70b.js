// Copyright 2018-2021 the Deno authors. All rights reserved. MIT license.
const base64abc = [
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "0",
    "1",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "+",
    "/", 
];
/**
 * CREDIT: https://gist.github.com/enepomnyaschih/72c423f727d395eeaa09697058238727
 * Encodes a given Uint8Array, ArrayBuffer or string into RFC4648 base64 representation
 * @param data
 */ export function encode(data) {
    const uint8 = typeof data === "string" ? new TextEncoder().encode(data) : data instanceof Uint8Array ? data : new Uint8Array(data);
    let result = "", i;
    const l = uint8.length;
    for(i = 2; i < l; i += 3){
        result += base64abc[uint8[i - 2] >> 2];
        result += base64abc[(uint8[i - 2] & 3) << 4 | uint8[i - 1] >> 4];
        result += base64abc[(uint8[i - 1] & 15) << 2 | uint8[i] >> 6];
        result += base64abc[uint8[i] & 63];
    }
    if (i === l + 1) {
        // 1 octet yet to write
        result += base64abc[uint8[i - 2] >> 2];
        result += base64abc[(uint8[i - 2] & 3) << 4];
        result += "==";
    }
    if (i === l) {
        // 2 octets yet to write
        result += base64abc[uint8[i - 2] >> 2];
        result += base64abc[(uint8[i - 2] & 3) << 4 | uint8[i - 1] >> 4];
        result += base64abc[(uint8[i - 1] & 15) << 2];
        result += "=";
    }
    return result;
}
/**
 * Decodes a given RFC4648 base64 encoded string
 * @param b64
 */ export function decode(b64) {
    const binString = atob(b64);
    const size = binString.length;
    const bytes = new Uint8Array(size);
    for(let i = 0; i < size; i++){
        bytes[i] = binString.charCodeAt(i);
    }
    return bytes;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImh0dHBzOi8vZGVuby5sYW5kL3N0ZEAwLjExOC4wL2VuY29kaW5nL2Jhc2U2NC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIHRoZSBEZW5vIGF1dGhvcnMuIEFsbCByaWdodHMgcmVzZXJ2ZWQuIE1JVCBsaWNlbnNlLlxuXG5jb25zdCBiYXNlNjRhYmMgPSBbXG4gIFwiQVwiLFxuICBcIkJcIixcbiAgXCJDXCIsXG4gIFwiRFwiLFxuICBcIkVcIixcbiAgXCJGXCIsXG4gIFwiR1wiLFxuICBcIkhcIixcbiAgXCJJXCIsXG4gIFwiSlwiLFxuICBcIktcIixcbiAgXCJMXCIsXG4gIFwiTVwiLFxuICBcIk5cIixcbiAgXCJPXCIsXG4gIFwiUFwiLFxuICBcIlFcIixcbiAgXCJSXCIsXG4gIFwiU1wiLFxuICBcIlRcIixcbiAgXCJVXCIsXG4gIFwiVlwiLFxuICBcIldcIixcbiAgXCJYXCIsXG4gIFwiWVwiLFxuICBcIlpcIixcbiAgXCJhXCIsXG4gIFwiYlwiLFxuICBcImNcIixcbiAgXCJkXCIsXG4gIFwiZVwiLFxuICBcImZcIixcbiAgXCJnXCIsXG4gIFwiaFwiLFxuICBcImlcIixcbiAgXCJqXCIsXG4gIFwia1wiLFxuICBcImxcIixcbiAgXCJtXCIsXG4gIFwiblwiLFxuICBcIm9cIixcbiAgXCJwXCIsXG4gIFwicVwiLFxuICBcInJcIixcbiAgXCJzXCIsXG4gIFwidFwiLFxuICBcInVcIixcbiAgXCJ2XCIsXG4gIFwid1wiLFxuICBcInhcIixcbiAgXCJ5XCIsXG4gIFwielwiLFxuICBcIjBcIixcbiAgXCIxXCIsXG4gIFwiMlwiLFxuICBcIjNcIixcbiAgXCI0XCIsXG4gIFwiNVwiLFxuICBcIjZcIixcbiAgXCI3XCIsXG4gIFwiOFwiLFxuICBcIjlcIixcbiAgXCIrXCIsXG4gIFwiL1wiLFxuXTtcblxuLyoqXG4gKiBDUkVESVQ6IGh0dHBzOi8vZ2lzdC5naXRodWIuY29tL2VuZXBvbW55YXNjaGloLzcyYzQyM2Y3MjdkMzk1ZWVhYTA5Njk3MDU4MjM4NzI3XG4gKiBFbmNvZGVzIGEgZ2l2ZW4gVWludDhBcnJheSwgQXJyYXlCdWZmZXIgb3Igc3RyaW5nIGludG8gUkZDNDY0OCBiYXNlNjQgcmVwcmVzZW50YXRpb25cbiAqIEBwYXJhbSBkYXRhXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBlbmNvZGUoZGF0YTogQXJyYXlCdWZmZXIgfCBzdHJpbmcpOiBzdHJpbmcge1xuICBjb25zdCB1aW50OCA9IHR5cGVvZiBkYXRhID09PSBcInN0cmluZ1wiXG4gICAgPyBuZXcgVGV4dEVuY29kZXIoKS5lbmNvZGUoZGF0YSlcbiAgICA6IGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5XG4gICAgPyBkYXRhXG4gICAgOiBuZXcgVWludDhBcnJheShkYXRhKTtcbiAgbGV0IHJlc3VsdCA9IFwiXCIsXG4gICAgaTtcbiAgY29uc3QgbCA9IHVpbnQ4Lmxlbmd0aDtcbiAgZm9yIChpID0gMjsgaSA8IGw7IGkgKz0gMykge1xuICAgIHJlc3VsdCArPSBiYXNlNjRhYmNbdWludDhbaSAtIDJdID4+IDJdO1xuICAgIHJlc3VsdCArPSBiYXNlNjRhYmNbKCh1aW50OFtpIC0gMl0gJiAweDAzKSA8PCA0KSB8ICh1aW50OFtpIC0gMV0gPj4gNCldO1xuICAgIHJlc3VsdCArPSBiYXNlNjRhYmNbKCh1aW50OFtpIC0gMV0gJiAweDBmKSA8PCAyKSB8ICh1aW50OFtpXSA+PiA2KV07XG4gICAgcmVzdWx0ICs9IGJhc2U2NGFiY1t1aW50OFtpXSAmIDB4M2ZdO1xuICB9XG4gIGlmIChpID09PSBsICsgMSkge1xuICAgIC8vIDEgb2N0ZXQgeWV0IHRvIHdyaXRlXG4gICAgcmVzdWx0ICs9IGJhc2U2NGFiY1t1aW50OFtpIC0gMl0gPj4gMl07XG4gICAgcmVzdWx0ICs9IGJhc2U2NGFiY1sodWludDhbaSAtIDJdICYgMHgwMykgPDwgNF07XG4gICAgcmVzdWx0ICs9IFwiPT1cIjtcbiAgfVxuICBpZiAoaSA9PT0gbCkge1xuICAgIC8vIDIgb2N0ZXRzIHlldCB0byB3cml0ZVxuICAgIHJlc3VsdCArPSBiYXNlNjRhYmNbdWludDhbaSAtIDJdID4+IDJdO1xuICAgIHJlc3VsdCArPSBiYXNlNjRhYmNbKCh1aW50OFtpIC0gMl0gJiAweDAzKSA8PCA0KSB8ICh1aW50OFtpIC0gMV0gPj4gNCldO1xuICAgIHJlc3VsdCArPSBiYXNlNjRhYmNbKHVpbnQ4W2kgLSAxXSAmIDB4MGYpIDw8IDJdO1xuICAgIHJlc3VsdCArPSBcIj1cIjtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuXG4vKipcbiAqIERlY29kZXMgYSBnaXZlbiBSRkM0NjQ4IGJhc2U2NCBlbmNvZGVkIHN0cmluZ1xuICogQHBhcmFtIGI2NFxuICovXG5leHBvcnQgZnVuY3Rpb24gZGVjb2RlKGI2NDogc3RyaW5nKTogVWludDhBcnJheSB7XG4gIGNvbnN0IGJpblN0cmluZyA9IGF0b2IoYjY0KTtcbiAgY29uc3Qgc2l6ZSA9IGJpblN0cmluZy5sZW5ndGg7XG4gIGNvbnN0IGJ5dGVzID0gbmV3IFVpbnQ4QXJyYXkoc2l6ZSk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2l6ZTsgaSsrKSB7XG4gICAgYnl0ZXNbaV0gPSBiaW5TdHJpbmcuY2hhckNvZGVBdChpKTtcbiAgfVxuICByZXR1cm4gYnl0ZXM7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsRUFBMEUsQUFBMUUsd0VBQTBFO0FBRTFFLEtBQUssQ0FBQyxTQUFTLEdBQUcsQ0FBQztJQUNqQixDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0lBQ0gsQ0FBRztJQUNILENBQUc7SUFDSCxDQUFHO0FBQ0wsQ0FBQztBQUVELEVBSUcsQUFKSDs7OztDQUlHLEFBSkgsRUFJRyxDQUNILE1BQU0sVUFBVSxNQUFNLENBQUMsSUFBMEIsRUFBVSxDQUFDO0lBQzFELEtBQUssQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLElBQUksS0FBSyxDQUFRLFVBQ2xDLEdBQUcsQ0FBQyxXQUFXLEdBQUcsTUFBTSxDQUFDLElBQUksSUFDN0IsSUFBSSxZQUFZLFVBQVUsR0FDMUIsSUFBSSxHQUNKLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSTtJQUN2QixHQUFHLENBQUMsTUFBTSxHQUFHLENBQUUsR0FDYixDQUFDO0lBQ0gsS0FBSyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUMsTUFBTTtJQUN0QixHQUFHLENBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLENBQUUsQ0FBQztRQUMxQixNQUFNLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDckMsTUFBTSxJQUFJLFNBQVMsRUFBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFJLEtBQUssQ0FBQyxHQUFLLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUM7UUFDckUsTUFBTSxJQUFJLFNBQVMsRUFBRyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsSUFBSSxFQUFJLEtBQUssQ0FBQyxHQUFLLEtBQUssQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNqRSxNQUFNLElBQUksU0FBUyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBSTtJQUNyQyxDQUFDO0lBQ0QsRUFBRSxFQUFFLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUM7UUFDaEIsRUFBdUIsQUFBdkIscUJBQXVCO1FBQ3ZCLE1BQU0sSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNyQyxNQUFNLElBQUksU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUksS0FBSyxDQUFDO1FBQzlDLE1BQU0sSUFBSSxDQUFJO0lBQ2hCLENBQUM7SUFDRCxFQUFFLEVBQUUsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO1FBQ1osRUFBd0IsQUFBeEIsc0JBQXdCO1FBQ3hCLE1BQU0sSUFBSSxTQUFTLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNyQyxNQUFNLElBQUksU0FBUyxFQUFHLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUksS0FBSyxDQUFDLEdBQUssS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQztRQUNyRSxNQUFNLElBQUksU0FBUyxFQUFFLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUksS0FBSyxDQUFDO1FBQzlDLE1BQU0sSUFBSSxDQUFHO0lBQ2YsQ0FBQztJQUNELE1BQU0sQ0FBQyxNQUFNO0FBQ2YsQ0FBQztBQUVELEVBR0csQUFISDs7O0NBR0csQUFISCxFQUdHLENBQ0gsTUFBTSxVQUFVLE1BQU0sQ0FBQyxHQUFXLEVBQWMsQ0FBQztJQUMvQyxLQUFLLENBQUMsU0FBUyxHQUFHLElBQUksQ0FBQyxHQUFHO0lBQzFCLEtBQUssQ0FBQyxJQUFJLEdBQUcsU0FBUyxDQUFDLE1BQU07SUFDN0IsS0FBSyxDQUFDLEtBQUssR0FBRyxHQUFHLENBQUMsVUFBVSxDQUFDLElBQUk7SUFDakMsR0FBRyxDQUFFLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLEVBQUUsQ0FBQyxHQUFJLENBQUM7UUFDOUIsS0FBSyxDQUFDLENBQUMsSUFBSSxTQUFTLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDbkMsQ0FBQztJQUNELE1BQU0sQ0FBQyxLQUFLO0FBQ2QsQ0FBQyJ9