"use client";

import React, { useState } from "react";
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LabelList,
  Sector
} from "recharts";
import { MotionSection } from "@/components/animations/MotionSection";
import { Users, PieChart as PieChartIcon, BarChart3, GraduationCap, Briefcase } from "lucide-react";

const genderData = [
  { name: "Laki-laki", value: 142 },
  { name: "Perempuan", value: 127 },
];

const dusunData = [
  { name: "Dusun 1", LakiLaki: 40, Perempuan: 37 },
  { name: "Dusun 2", LakiLaki: 50, Perempuan: 44 },
  { name: "Dusun 3", LakiLaki: 52, Perempuan: 46 },
];

const ageData = [
  { name: "Balita (1-5)", jumlah: 8 },
  { name: "Anak & Remaja (6-15)", jumlah: 61 },
  { name: "Dewasa (16-56)", jumlah: 175 },
  { name: "Lansia (>56)", jumlah: 25 },
];

const educationData = [
  { name: "SD", jumlah: 54 },
  { name: "SMP", jumlah: 57 },
  { name: "SMA", jumlah: 83 },
  { name: "Sarjana", jumlah: 31 },
  { name: "Belum/Tidak Sekolah", jumlah: 44 },
];

const jobData = [
  { name: "Pelajar", d1: 27, d2: 26, d3: 34, size: 87 },
  { name: "IRT", d1: 15, d2: 21, d3: 20, size: 56 },
  { name: "Petani", d1: 9, d2: 4, d3: 13, size: 26 },
  { name: "Buruh Pabrik", d1: 6, d2: 9, d3: 8, size: 23 },
  { name: "Wiraswasta", d1: 3, d2: 13, d3: 5, size: 21 },
  { name: "Tidak Bekerja", d1: 6, d2: 6, d3: 2, size: 14 },
  { name: "Belum Terdata", d1: 1, d2: 7, d3: 6, size: 14 },
  { name: "Honorer", d1: 5, d2: 4, d3: 1, size: 10 },
  { name: "PNS", d1: 1, d2: 3, d3: 5, size: 9 },
  { name: "Peg. Swasta", d1: 3, d2: 0, d3: 0, size: 3 },
  { name: "Bidan", d1: 1, d2: 0, d3: 1, size: 2 },
  { name: "Nelayan", d1: 0, d2: 1, d3: 1, size: 2 },
  { name: "Buruh Tani", d1: 0, d2: 0, d3: 1, size: 1 },
  { name: "Perawat", d1: 0, d2: 0, d3: 1, size: 1 },
];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-white/95 backdrop-blur-xl border border-white/50 p-4 rounded-2xl shadow-xl transform transition-all duration-200">
        <p className="font-bold text-gray-800 mb-2">{label || payload[0].name}</p>
        {payload.map((entry: any, index: number) => (
          <div key={index} className="flex items-center gap-3 mb-1 last:mb-0">
            <div 
              className="w-3 h-3 rounded-full shadow-sm" 
              style={{ background: entry.fill || entry.color }} 
            />
            <p className="text-gray-600 font-medium text-sm flex justify-between w-full min-w-[100px]">
              <span>{entry.name}:</span>
              <span className="font-bold text-gray-900 ml-4">{entry.value} Jiwa</span>
            </p>
          </div>
        ))}
        {payload.length > 1 && (
           <div className="flex items-center justify-between gap-3 pt-2 mt-2 border-t border-gray-100 text-sm font-bold text-gray-800">
             <span>Total:</span>
             <span>{payload.reduce((sum: number, entry: any) => sum + entry.value, 0)} Jiwa</span>
           </div>
        )}
      </div>
    );
  }
  return null;
};

