'use server';
import prisma from '@/lib/db';
import { Prisma } from '.prisma/client';
import PrismaClientValidationError = Prisma.PrismaClientValidationError;

export const getDragon = async (index: string) => {
    try {
        return await prisma.dragon.findUnique({
            where: { index: parseInt(index) },
        });
    } catch (e) {
        if (e instanceof PrismaClientValidationError) {
            return null;
        } else {
        }
    }
};