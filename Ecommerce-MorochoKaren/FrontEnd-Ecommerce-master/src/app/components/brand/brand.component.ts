import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BrandDto } from 'src/app/models/brandDto';
import { CrearBrandDto } from 'src/app/models/crearBrandDto';
import { BrandService } from 'src/app/services/brand.service';
import { GlobalParams } from '../../models/globalParams';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  brands:Array<BrandDto> = [];
  selectedBrand!:BrandDto;
  formulario!: FormGroup;
  brand : CrearBrandDto;
  submitted = false;

  constructor(private brandService: BrandService,
    private modalService: NgbModal,
    private formBuilder: FormBuilder) {
      this.brand = {name:''};
     }

  ngOnInit(): void {
    this.brandService.getBrands(new GlobalParams()).subscribe(
      data => this.brands = data
    );
    this.formulario = this.formBuilder.group({
      name: ['', Validators.required],
    });

  }
  get f() {
    return this.formulario.controls;
  }

  editBrand(code:string, content:any) {
    this.brandService.getBrandById(code).subscribe(
      response => {
        this.selectedBrand = response;
        console.log(this.selectedBrand);
        this.buildForm();
        this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'})
      }
    );
  }

  deleteBrand(id: string){
    this.brandService.deleteBrand(id).subscribe(()=>{
      console.log('borrado');
      window.location.reload();
    })
  }

  buildForm() {
    this.formulario= this.formBuilder.group({
      id: [{value: this.selectedBrand.id, disabled: true}, [Validators.required, Validators.maxLength(4)]],
      name: [this.selectedBrand.name, [Validators.required, Validators.pattern(/^[a-zA-Z0-0-_\s.áéíóúÁÉÍÓÚñÑ]+$/)]]
    });
  }

  postMarca(){
    console.log(this.formulario);
    this.submitted = true;
    if (this.formulario.invalid) {
      return;
    }

   this.brandService.createBrand(this.brand).subscribe((data)=>{
    console.log(data);
    window.location.reload();

   },error=>{
      console.log(error);
  });
  }

  refrescar(): void {
    window.location.reload();
  }

  updateBrand(content:any) {
    if(this.formulario.invalid) {
      return;
    }

    console.log(this.formulario.value);
    console.log(this.formulario.getRawValue());

    this.brandService.updateBrand(this.formulario.getRawValue()).subscribe(
      response => console.log(response)
    );
  }

}
