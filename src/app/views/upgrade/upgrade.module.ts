import { OrderMaskapaiDetailComponent } from './order-maskapai-detail.component';
import { ListOrderMaskapaiComponent } from './list-order-maskapai.component';
import { PengajuanDetailComponent } from './pengajuan-detail.component';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { FormsModule } from '@angular/forms';
import { ListPengajuanComponent } from './list-pengajuan.component';
import { ReportComponent } from './report.component';
import { NgModule } from '@angular/core';
import { ChartsModule } from 'ng2-charts';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { SimulasiComponent } from './simulasi.component';
import { UpgradeRoutingModule } from './upgrade-routing.module';
import { CommonModule } from '@angular/common';
import { DpDatePickerModule } from 'ng2-date-picker';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  imports: [
    UpgradeRoutingModule,
    ChartsModule,
    BsDropdownModule,
    FormsModule,
    TabsModule,
    CommonModule,
    DpDatePickerModule,
    NgxPaginationModule
  ],
  declarations: [
    ListOrderMaskapaiComponent,
    ListPengajuanComponent,
    OrderMaskapaiDetailComponent,
    PengajuanDetailComponent,
    ReportComponent,
    SimulasiComponent,
  ]
})
export class UpgradeModule { }
