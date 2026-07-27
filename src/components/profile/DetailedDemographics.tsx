"use client";

import React from "react";
import { MotionSection } from "@/components/animations/MotionSection";
import { GraduationCap, Briefcase, MapPin, Users } from "lucide-react";

const demographicsData = {
  total: 279,
  dusun1: {
    total: 76,
    pendidikan: {
      "SD": 21,
      "SMP": 18,
      "SMA": 16,
      "S1": 9,
      "TK": 5,
      "D1": 1,
      "D3": 1,
      "Tidak Tamat SD/Belum Sekolah": 4,
      "Tidak Diketahui": 1,
    },
    pekerjaan: {
      "Pelajar": 27,
      "IRT": 15,
      "Petani": 9,
      "Buruh Pabrik": 6,
      "Tidak Bekerja": 5,
      "Honorer": 5,
      "Wiraswasta": 3,
      "Pegawai Swasta": 3,
      "PNS": 1,
      "Bidan": 1,
      "Belum/Tidak Bekerja": 1,
    }
  },
  dusun2: {
    total: 98,
    pendidikan: {
      "SMA": 33,
      "SMP": 20,
      "S1": 14,
      "SD": 12,
      "Tidak Tamat SD/Belum Sekolah": 12,
      "TK": 4,
      "D3": 2,
      "D1": 1,
    },
    pekerjaan: {
      "Pelajar": 28,
      "IRT": 21,
      "Wiraswasta": 13,
      "Buruh Pabrik": 9,
      "Belum/Tidak Bekerja": 8,
      "Tidak Bekerja": 7,
      "Honorer": 4,
      "Petani": 4,
      "PNS": 3,
      "Nelayan": 1,
    }
  },
  dusun3: {
    total: 105,
    pendidikan: {
      "SMA": 34,
      "SD": 21,
      "SMP": 19,
      "TK": 11,
      "S1": 8,
      "Tidak Tamat SD/Belum Sekolah": 11,
      "D3": 1,
    },
    pekerjaan: {
      "Pelajar": 33,
      "IRT": 20,
      "Petani": 13,
      "Buruh Pabrik": 8,
      "Belum/Tidak Bekerja": 11,
      "Wiraswasta": 5,
      "PNS": 5,
      "Tidak Bekerja": 5,
      "Honorer": 1,
      "Nelayan": 1,
      "Perawat": 1,
      "Bidan": 1,
      "Buruh Tani": 1,
    }
  },
  totals: {
    pendidikan: {
      "SMA": 83,
      "SMP": 57,
      "SD": 54,
      "S1": 31,
      "Tidak Tamat SD/Belum Sekolah": 27,
      "TK": 20,
      "D3": 4,
      "D1": 2,
      "Tidak Diketahui": 1,
    },
    pekerjaan: {
      "Pelajar": 88,
      "IRT": 56,
      "Petani": 26,
      "Buruh Pabrik": 23,
      "Wiraswasta": 21,
      "Belum/Tidak Bekerja": 20,
      "Tidak Bekerja": 17,
      "Honorer": 10,
      "PNS": 9,
      "Pegawai Swasta": 3,
      "Nelayan": 2,
      "Bidan": 2,
      "Perawat": 1,
      "Buruh Tani": 1,
    }
  }
};

const DataCard = ({ title, icon: Icon, data, total, male, female }: { title: string, icon: any, data: Record<string, number>, total?: number, male?: number, female?: number }) => (
  <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100/50 hover:shadow-md transition-shadow">
    <div className="flex items-center gap-3 mb-6 pb-4 border-b border-gray-50">
      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
        <Icon className="w-5 h-5" />
      </div>
      <div>
        <h4 className="font-bold text-foreground">{title}</h4>
        {total && (
          <div className="flex flex-col gap-0.5 mt-1">
             <p className="text-sm font-semibold text-primary">Total: {total} Jiwa</p>
             {(male !== undefined && female !== undefined) && (
               <p className="text-xs text-muted-foreground">
                 L: {male} | P: {female}
               </p>
             )}
          </div>
        )}
      </div>
    </div>
    <ul className="space-y-3">
      {Object.entries(data).sort((a, b) => b[1] - a[1]).map(([label, count], idx) => (
        <li key={idx} className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">{label}</span>
          <span className="font-semibold text-foreground bg-accent/10 text-accent-dark px-2 py-1 rounded-md min-w-[3rem] text-center">
            {count}
          </span>
        </li>
      ))}
    </ul>
  </div>
);

