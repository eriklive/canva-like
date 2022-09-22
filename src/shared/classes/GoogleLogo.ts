import Konva from 'konva';
import KonvaDefault from './KonvaDefault';

export default class GoogleLogo extends KonvaDefault {
  constructor(id: number) {
    super();

    const part_one = new Konva.Path({
      x: 200,
      y: 4,
      data: 'M -3.264 51.509 C -3.264 50.719 -3.334 49.969 -3.454 49.239 L -14.754 49.239 L -14.754 53.749 L -8.284 53.749 C -8.574 55.229 -9.424 56.479 -10.684 57.329 L -10.684 60.329 L -6.824 60.329 C -4.564 58.239 -3.264 55.159 -3.264 51.509 Z',
      width: 112,
      height: 123,

      fill: '#4285F4',
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
    });

    const part_two = new Konva.Path({
      x: 200,
      y: 4,
      data: 'M -14.754 63.239 C -11.514 63.239 -8.804 62.159 -6.824 60.329 L -10.684 57.329 C -11.764 58.049 -13.134 58.489 -14.754 58.489 C -17.884 58.489 -20.534 56.379 -21.484 53.529 L -25.464 53.529 L -25.464 56.619 C -23.494 60.539 -19.444 63.239 -14.754 63.239 Z',
      width: 112,
      height: 123,

      fill: '#34A853',
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
    });

    const part_three = new Konva.Path({
      x: 200,
      y: 4,
      data: 'M -21.484 53.529 C -21.734 52.809 -21.864 52.039 -21.864 51.239 C -21.864 50.439 -21.724 49.669 -21.484 48.949 L -21.484 45.859 L -25.464 45.859 C -26.284 47.479 -26.754 49.299 -26.754 51.239 C -26.754 53.179 -26.284 54.999 -25.464 56.619 L -21.484 53.529 Z',
      width: 112,
      height: 123,

      fill: '#FBBC05',
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
    });

    const part_four = new Konva.Path({
      x: 200,
      y: 4,
      data: 'M -14.754 43.989 C -12.984 43.989 -11.404 44.599 -10.154 45.789 L -6.734 42.369 C -8.804 40.429 -11.514 39.239 -14.754 39.239 C -19.444 39.239 -23.494 41.939 -25.464 45.859 L -21.484 48.949 C -20.534 46.099 -17.884 43.989 -14.754 43.989 Z',
      width: 112,
      height: 123,

      fill: '#EA4335',
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
    });

    this.addLayer(
      new Konva.Layer({
        draggable: true,
      })
        .add(part_one)
        .add(part_two)
        .add(part_three)
        .add(part_four)
    );

    this.addObject(part_one);
    this.addObject(part_two);
    this.addObject(part_three);
    this.addObject(part_four);
  }
}
