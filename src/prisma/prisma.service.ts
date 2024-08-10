import { Injectable, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable() // It's used to inject a service in another
export class PrismaService extends PrismaClient implements OnModuleInit {
    // "implements OnModuleInit" means when I call this class, the class starts to execute code
    async onModuleInit() {
        await this.$connect();
    }

}