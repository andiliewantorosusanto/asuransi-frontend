import { FormSimulasi } from './../../models/form-simulasi.model';
import { Router } from '@angular/router';
import { SimulasiUpgradeService } from './../../services/simulasi-upgrade.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-list-order-maskapai',
  templateUrl: './list-order-maskapai.component.html'
})
export class ListOrderMaskapaiComponent   {
  listPengajuan : FormSimulasi[] = [];
  list : FormSimulasi[] = [];
  countPengajuan : any[];
  pengajuanKP : number = 0;
  diprosesKP : number = 0;
  dipendingKP : number = 0;
  polisTerbit : number = 0;

  page: number = 1;
  search: string = "";

  isPengajuanKP = false;
  isDiprosesKP = false;
  isDipendingKP = false;
  isPolisTerbit = false;

  constructor(
    private simulasiUpgradeService : SimulasiUpgradeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  filterData(): void {
    this.list = [];

    if(this.isPengajuanKP) {
      Array.prototype.push.apply(this.list,this.listPengajuan.filter(x => x.statusUpgradeId == 4));
    }

    if(this.isDiprosesKP) {
      Array.prototype.push.apply(this.list,this.listPengajuan.filter(x => x.statusUpgradeId == 5));
    }

    if(this.isDipendingKP) {
      Array.prototype.push.apply(this.list,this.listPengajuan.filter(x => x.statusUpgradeId == 6));
    }

    if(this.isPolisTerbit) {
      Array.prototype.push.apply(this.list,this.listPengajuan.filter(x => x.statusUpgradeId == 7));
    }

    if(!this.isPengajuanKP && !this.isDiprosesKP && !this.isDipendingKP && !this.isPolisTerbit) {
      this.list = this.listPengajuan;
    }

    if(this.search != "") {
      this.list = this.list.filter(x => x.nama.toUpperCase().includes(this.search.toUpperCase()) || x.va.includes(this.search) || x.nomorRekening.includes(this.search));
    }

  }

  toggleProsesPembayaran(): void {
    this.isPengajuanKP = !this.isPengajuanKP;
    this.filterData();
  }

  togglePembayaranBerhasil(): void {
    this.isDiprosesKP = !this.isDiprosesKP;
    this.filterData();
  }

  toggleLewatMasaPembayaran(): void {
    this.isDipendingKP = !this.isDipendingKP;
    this.filterData();
  }

  toggleOrderKeMaskapai(): void {
    this.isPolisTerbit = !this.isPolisTerbit;
    this.filterData();
  }

  detail($id): void {
    this.router.navigate([`/upgrade/order-maskapai-detail/${$id}`]);
  }

  getList(): void {
    this.simulasiUpgradeService.getMaskapaiList()
      .subscribe(
      res => {
        this.listPengajuan = res['data'].pengajuanSimulasi;
        this.list = this.listPengajuan;
        this.countPengajuan = res['data'].countPengajuan;
        this.countPengajuan.forEach(element => {
          if(element.id == 4) {
            this.pengajuanKP = element.count;
          } else if(element.id == 5) {
            this.diprosesKP = element.count;
          } else if(element.id == 6) {
            this.dipendingKP = element.count;
          } else if(element.id == 7){
            this.polisTerbit += element.count;
          }
        });
      },
      error => {
        console.log(error);
      });
  }
}
