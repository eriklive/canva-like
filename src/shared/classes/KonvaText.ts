import Konva from 'konva';
import KonvaDefault from './KonvaDefault';

export default class KonvaText extends KonvaDefault {
  constructor(id: number) {
    super();

    const text = new Konva.Text({
      x: 2,
      y: 15,
      text: 'Simple Text',
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: '#fffff',
      draggable: false,
    });

    console.log(2);

    this.addLayer(
      new Konva.Layer({
        draggable: true,
      }).add(text)
    );

    this.addObject(text);
  }
}
