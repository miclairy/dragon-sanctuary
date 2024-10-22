import { Prisma } from '.prisma/client';
import { saveDragon } from '@/app/create/actions/saveDragon';
import { generateImage } from '@/app/create/actions/generateImage';

export const setDragon = async (setImageUrl: (v: string) => void, data: Prisma.DragonCreateInput) => {
    try {
        const url = await generateImage(data);
        if (url) {
            setImageUrl(url);
            await saveDragon(url, data);
        } else {
            return 'AAAHHHH!! Falling to death is painful';
        }
    } catch (e) {
        if (e instanceof Error) {
            return e.message;
        }
    }
};