export function DemographicsCharts() {
  return (
    <div className="mt-16 space-y-12 w-full">
      <svg width="0" height="0">
        <defs>
          <linearGradient id="colorMale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3b82f6" stopOpacity={1}/>
            <stop offset="95%" stopColor="#1d4ed8" stopOpacity={1}/>
          </linearGradient>
          <linearGradient id="colorFemale" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#f472b6" stopOpacity={1}/>
            <stop offset="95%" stopColor="#be185d" stopOpacity={1}/>
          </linearGradient>
          <linearGradient id="colorAge" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#34d399" stopOpacity={1}/>
            <stop offset="100%" stopColor="#059669" stopOpacity={1}/>
          </linearGradient>
          <linearGradient id="colorEdu" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" stopOpacity={1}/>
            <stop offset="100%" stopColor="#6d28d9" stopOpacity={1}/>
          </linearGradient>
          <linearGradient id="colorJob" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#fbbf24" stopOpacity={1}/>
            <stop offset="100%" stopColor="#d97706" stopOpacity={1}/>
          </linearGradient>
        </defs>
      </svg>

      {/* Row 1: Gender and Dusun */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MotionSection direction="up" delay={0.1}>
          <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-glass-xl border border-white flex flex-col h-full min-h-[450px] overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-blue-500/10 transition-colors duration-500" />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center shadow-inner">
                <PieChartIcon className="w-6 h-6 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Rasio Jenis Kelamin</h3>
                <p className="text-sm text-muted-foreground">Komposisi pria dan wanita</p>
              </div>
            </div>

            <div className="flex-1 w-full relative z-10">
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={85}
                    paddingAngle={8}
                    dataKey="value"
                    stroke="none"
                    label={({ cx, cy, midAngle, innerRadius, outerRadius, value, name }) => {
                      const RADIAN = Math.PI / 180;
                      // Move label slightly further out so it doesn't clip
                      const radius = 25 + innerRadius + (outerRadius - innerRadius);
                      const x = cx + radius * Math.cos(-RADIAN * midAngle);
                      const y = cy + radius * Math.sin(-RADIAN * midAngle);
                      const textAnchor = x > cx ? 'start' : 'end';
                      return (
                        <text x={x} y={y} fill="#4b5563" textAnchor={textAnchor} dominantBaseline="central" className="text-sm">
                          {name}: <tspan className="font-bold">{value} Jiwa</tspan>
                        </text>
                      );
                    }}
                  >
                    <Cell fill="url(#colorMale)" />
                    <Cell fill="url(#colorFemale)" />
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </MotionSection>

        <MotionSection direction="up" delay={0.2}>
          <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-glass-xl border border-white flex flex-col h-full min-h-[450px] overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-pink-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-pink-500/10 transition-colors duration-500" />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-pink-50 flex items-center justify-center shadow-inner">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Persebaran per Dusun</h3>
                <p className="text-sm text-muted-foreground">Distribusi di 3 wilayah administratif</p>
              </div>
            </div>

            <div className="flex-1 w-full relative z-10 mt-4">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={dusunData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }} dy={10} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6", opacity: 0.4 }} />
                  <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '20px' }} />
                  <Bar dataKey="LakiLaki" name="Laki-laki" fill="url(#colorMale)" radius={[8, 8, 0, 0]} maxBarSize={50} animationDuration={1500}>
                    <LabelList dataKey="LakiLaki" position="top" fill="#4b5563" fontSize={13} fontWeight="bold" />
                  </Bar>
                  <Bar dataKey="Perempuan" name="Perempuan" fill="url(#colorFemale)" radius={[8, 8, 0, 0]} maxBarSize={50} animationDuration={1500}>
                    <LabelList dataKey="Perempuan" position="top" fill="#4b5563" fontSize={13} fontWeight="bold" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </MotionSection>
      </div>

      {/* Row 2: Age and Education */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MotionSection direction="up" delay={0.3}>
          <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-glass-xl border border-white flex flex-col h-full min-h-[450px] overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 left-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2 group-hover:bg-emerald-500/10 transition-colors duration-500" />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center shadow-inner">
                <BarChart3 className="w-6 h-6 text-emerald-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Komposisi Usia</h3>
                <p className="text-sm text-muted-foreground">Kategori umur penduduk</p>
              </div>
            </div>

            <div className="flex-1 w-full relative z-10">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart
                  data={ageData}
                  layout="vertical"
                  margin={{ top: 10, right: 40, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={130} tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 500 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6", opacity: 0.4 }} />
                  <Bar dataKey="jumlah" name="Jumlah" fill="url(#colorAge)" radius={[0, 8, 8, 0]} barSize={24} animationDuration={1500}>
                    <LabelList dataKey="jumlah" position="right" fill="#374151" fontSize={13} fontWeight="bold" formatter={(val: number) => `${val} Jiwa`} />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </MotionSection>

        <MotionSection direction="up" delay={0.4}>
          <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-glass-xl border border-white flex flex-col h-full min-h-[450px] overflow-hidden group hover:shadow-2xl transition-all duration-500">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-violet-500/10 transition-colors duration-500" />
            
            <div className="flex items-center gap-4 mb-8 relative z-10">
              <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center shadow-inner">
                <GraduationCap className="w-6 h-6 text-violet-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-foreground">Tingkat Pendidikan</h3>
                <p className="text-sm text-muted-foreground">Latar belakang edukasi tertinggi</p>
              </div>
            </div>

            <div className="flex-1 w-full relative z-10 mt-4">
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={educationData} margin={{ top: 20, right: 10, left: -20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" opacity={0.5} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 13, fontWeight: 500 }} dy={10} />
                  <YAxis tickLine={false} axisLine={false} tick={{ fill: '#6b7280', fontSize: 13 }} />
                  <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6", opacity: 0.4 }} />
                  <Bar dataKey="jumlah" name="Jumlah" fill="url(#colorEdu)" radius={[8, 8, 0, 0]} maxBarSize={45} animationDuration={1500}>
                    <LabelList dataKey="jumlah" position="top" fill="#4b5563" fontSize={13} fontWeight="bold" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </MotionSection>
      </div>

      {/* Row 3: Pekerjaan */}
      <MotionSection direction="up" delay={0.5}>
        <div className="relative bg-white/80 backdrop-blur-xl p-8 rounded-[2rem] shadow-glass-xl border border-white flex flex-col min-h-[550px] overflow-hidden group hover:shadow-2xl transition-all duration-500">
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-amber-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 group-hover:bg-amber-500/10 transition-colors duration-500" />
          
          <div className="flex items-center gap-4 mb-8 relative z-10">
            <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center shadow-inner">
              <Briefcase className="w-6 h-6 text-amber-600" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-foreground">Mata Pencaharian</h3>
              <p className="text-sm text-muted-foreground">Distribusi profesi dan pekerjaan warga</p>
            </div>
          </div>

          <div className="flex-1 w-full relative z-10">
            <ResponsiveContainer width="100%" height={500}>
              <BarChart
                data={jobData}
                layout="vertical"
                margin={{ top: 10, right: 60, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" opacity={0.5} />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={140} tick={{ fill: '#4b5563', fontSize: 13, fontWeight: 500 }} />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "#f3f4f6", opacity: 0.4 }} />
                <Legend verticalAlign="top" align="right" iconType="circle" wrapperStyle={{ paddingBottom: '10px' }} />
                <Bar dataKey="d1" stackId="a" name="Dusun 1" fill="#3b82f6" barSize={18} animationDuration={1500} />
                <Bar dataKey="d2" stackId="a" name="Dusun 2" fill="#8b5cf6" barSize={18} animationDuration={1500} />
                <Bar dataKey="d3" stackId="a" name="Dusun 3" fill="#f59e0b" radius={[0, 6, 6, 0]} barSize={18} animationDuration={1500}>
                  <LabelList dataKey="size" position="right" fill="#374151" fontSize={13} fontWeight="bold" formatter={(val: number) => `${val} Jiwa`} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
