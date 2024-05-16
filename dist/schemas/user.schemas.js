"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userLoginSchema = exports.userReturnSchema = exports.userRegisterSchema = exports.userSchema = void 0;
const zod_1 = require("zod");
exports.userSchema = zod_1.z.object({
    id: zod_1.z.number().positive(),
    name: zod_1.z.string().min(1),
    email: zod_1.z.string().min(1).email(),
    password: zod_1.z.string().min(8),
});
exports.userRegisterSchema = exports.userSchema.omit({ id: true });
exports.userReturnSchema = exports.userSchema.omit({ password: true });
exports.userLoginSchema = exports.userSchema.omit({ id: true, name: true });
