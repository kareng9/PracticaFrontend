import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CrearProductTypeDto } from 'src/app/models/crearProductTypeDto';
import { ProductTypeDto } from 'src/app/models/ProductTypeDto';
import { ProductTypeService } from 'src/app/services/product-type.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GlobalParams } from 'src/app/models/globalParams';
@Component({
  selector: 'app-product-type',
  templateUrl: './product-type.component.html',
  styleUrls: ['./product-type.component.scss']
})
export class ProductTypeComponent implements OnInit {

  productTypes:Array<ProductTypeDto> = [];
  selectedProductType!:ProductTypeDto;
  formulario!: FormGroup;
  productType : CrearProductTypeDto;
  submitted = false;

  constructor(private productTypeService: ProductTypeService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {
      this.productType = {name:''};
     }

  ngOnInit(): void {
    this.productTypeService.getProductTypes(new GlobalParams()).subscribe(
      data => this.productTypes = data
    );
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
    });

  }
  get f() {
    return this.formulario.controls;
  }

  editProductType(code:string, content:any) {
    this.productTypeService.getProductTypeById(code).subscribe(
      response => {
        this.selectedProductType = response;
        console.log(this.selectedProductType);
        this.buildForm();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      }
    );
  }

  deleteProductType(id: string){
    this.productTypeService.deleteProductType(id).subscribe(()=>{
      console.log('borrado');
      window.location.reload();
    })
  }

  buildForm() {
    this.formulario= this.formBuilder.group({
      id: [{value: this.selectedProductType.id, disabled: true}, [Validators.required, Validators.maxLength(4)]],
      name: [this.selectedProductType.name, [Validators.required, Validators.pattern(/^[a-zA-Z0-0-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]]
    });
  }

  postProductType(){
    console.log(this.formulario);
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }

   this.productTypeService.createProductType(this.productType).subscribe((data)=>{
    console.log(data);
    window.location.reload();

   },error=>{
      console.log(error);
  });
  }

  refrescar(): void {
    window.location.reload();
  }

  updateProductType(content:any) {
    if(this.formulario.invalid) {
      return;
    }

    console.log(this.formulario.value);
    console.log(this.formulario.getRawValue());

    this.productTypeService.updateProductType(this.formulario.getRawValue()).subscribe(
      response => console.log(response)
    );
  }
}
