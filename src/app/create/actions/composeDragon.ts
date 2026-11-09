'use server';

import { Prisma } from '@/generated/prisma/client';

import { readFile } from 'fs/promises';
import DragonCreateInput = Prisma.DragonCreateInput;

const FOLDER_DRAGON_PARTS = 'public/dragonParts/';

export const composeDragon = async (dragon: DragonCreateInput) => {
  const parts = [];
  if (dragon.horns >= 1) {
      parts.push('horn-01');
  }
  if (dragon.horns >= 2) {
      parts.push('horn-02');
  }
  if (dragon.horns >= 3) {
      parts.push('horn-03');
  }
  if (dragon.horns >= 4) {
      parts.push('horn-04');
  }
  if (dragon.legs >= 2) {
      parts.push('legs-2');
  }
  if (dragon.legs >= 4) {
      parts.push('legs-4');
  }
  if (dragon.legs >= 8) {
      parts.push('legs-8');
  }
  parts.push('wings');

    console.log('pancake', dragon.color);
    return await compositeSVGs(parts, dragon.color, dragon.eyeColor);
};

async function compositeSVGs(svgs: string[], colour: string, eyeColour: string) {
    try {
        const rawBaseSvg = await readFile(`${FOLDER_DRAGON_PARTS}base.svg`, 'utf8');
        const baseSvg = rawBaseSvg.replaceAll('#ffffff', eyeColour)

        let layers = '';
        for (const svg of svgs) {
            const bodyPart = await readFile(`${FOLDER_DRAGON_PARTS}${svg}.svg`, 'utf8');
            // keep only what is inside <svg ...> and </svg>
            const start = bodyPart.indexOf('>', bodyPart.indexOf('<svg')) + 1;
            const end = bodyPart.lastIndexOf('</svg>');
            layers += bodyPart.slice(start, end);
        }

        const baseEnd = baseSvg.lastIndexOf('</svg>');
        const composite = baseSvg.slice(0, baseEnd) + layers + baseSvg.slice(baseEnd);
        return composite.replaceAll('#000000', colour);
    } catch (error) {
        console.error('Error compositing SVGs:', error);
    }
}
