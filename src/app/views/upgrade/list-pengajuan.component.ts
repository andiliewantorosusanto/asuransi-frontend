import { FormSimulasi } from './../../models/form-simulasi.model';
import { Router } from '@angular/router';
import { SimulasiUpgradeService } from './../../services/simulasi-upgrade.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-list-pengajuan',
  templateUrl: './list-pengajuan.component.html'
})
export class ListPengajuanComponent   {
  listPengajuan : FormSimulasi[] = [];
  list : FormSimulasi[] = [];
  countPengajuan : any[];
  prosesPembayaran : number = 0;
  pembayaranBerhasil : number = 0;
  lewatMasaPembayaran : number = 0;
  orderKeMaskapai : number = 0;
  page: number = 1;
  search: string = "";

  isProsesPembayaran = false;
  isPembayaranBerhasil = false;
  isLewatMasaPembayaran = false;
  isOrderKeMaskapai = false;

  constructor(
    private simulasiUpgradeService : SimulasiUpgradeService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getList();
  }

  filterData(): void {
    this.list = [];

    if(this.isProsesPembayaran) {
      Array.prototype.push.apply(this.list,this.listPengajuan.filter(x => x.statusUpgradeId == 1));
    }

    if(this.isPembayaranBerhasil) {
      Array.prototype.push.apply(this.list,this.listPengajuan.filter(x => x.statusUpgradeId == 2));
    }

    if(this.isLewatMasaPembayaran) {
      Array.prototype.push.apply(this.list,this.listPengajuan.filter(x => x.statusUpgradeId == 3));
    }

    if(this.isOrderKeMaskapai) {
      Array.prototype.push.apply(this.list,this.listPengajuan.filter(x => x.statusUpgradeId >= 4));
    }

    if(!this.isProsesPembayaran && !this.isPembayaranBerhasil && !this.isLewatMasaPembayaran && !this.isOrderKeMaskapai) {
      this.list = this.listPengajuan;
    }

    if(this.search != "") {
      this.list = this.list.filter(x => x.nama.toUpperCase().includes(this.search.toUpperCase()) || x.va.includes(this.search) || x.nomorRekening.includes(this.search));
    }

  }

  toggleProsesPembayaran(): void {
    this.isProsesPembayaran = !this.isProsesPembayaran;
    this.filterData();
  }

  togglePembayaranBerhasil(): void {
    this.isPembayaranBerhasil = !this.isPembayaranBerhasil;
    this.filterData();
  }

  toggleLewatMasaPembayaran(): void {
    this.isLewatMasaPembayaran = !this.isLewatMasaPembayaran;
    this.filterData();
  }

  toggleOrderKeMaskapai(): void {
    this.isOrderKeMaskapai = !this.isOrderKeMaskapai;
    this.filterData();
  }

  detail($id): void {
    this.router.navigate([`/upgrade/pengajuan-detail/${$id}`]);
  }

  getList(): void {
    this.simulasiUpgradeService.getList()
      .subscribe(
      res => {
        this.listPengajuan = res['data'].pengajuanSimulasi;
        this.list = this.listPengajuan;
        this.countPengajuan = res['data'].countPengajuan;
        this.countPengajuan.forEach(element => {
          if(element.id == 1) {
            this.prosesPembayaran = element.count;
          } else if(element.id == 2) {
            this.pembayaranBerhasil = element.count;
          } else if(element.id == 3) {
            this.lewatMasaPembayaran = element.count;
          } else {
            this.orderKeMaskapai += element.count;
          }
        });
      },
      error => {
        console.log(error);
      });
  }
}
