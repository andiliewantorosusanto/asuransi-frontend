import { Rate } from './../../models/rate.model';
import { RateTjh } from './../../models/rate-tjh.model';
import { Router } from '@angular/router';
import { PolisTahunan } from './../../models/polis-tahunan.model';
import { FormSimulasi } from './../../models/form-simulasi.model';
import { SimulasiUpgradeService } from './../../services/simulasi-upgrade.service';
import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-simulasi',
  templateUrl: './simulasi.component.html'
})
export class SimulasiComponent implements OnInit {

  polisTahunan: PolisTahunan[] = [];
  formSimulasi: FormSimulasi = new FormSimulasi;
  rateTjh: RateTjh[] = [];
  nomorKontrak: string;
  isFormHidden: boolean = true;

  constructor(
    private simulasiUpgradeService : SimulasiUpgradeService,
    private router: Router
  ) { }

  ngOnInit(): void {

  }


  insertSimulasi(): void {
    this.formSimulasi.TJH = this.rateTjh[this.formSimulasi.TJH].CustomerPremium;
    this.simulasiUpgradeService.insertSimulasi(this.formSimulasi)
      .subscribe(
        res => {
          let polises = [];
          let id = res['data'].simulasi.id;
          this.polisTahunan.forEach(p => {

            p.pengajuanUpgradeAsuransiId = id;
            polises.push(p);
          });
          this.simulasiUpgradeService.insertMassPolisTahunan(polises,id)
          .subscribe(
            res => {
              Swal.fire("Sukses","Pengajuan Upgrade Telah Diajukan","success")
              .then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate([`/upgrade/pengajuan-detail/${id}`]);
                }
              });
            },
            error => {
              console.log(error);
            }
          )

        },
        error => {
          console.log(error);
        }
      )
  }

  getSimulasiUpgradeData(): void {
    this.simulasiUpgradeService.getSimulasiUpgradeDataByNomorKontrak(this.nomorKontrak.slice(0,10),this.nomorKontrak.slice(-3))
      .subscribe(
      res => {
        this.isFormHidden = false;
        this.formSimulasi = res['data'].formSimulasi;

        this.formSimulasi.biayaAdmin  = 14000;
        this.formSimulasi.totalPremiPertanggungan = 0;
        this.formSimulasi.totalPremiPerluasan = 0;
        this.formSimulasi.totalBiaya  = 14000;

        if(new Date().getFullYear() - Number(this.formSimulasi.tahunKendaraan) > 5) {
          this.formSimulasi.biayaLoading = true;
        } else {
          this.formSimulasi.biayaLoading = false;
        }

        this.formSimulasi.remarks = "";
        this.rateTjh = res['data'].rateTjh;
        this.polisTahunan = res['data'].polisTahunan;
        this.formSimulasi.RSCC = 0;
        this.formSimulasi.bencanaAlam = 0;
        this.formSimulasi.TJH = 0;
        this.formSimulasi.aksesoris = 0;
      },
      error => {
        console.log(error);
      });
  }

  calculateSimulasi(): void {
    this.formSimulasi.totalPremiPerluasan = 0;
    this.formSimulasi.totalPremiPertanggungan = 0;
    this.polisTahunan.forEach(p => {
      p.aksesorisRate = 0;
      p.aksesoris = 0;
      p.TJH = 0;
      p.bencanaAlamRate = 0;
      p.bencanaAlam = 0;
      p.RSCCRate = 0;
      p.RSCC = 0;
      p.premiRate = 0;
      p.totalPremiPertanggungan = 0;
      p.upgradeAllRisk = false;
    });

    this.polisTahunan.filter(x => x.tahun >= this.formSimulasi.periodeUpgradeDari && x.tahun <= this.formSimulasi.periodeUpgradeSampai).forEach(p => {

      let type = (this.formSimulasi.upgradeAllRisk) ? "All RISK" : p.jenisAsuransi;
      let rate : Rate = p.rate.find(x => x.TypeName.toUpperCase() == type.toUpperCase());

      let prorata = 1;
      if(p.prorata >= 1) {
        prorata = p.prorata/365;
      }

      if(this.formSimulasi.biayaLoading) {
        prorata *= 1.05;
      }

      p.TJH = this.rateTjh[this.formSimulasi.TJH].CustomerPremium * prorata;
      p.aksesorisRate = rate.CustomerRate;
      p.aksesoris = rate.CustomerRate * this.formSimulasi.aksesoris / 100 * prorata;
      p.bencanaAlamRate = rate.CustomerRateBanjir;
      p.bencanaAlam = rate.CustomerRateBanjir * this.formSimulasi.bencanaAlam / 100 * prorata;
      p.RSCCRate = rate.CustomerRateRSCC;
      p.RSCC = rate.CustomerRateRSCC * this.formSimulasi.RSCC / 100 * prorata;
      p.premiRate = rate.CustomerRate;
      if(p.jenisAsuransi.toUpperCase() != type.toUpperCase()) {
        p.totalPremiPertanggungan = (rate.CustomerRate - p.rate.find(x=> x.TypeName.toUpperCase() == "TLO").CustomerRate) * p.nilaiPertanggungan / 100 * prorata;
        p.upgradeAllRisk = true;
      }

      p.totalPremiPerluasan = p.aksesoris + p.bencanaAlam + p.RSCC + Number(p.TJH);
      this.formSimulasi.totalPremiPertanggungan += p.totalPremiPertanggungan;
      this.formSimulasi.totalPremiPerluasan += p.totalPremiPerluasan;

    });

    this.formSimulasi.totalBiaya = this.formSimulasi.totalPremiPerluasan + this.formSimulasi.totalPremiPertanggungan + this.formSimulasi.biayaAdmin;
  }

}
