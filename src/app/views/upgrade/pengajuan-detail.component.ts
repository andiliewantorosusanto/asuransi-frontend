import { Timeline } from './../../models/timeline.model';
import { FilePengajuan } from './../../models/file-pengajuan.model';
import { ActivatedRoute,Router } from '@angular/router';
import { PolisTahunan } from './../../models/polis-tahunan.model';
import { FormSimulasi } from './../../models/form-simulasi.model';
import { SimulasiUpgradeService } from './../../services/simulasi-upgrade.service';
import { Component, OnInit } from '@angular/core';
import Swal from "sweetalert2";

@Component({
  selector: 'app-pengajuan-detail',
  templateUrl: './pengajuan-detail.component.html'
})
export class PengajuanDetailComponent implements OnInit {

  polisTahunan: PolisTahunan[] = [];
  formSimulasi: FormSimulasi = new FormSimulasi;
  files: FilePengajuan[] = []
  fileToUpload: File | null = null;
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

  toBucketKp(id) {
    let timeline = new Timeline;
    timeline.komentar = "Pengajuan pertama ke kantor pusat untuk order maskapai";
    timeline.pengajuanUpgradeAsuransiId = id;
    timeline.statusUpgradeId = "4";
    this.simulasiUpgradeService.changeStatus(id,timeline).subscribe(data => {
      Swal.fire("Sukses","Pengajuan masuk ke bucket KP","success")
      .then((result) => {
        if (result.isConfirmed) {
          this.router.navigate([`/upgrade/order-maskapai-detail/${id}`]);
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
      },
      error => {
        console.log(error);
      });
  }



}
