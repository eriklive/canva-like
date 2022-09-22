import Konva from 'konva';
import KonvaDefault from './KonvaDefault';

export default class Shield extends KonvaDefault {
  constructor(id: number) {
    super();

    const object = new Konva.Path({
      x: 26,
      y: 4,
      data: 'M55.713,0c20.848,13.215,39.682,19.467,55.846,17.989 c2.823,57.098-18.263,90.818-55.63,104.891C19.844,109.708-1.5,77.439,0.083,17.123C19.058,18.116,37.674,14.014,55.713,0L55.713,0 z M55.735,7.055c18.454,11.697,35.126,17.232,49.434,15.923c2.498,50.541-16.166,80.39-49.241,92.846 C23.986,104.165,5.091,75.603,6.493,22.211C23.29,23.091,39.768,19.46,55.735,7.055L55.735,7.055z',
      width: 112,
      height: 123,
      fill: '#ffffff',
      stroke: 'black',
      strokeWidth: 2,
      scaleX: 4,
      scaleY: 4,
      id: id.toString(),
    });

    this.addLayer(
      new Konva.Layer({
        draggable: true,
      }).add(object)
    );

    this.addObject(object);
  }
}
