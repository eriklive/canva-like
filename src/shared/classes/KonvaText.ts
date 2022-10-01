import Konva from 'konva';
import { CLASSES_TYPES_ENUM } from './ClassesTypes.enum';
import KonvaDefault from './KonvaDefault';

export default class KonvaText extends KonvaDefault {
  constructor(id: number) {
    super();

    const text = new Konva.Text({
      x: 2,
      y: 15,
      text: this.textControl.value,
      fontSize: 30,
      fontFamily: 'Calibri',
      fill: '#fffff',
      draggable: false,
      id: id.toString(),
    });

    this.addLayer(
      new Konva.Layer({
        draggable: true,
      }).add(text)
    );

    this.addObject(text);

    this.type = CLASSES_TYPES_ENUM.TEXT;

    this._configureControl();
  }

  private _configureControl() {
    this.textControl.valueChanges.subscribe((value) => {
      const layer = this.layer.getChildren()[0] as any;
      (this.layer.getChildren()[0] as any).textArr[0].text = value;
      this.layer.draw();
    });
  }
}
