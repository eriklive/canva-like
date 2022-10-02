export interface Shape {
  name: SHAPES_ENUM;
  imageFileSrc: string;
}

export enum SHAPES_ENUM {
  SIMPLE_SHIELD_ONE,
  GOOGLE,
  TEXT,
}

export const SHAPES_ARRAY: Array<Shape> = [
  {
    name: SHAPES_ENUM.SIMPLE_SHIELD_ONE,
    imageFileSrc: 'assets/svgs/shield-one.svg',
  },
  { name: SHAPES_ENUM.GOOGLE, imageFileSrc: 'assets/svgs/google-g-logo.svg' },
];
