import Konva from 'konva';
import { LineConfig } from 'konva/lib/shapes/Line';
import KonvaDefault from './KonvaDefault';
import KonvaText, { AditionalTextConfig } from './KonvaText';
import KonvaLine from 'src/shared/classes/KonvaLine';
import { CertificateDesignerComponent } from 'src/app/certificate-designer/certificate-designer.component';

class CertificateDefaultTemplateValues {
  name?: string = '[ NAME ]';
  institution_name?: string = '[ INSTITUTION NAME ]';
  description?: string = '[ DESCRIPTION ]';
  person_one?: string = '[ PERSON 1 ]';
  person_two?: string = '[ PERSON 2 ]';
  date?: string = '[ DATE ]';
}

const certificate_height = 500;
const certificate_width = 1000;

export class DefaultCertificateTemplate {
  // public layers: Array<Konva.Layer> = [];
  // public stage: any;
  // public objects: Array<KonvaDefault | KonvaText> = [];
  // public indexes: number = 0;
  // public configTransform: any;
  public component: CertificateDesignerComponent;

  constructor(component: CertificateDesignerComponent) {
    this.component = component;
    // this.layers = layers;
    // this.stage = stage;
    // this.objects = objects;
    // this.indexes = indexes;
    // this.configTransform = configTransform;
  }

  private _addText(data: AditionalTextConfig): void {
    let text: KonvaDefault = new KonvaText(this.component.indexes++, data);

    this.component.layers.push(text.layer);
    this.component.stage.add(text.layer);
    this.component.objects.push(text);

    this.component.configTransform(text);
  }

  private _addLine(config?: LineConfig): void {
    const object = new KonvaLine(this.component.indexes++, config);

    this.component.layers.push(object.layer);
    this.component.stage.add(object.layer);
    this.component.objects.push(object);

    this.component.configTransform(object);
  }

  public factory(
    seed: CertificateDefaultTemplateValues = new CertificateDefaultTemplateValues()
  ) {
    // Certificate
    this._addText({
      config: {
        x: (certificate_width - 600) / 2,
        y: 40,
        width: 600,
        align: 'center',
        fontSize: 20,
      },
      text: 'Certificate',
    });

    // title
    this._addText({
      config: {
        x: (certificate_width - 600) / 2,
        y: 100,
        width: 600,
        align: 'center',
        fontSize: 40,
      },
      text: seed.name,
    });

    // institution
    this._addText({
      config: {
        x: (certificate_width - 600) / 2,
        y: 200,
        width: 600,
        align: 'center',
        fontSize: 20,
      },
      text: seed.institution_name,
    });

    // text
    this._addText({
      config: {
        x: (certificate_width - 600) / 2,
        y: 300,
        width: 600,
        align: 'center',
        fontSize: 20,
        height: 160,
        verticalAlign: 'center',
      },
      text: seed.description,
    });

    // date
    this._addText({
      config: {
        x: (certificate_width - 300) / 2,
        y: 460,
        width: 300,
        align: 'center',
        fontSize: 15,
        verticalAlign: 'center',
      },
      text: seed.date,
    });

    const SIGNATURE_WIDTH = 300;
    const SIGNATURE_ONE_X_POSITION = 40;
    const SIGNATURE_TWO_X_POSITION = certificate_width - 340;

    // signature 2
    this._addText({
      config: {
        x: SIGNATURE_ONE_X_POSITION,
        y: 440,
        width: SIGNATURE_WIDTH,
        align: 'center',
        fontSize: 15,
        verticalAlign: 'center',
      },
      text: seed.person_one,
    });

    this._addLine({
      points: [
        SIGNATURE_ONE_X_POSITION, // x start
        430, // y start
        SIGNATURE_ONE_X_POSITION + SIGNATURE_WIDTH, // x end
        430, // y end
      ],
      strokeWidth: 2,
    });

    this._addLine({
      points: [
        SIGNATURE_TWO_X_POSITION, // x start
        430, // y start
        SIGNATURE_TWO_X_POSITION + SIGNATURE_WIDTH, // x end
        430, // y end
      ],
      strokeWidth: 2,
    });

    // signature 1
    this._addText({
      config: {
        x: SIGNATURE_TWO_X_POSITION,
        y: 440,
        width: SIGNATURE_WIDTH,
        align: 'center',
        fontSize: 15,
        verticalAlign: 'center',
      },
      text: seed.person_two,
    });
  }
}
