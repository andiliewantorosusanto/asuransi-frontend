import { Timeline } from './../../models/timeline.model';
import { FilePengajuan } from './../../models/file-pengajuan.model';
import { Router, ActivatedRoute } from '@angular/router';
import { PolisTahunan } from './../../models/polis-tahunan.model';
import { FormSimulasi } from './../../models/form-simulasi.model';
import { SimulasiUpgradeService } from './../../services/simulasi-upgrade.service';
import { Component, OnInit } from '@angular/core';
import {formatDate } from '@angular/common';
import Swal from "sweetalert2";

@Component({
  selector: 'app-order-maskapai-detail',
  templateUrl: './order-maskapai-detail.component.html'
})
export class OrderMaskapaiDetailComponent implements OnInit {

  polisTahunan: PolisTahunan[] = [];
  formSimulasi: FormSimulasi = new FormSimulasi;
  files: FilePengajuan[] = []
  fileToUpload: File | null = null;
  timeline: Timeline = new Timeline;
  timelines: Timeline[] = [];

  constructor(
    private simulasiUpgradeService : SimulasiUpgradeService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSimulasiUpgradeData(this.activatedRoute.snapshot.params.id);
  }

  showPDF(fileName: string): void {
    this.simulasiUpgradeService.getPDF(this.activatedRoute.snapshot.params.id)
        .subscribe(x => {
            var newBlob = new Blob([x], { type: "application/pdf" });

            if (window.navigator && window.navigator.msSaveOrOpenBlob) {
                window.navigator.msSaveOrOpenBlob(newBlob, fileName);
                return;
            }

            const data = window.URL.createObjectURL(newBlob);

            var link = document.createElement('a');
            link.href = data;
            link.download = fileName;

            link.dispatchEvent(new MouseEvent('click', { bubbles: true, cancelable: true, view: window }));

            setTimeout(function () {
                window.URL.revokeObjectURL(data);
                link.remove();
            }, 100);
        });
  }

  downloadFile(url:string,fileName: string): void {
    window.open(url, "_blank");
  }

  handleFileInput(files: FileList,id) {
    this.fileToUpload = files.item(0);
    this.uploadFileToActivity(id);
}

  uploadFileToActivity(id) {
    this.simulasiUpgradeService.postFile(this.fileToUpload,id).subscribe(data => {
        this.files.push(data['data']);
      }, error => {
        console.log(error);
      });
  }

  changeStatus(id) {
    this.simulasiUpgradeService.changeStatus(id,this.timeline).subscribe(data => {
      Swal.fire("Sukses","Status telah terupdate","success")
      .then((result) => {
        if (result.isConfirmed) {
          this.router.navigate([`/upgrade/list-order-maskapai`]);
        }
      });
    }, error => {
      console.log(error);
    });
  }


  getSimulasiUpgradeData(id): void {
    this.simulasiUpgradeService.getSimulasiDetailById(id)
      .subscribe(
      res => {
        this.formSimulasi = res['data'].pengajuanSimulasi;
        this.polisTahunan = res['data'].polisTahunan;
        this.files = res['data'].file;
        this.timelines = res['data'].timeline;

        this.timelines.forEach(element => {
          element.created_at = formatDate(element.created_at, 'yyyy-MM-dd', 'en-US')
        });
      },
      error => {
        console.log(error);
      });
  }



}