export function DetailedDemographics() {
  return (
    <div className="mt-24 space-y-16">
      <MotionSection>
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Rincian Data Penduduk</h2>
          <p className="text-muted-foreground text-lg">
            Rekapitulasi lengkap data kependudukan per wilayah (Dusun) tanpa informasi sensitif, dirangkum menjadi {demographicsData.total} jiwa.
          </p>
        </div>
      </MotionSection>

      {/* Pendidikan Section */}
      <div className="space-y-8">
        <MotionSection direction="left">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl">
              <GraduationCap className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Tingkat Pendidikan Warga</h3>
          </div>
        </MotionSection>

        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          <MotionSection direction="up" delay={0.1} className="h-full">
            <DataCard title="Dusun 1" icon={MapPin} data={demographicsData.dusun1.pendidikan} total={demographicsData.dusun1.total} male={39} female={37} />
          </MotionSection>
          <MotionSection direction="up" delay={0.2} className="h-full">
            <DataCard title="Dusun 2" icon={MapPin} data={demographicsData.dusun2.pendidikan} total={demographicsData.dusun2.total} male={52} female={46} />
          </MotionSection>
          <MotionSection direction="up" delay={0.3} className="h-full">
            <DataCard title="Dusun 3" icon={MapPin} data={demographicsData.dusun3.pendidikan} total={demographicsData.dusun3.total} male={59} female={46} />
          </MotionSection>
          <MotionSection direction="up" delay={0.4} className="h-full">
            <div className="h-full relative overflow-hidden rounded-2xl bg-gradient-to-br from-primary to-primary-dark text-white p-6 shadow-glass-lg">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Users className="w-32 h-32" />
              </div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6 pb-4 border-b border-white/20">
                  <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center backdrop-blur-sm">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold">Total Pendidikan</h4>
                    <p className="text-sm text-primary-light">Seluruh Desa</p>
                  </div>
                </div>
                <ul className="space-y-3">
                  {Object.entries(demographicsData.totals.pendidikan).sort((a, b) => b[1] - a[1]).slice(0, 7).map(([label, count], idx) => (
                    <li key={idx} className="flex items-center justify-between text-sm">
                      <span className="text-primary-light">{label}</span>
                      <span className="font-semibold bg-white/20 px-2 py-1 rounded-md min-w-[3rem] text-center backdrop-blur-sm">
                        {count}
                      </span>
                    </li>
                  ))}
                  {Object.keys(demographicsData.totals.pendidikan).length > 7 && (
                     <li className="text-center text-sm text-primary-light italic mt-2 opacity-80">Dan lainnya...</li>
                  )}
                </ul>
              </div>
            </div>
          </MotionSection>
        </div>
      </div>

      {/* Data Tambahan (Placeholder/Rekomendasi) */}
      <div className="space-y-8 pt-8">
        <MotionSection direction="right">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-3 bg-green-50 text-green-600 rounded-2xl">
              <Briefcase className="w-6 h-6" />
            </div>
            <h3 className="text-2xl font-bold text-foreground">Potensi & Fasilitas Desa (Rekomendasi)</h3>
          </div>
        </MotionSection>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-accent/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/4" />
          
          <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
            <div className="w-20 h-20 bg-accent/10 text-accent-dark rounded-2xl flex items-center justify-center shrink-0">
              <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2v20"></path><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
            </div>
            <div>
              <h4 className="text-xl font-bold text-foreground mb-3">Area Ini Menunggu Data Anda!</h4>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Sebagai pengganti data mata pencaharian, Anda dapat memasukkan statistik penting lainnya untuk menonjolkan keunggulan Desa Pudonggala. Kami merekomendasikan:
              </p>
              <ul className="list-disc list-inside text-sm text-muted-foreground space-y-2 mb-6">
                <li><strong className="text-foreground">Fasilitas Umum & Pendidikan:</strong> Jumlah Sekolah Dasar, SMP, Posyandu, Masjid/Musholla.</li>
                <li><strong className="text-foreground">Statistik Agama:</strong> Mayoritas komposisi agama warga desa.</li>
                <li><strong className="text-foreground">Potensi Desa:</strong> Luas lahan pertanian, jumlah UMKM terdaftar, dll.</li>
              </ul>
              <div className="inline-block bg-primary/10 text-primary-dark font-medium px-4 py-2 rounded-lg text-sm border border-primary/20">
                Hubungi administrator/developer untuk menambahkan data ini.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
