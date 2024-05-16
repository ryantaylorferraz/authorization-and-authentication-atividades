"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const tsyringe_1 = require("tsyringe");
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_schemas_1 = require("../schemas/user.schemas");
const prisma_1 = require("../database/prisma");
const appError_1 = require("../errors/appError");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let UserService = class UserService {
    constructor() {
        this.register = (body) => __awaiter(this, void 0, void 0, function* () {
            const hashPassword = yield bcrypt_1.default.hash(body.password, 10);
            const createUser = {
                name: body.name,
                email: body.email,
                password: hashPassword,
            };
            const data = yield prisma_1.prisma.user.create({
                data: createUser,
            });
            return user_schemas_1.userReturnSchema.parse(data);
        });
        this.login = (body) => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({ where: { email: body.email } });
            if (!user) {
                throw new appError_1.AppError("User not registered", 404);
            }
            const compare = yield bcrypt_1.default.compare(body.password, user.password);
            if (!compare) {
                throw new appError_1.AppError("Email and Password doesn't match.", 403);
            }
            const token = jsonwebtoken_1.default.sign({ id: user.id }, process.env.JWT_SECRETT, {
                expiresIn: process.env.EXPIRES_IN,
            });
            return {
                acessToken: token,
                data: user_schemas_1.userReturnSchema.parse(user),
            };
        });
        this.getUser = (id) => __awaiter(this, void 0, void 0, function* () {
            const user = yield prisma_1.prisma.user.findFirst({ where: { id } });
            return user_schemas_1.userReturnSchema.parse(user);
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, tsyringe_1.injectable)()
], UserService);
