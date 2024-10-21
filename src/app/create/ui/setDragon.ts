import { Prisma } from '.prisma/client';
import { upload } from '@/app/create/actions/upload';
import { generateDragon } from '@/app/create/actions/generateDragon';

export const setDragon = async (setImageUrl: (v: string) => void, data: Prisma.DragonCreateInput) => {
    try {
        const { imageKey, url } = await generateDragon(data);
        if (url) {
            setImageUrl(url);
            await upload(imageKey, url);
        } else {
            return 'AAAHHHH!! Falling to death is painful';
        }
    } catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
    }
};