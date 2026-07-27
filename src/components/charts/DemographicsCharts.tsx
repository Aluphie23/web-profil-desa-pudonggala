"use client";

import React from "react";
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
  Treemap,
  LabelList,
} from "recharts";
import { MotionSection } from "@/components/animations/MotionSection";

const genderData = [
  { name: "Laki-laki", value: 150 },
  { name: "Perempuan", value: 129 },
];
const GENDER_COLORS = ["#3b82f6", "#ec4899"];

const dusunData = [
  { name: "Dusun 1", LakiLaki: 39, Perempuan: 37 },
  { name: "Dusun 2", LakiLaki: 52, Perempuan: 46 },
  { name: "Dusun 3", LakiLaki: 59, Perempuan: 46 },
];

const ageData = [
  { name: "Balita (0-5)", jumlah: 9 },
  { name: "Anak-anak (6-14)", jumlah: 59 },
  { name: "Remaja (15-24)", jumlah: 46 },
  { name: "Dewasa (25-54)", jumlah: 124 },
  { name: "Lansia (55+)", jumlah: 30 },
];

const educationData = [
  { name: "SD", jumlah: 54 },
  { name: "SMP", jumlah: 57 },
  { name: "SMA", jumlah: 83 },
  { name: "Sarjana (S1)", jumlah: 31 },
];

const jobData = [
  { name: "Pelajar", size: 87 },
  { name: "IRT", size: 56 },
  { name: "Petani", size: 26 },
  { name: "Buruh Pabrik", size: 23 },
  { name: "Wiraswasta", size: 21 },
  { name: "Tidak Bekerja", size: 14 },
  { name: "Belum Terdata", size: 14 },
  { name: "Honorer", size: 10 },
  { name: "PNS", size: 9 },
  { name: "Peg. Swasta", size: 3 },
  { name: "Bidan", size: 2 },
  { name: "Nelayan", size: 2 },
  { name: "Buruh Tani", size: 1 },
  { name: "Perawat", size: 1 },
];

const CustomizedContent = (props: any) => {
  const { root, depth, x, y, width, height, index, payload, colors, name } = props;

  return (
    <g>
      <rect
        x={x}
        y={y}
        width={width}
        height={height}
        style={{
          fill: depth < 2 ? colors[Math.floor((index / root.children.length) * 6)] : "#ffffff00",
          stroke: "#fff",
          strokeWidth: 2 / (depth + 1e-10),
          strokeOpacity: 1 / (depth + 1e-10),
        }}
      />
      {depth === 1 ? (
        <text x={x + width / 2} y={y + height / 2 + 7} textAnchor="middle" fill="#fff" fontSize={14}>
          {name}
        </text>
      ) : null}
      {depth === 1 ? (
        <text x={x + width / 2} y={y + height / 2 + 25} textAnchor="middle" fill="#fff" fontSize={12} opacity={0.8}>
          {payload.size}
        </text>
      ) : null}
    </g>
  );
};

export function DemographicsCharts() {
  return (
    <div className="mt-16 space-y-12 w-full">
      {/* Row 1: Gender and Dusun */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <MotionSection direction="up" delay={0.1}>
          <div className="bg-white p-6 rounded-3xl shadow-glass border border-gray-100 flex flex-col h-full min-h-[400px]">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">Rasio Jenis Kelamin</h3>
            <div className="flex-1 w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={genderData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={110}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ value }) => `${value}`}
                  >
                    {genderData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={GENDER_COLORS[index % GENDER_COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </MotionSection>

        <MotionSection direction="up" delay={0.2}>
          <div className="bg-white p-6 rounded-3xl shadow-glass border border-gray-100 flex flex-col h-full min-h-[400px]">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">Persebaran Penduduk (Dusun)</h3>
            <div className="flex-1 w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={dusunData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  />
                  <Legend verticalAlign="bottom" height={36} />
                  <Bar dataKey="LakiLaki" name="Laki-laki" fill="#3b82f6" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="LakiLaki" position="top" fill="#6b7280" fontSize={12} fontWeight="bold" />
                  </Bar>
                  <Bar dataKey="Perempuan" fill="#ec4899" radius={[4, 4, 0, 0]}>
                    <LabelList dataKey="Perempuan" position="top" fill="#6b7280" fontSize={12} fontWeight="bold" />
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
          <div className="bg-white p-6 rounded-3xl shadow-glass border border-gray-100 flex flex-col h-full min-h-[400px]">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">Komposisi Usia</h3>
            <div className="flex-1 w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={ageData}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={120} />
                  <Tooltip
                    cursor={{ fill: "#f3f4f6" }}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  />
                  <Bar dataKey="jumlah" fill="#10b981" radius={[0, 8, 8, 0]} barSize={30}>
                    <LabelList dataKey="jumlah" position="right" fill="#6b7280" fontSize={12} fontWeight="bold" />
                    {ageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.jumlah > 100 ? "#059669" : "#34d399"} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </MotionSection>

        <MotionSection direction="up" delay={0.4}>
          <div className="bg-white p-6 rounded-3xl shadow-glass border border-gray-100 flex flex-col h-full min-h-[400px]">
            <h3 className="text-xl font-bold text-foreground mb-6 text-center">Tingkat Pendidikan Utama</h3>
            <div className="flex-1 w-full h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={educationData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} opacity={0.3} />
                  <XAxis dataKey="name" tickLine={false} axisLine={false} />
                  <YAxis tickLine={false} axisLine={false} />
                  <Tooltip
                    cursor={{ fill: "transparent" }}
                    contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  />
                  <Bar dataKey="jumlah" fill="#8b5cf6" radius={[8, 8, 0, 0]} barSize={50}>
                    <LabelList dataKey="jumlah" position="top" fill="#6b7280" fontSize={12} fontWeight="bold" />
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </MotionSection>
      </div>

      {/* Row 3: Pekerjaan */}
      <MotionSection direction="up" delay={0.5}>
        <div className="bg-white p-6 rounded-3xl shadow-glass border border-gray-100 flex flex-col min-h-[500px]">
          <h3 className="text-xl font-bold text-foreground mb-6 text-center">Mata Pencaharian Utama</h3>
          <div className="flex-1 w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={jobData}
                layout="vertical"
                margin={{ top: 10, right: 40, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" horizontal={false} opacity={0.3} />
                <XAxis type="number" hide />
                <YAxis type="category" dataKey="name" tickLine={false} axisLine={false} width={120} />
                <Tooltip
                  cursor={{ fill: "#f3f4f6" }}
                  contentStyle={{ borderRadius: "12px", border: "none", boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)" }}
                  formatter={(value: any) => [`${value} Jiwa`, "Jumlah"]}
                />
                <Bar dataKey="size" fill="#f59e0b" radius={[0, 8, 8, 0]} barSize={20}>
                  <LabelList dataKey="size" position="right" fill="#6b7280" fontSize={12} fontWeight="bold" />
                  {jobData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.size > 20 ? "#d97706" : "#fbbf24"} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </MotionSection>
    </div>
  );
}
