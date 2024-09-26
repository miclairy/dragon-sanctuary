interface Dragon {
  name: string;
  color: string;
  terrain: string;
  fireBreather: boolean;
  waterBreather: boolean;
  eyeColor: string;
  armored: boolean;
  horns: number;
  fins: boolean;
  feathers: boolean;
  wings: boolean;
  legs: number;
  imageKey?: string;
}

export const defaultDragons: Dragon[] = [
  {
    name: "drogo",
    color: "black",
    terrain: "mountains",
    fireBreather: true,
    waterBreather: false,
    eyeColor: "black",
    armored: true,
    horns: 6,
    fins: false,
    feathers: false,
    wings: true,
    legs: 4,
  },
];
