import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificateDesignerComponent } from './certificate-designer.component';

describe('CertificateDesignerComponent', () => {
  let component: CertificateDesignerComponent;
  let fixture: ComponentFixture<CertificateDesignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertificateDesignerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificateDesignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
