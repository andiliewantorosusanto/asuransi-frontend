import { Rate } from './rate.model';
export class PolisTahunan {
  tahun?: number;
  jenisAsuransi?: string;
  periodePolisDari?: string;
  periodePolisSampai?: string;
  penyusutan?: number;
  nilaiPertanggungan?: number;
  rate?: Rate[];
  premiRate: number;
  totalPremiPertanggungan: number = 0;
  RSCC: number = 0;
  RSCCRate: number;
  bencanaAlam: number = 0;
  bencanaAlamRate: number;
  TJH: number  = 0;
  TJHRate: number;
  aksesoris: number  = 0;
  aksesorisRate: number;
  totalPremiPerluasan: number  = 0;
  prorata: number = 0;
  upgradeAllRisk: Boolean;
  pengajuanUpgradeAsuransiId: number;
}
