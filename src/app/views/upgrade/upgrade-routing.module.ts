import { PengajuanDetailComponent } from './pengajuan-detail.component';
import { OrderMaskapaiDetailComponent } from './order-maskapai-detail.component';
import { ListOrderMaskapaiComponent } from './list-order-maskapai.component';
import { ListPengajuanComponent } from './list-pengajuan.component';
import { ReportComponent } from './report.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SimulasiComponent } from './simulasi.component';

const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Upgrade'
    },
    children: [
      {
        path: '',
        redirectTo: 'simulasi'
      },
      {
        path: 'simulasi',
        component: SimulasiComponent,
        data: {
          title: 'Upgrade Simulasi'
        }
      },
      {
        path: 'list-order-maskapai',
        component: ListOrderMaskapaiComponent,
        data: {
          title: 'List Order Maskapai'
        }
      },
      {
        path: 'report',
        component: ReportComponent,
        data: {
          title: 'Report'
        }
      },
      {
        path: 'list-pengajuan',
        component: ListPengajuanComponent,
        data: {
          title: 'List Pengajuan'
        }
      },
      {
        path: 'pengajuan-detail/:id',
        component: PengajuanDetailComponent,
        data: {
          title: 'Pengajuan Detail'
        }
      },
      {
        path: 'order-maskapai-detail/:id',
        component: OrderMaskapaiDetailComponent,
        data: {
          title: 'Order Maskapai Detail'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UpgradeRoutingModule {}
