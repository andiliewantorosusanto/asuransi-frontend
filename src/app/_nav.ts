import { INavData } from '@coreui/angular';

export const navItems: INavData[] = [
  {
    title: true,
    name: 'Upgrade Asuransi'
  },
  {
    name: 'Simulasi Upgrade',
    url: '/upgrade/simulasi',
    icon: 'cil-money',
  },
  {
    name: 'List Pengajuan',
    url: '/upgrade/list-pengajuan',
    icon: 'cil-task',
  },
  {
    name: 'List Order Maskapai',
    url: '/upgrade/list-order-maskapai',
    icon: 'icon-arrow-up-circle',
  },
  {
    name: 'Report',
    url: '/upgrade/report',
    icon: 'cil-chart',
  }
];
