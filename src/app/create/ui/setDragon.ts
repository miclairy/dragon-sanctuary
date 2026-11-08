import { Prisma } from '@/generated/prisma/client';
 import { saveDragon } from '@/app/create/actions/saveDragon';
import { composeDragon } from '@/app/create/actions/composeDragon';

 export const setDragon = async (setImage: (v: string) => void, data: Prisma.DragonCreateInput) => {
     try {
         const svg = await composeDragon(data);
         if (svg) {
             setImage(svg);
             await saveDragon(svg, data);
         } else {
             return 'AAAHHHH!! Falling to death is painful';
         }
     } catch (e) {
         if (e instanceof Error) {
             return e.message;
         }
     }
 };