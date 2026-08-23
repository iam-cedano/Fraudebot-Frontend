import { Bar } from "react-chartjs-2";
import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  Tooltip,
} from "chart.js";
import MonthlyReportCountsEntity from "@/core/domain/report/entities/monthly-report-counts.entity";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip);

const monthFormatter = new Intl.DateTimeFormat("es-MX", { month: "short" });

function monthLabels(year: number) {
  return Array.from({ length: 12 }, (_, index) =>
    monthFormatter.format(new Date(year, index, 1)).replace(".", ""),
  );
}

interface MonthlyReportsChartProps {
  monthlyCounts: MonthlyReportCountsEntity;
}

function MonthlyReportsChart({ monthlyCounts }: MonthlyReportsChartProps) {
  const labels = monthLabels(monthlyCounts.year);

  return (
    <>
      <div className="h-56 w-full" aria-hidden="true">
        <Bar
        data={{
          labels,
          datasets: [
            {
              label: "Reportes",
              data: monthlyCounts.counts,
              backgroundColor: "#111827",
              borderRadius: 2,
              maxBarThickness: 28,
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (context) => `${context.parsed.y ?? 0} reportes`,
              },
            },
          },
          scales: {
            x: {
              grid: { display: false },
              ticks: { color: "#4b5563", font: { family: "Nunito" } },
            },
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0,
                color: "#4b5563",
                font: { family: "Nunito" },
              },
            },
          },
        }}
        />
      </div>
      <table className="sr-only">
        <caption>Reportes mensuales de {monthlyCounts.year}</caption>
        <thead>
          <tr>
            <th scope="col">Mes</th>
            <th scope="col">Cantidad de reportes</th>
          </tr>
        </thead>
        <tbody>
          {labels.map((label, index) => (
            <tr key={label}>
              <th scope="row">{label}</th>
              <td>{monthlyCounts.counts[index] ?? 0}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default MonthlyReportsChart;
