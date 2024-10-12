"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Decrypt = exports.Encrypt = void 0;
const { AES, enc } = require("crypto-js");
function Encrypt(value, key) {
    if (typeof (value) == 'string' && typeof (key) == 'string') {
        return AES.encrypt(value, key).toString();
    }
    else {
        throw new Error("do not support this type key and value");
    }
}
exports.Encrypt = Encrypt;
function Decrypt(value, key) {
    if (typeof (value) == 'string' && typeof (key) == 'string') {
        let bytes = AES.decrypt(value, key);
        return bytes.toString(enc.Utf8);
    }
    else {
        throw new Error("do not support this type key and value");
    }
}
exports.Decrypt = Decrypt;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi9zZWNyZXQvaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsTUFBTSxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUMsR0FBRyxPQUFPLENBQUMsV0FBVyxDQUFDLENBQUM7QUFFeEMsU0FBZ0IsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHO0lBQzlCLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxJQUFJLFFBQVEsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksUUFBUSxFQUFFO1FBQ3hELE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7S0FDN0M7U0FBTTtRQUNILE1BQU0sSUFBSSxLQUFLLENBQUMsd0NBQXdDLENBQUMsQ0FBQztLQUM3RDtBQUNMLENBQUM7QUFORCwwQkFNQztBQUVELFNBQWdCLE9BQU8sQ0FBQyxLQUFLLEVBQUUsR0FBRztJQUM5QixJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxRQUFRLElBQUksT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLFFBQVEsRUFBRTtRQUN4RCxJQUFJLEtBQUssR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwQyxPQUFPLEtBQUssQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO0tBQ25DO1NBQU07UUFDSCxNQUFNLElBQUksS0FBSyxDQUFDLHdDQUF3QyxDQUFDLENBQUM7S0FDN0Q7QUFDTCxDQUFDO0FBUEQsMEJBT0MifQ==