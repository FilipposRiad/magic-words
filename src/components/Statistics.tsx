import React from "react";
import "./Statistics.css";
import { AxisOptions, Chart } from "react-charts";

type MemoryGameStatistics = {
  mismatches: number;
  date: Date;
  language: string;
};

type MemoryGameStatisticsData = {
  numberOfGames: string;
  averageMismatches: number;
};

type Series = {
  label: string;
  data: MemoryGameStatisticsData[];
};

export default function Statistics(props) {
  const [memoryGameStatistics, setMemoryGameStatistics] = React.useState<
    MemoryGameStatistics[]
  >([]);
  const [chartData, setChartData] = React.useState<Series[]>([]);

  const data: Series[] = chartData;

  React.useEffect(() => {
    getMemoryGameStatistics();
  }, []);

  React.useEffect(() => {
    fillChartData();
  }, [memoryGameStatistics]);

  function getMemoryGameStatistics() {
    fetch("http://localhost:3000/memoryGameStatistics/", {
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => {
        setMemoryGameStatistics(json);
      });
  }

  function fillChartData() {
    if (memoryGameStatistics.length > 0) {
      const greekRawData = memoryGameStatistics.filter(
        (a) => a.language == "Greek"
      );

      const germanRawData = memoryGameStatistics.filter(
        (a) => a.language == "German"
      );

      var chartData: Series[] = [];

      var greekChartData: MemoryGameStatisticsData[] = [
        {
          numberOfGames: "0 Games",
          averageMismatches: 0,
        },
      ];
      var germanChartData: MemoryGameStatisticsData[] = [
        {
          numberOfGames: "0 Games",
          averageMismatches: 0,
        },
      ];

      var sum = 0;

      for (let i = 0; i < greekRawData.length; i++) {
        sum += greekRawData[i].mismatches;

        if ((i + 1) % 10 == 0) {
          greekChartData.push({
            numberOfGames: i + 1 + " Games",
            averageMismatches: Math.round(sum / 10),
          });

          sum = 0;
        }
      }

      sum = 0;
      for (let i = 0; i < germanRawData.length; i++) {
        sum += germanRawData[i].mismatches;

        if ((i + 1) % 10 == 0) {
          germanChartData.push({
            numberOfGames: i + 1 + " Games",
            averageMismatches: Math.round(sum / 10),
          });

          sum = 0;
        }
      }

      chartData.push({
        label: "Average German Game Mismatches",
        data: germanChartData,
      });

      chartData.push({
        label: "Average Greek Game Mismatches",
        data: greekChartData,
      });

      setChartData(chartData);
    }
  }

  const primaryAxis = React.useMemo(
    (): AxisOptions<MemoryGameStatisticsData> => ({
      elementType: "line",
      getValue: (datum) => datum.numberOfGames,
    }),
    []
  );

  const secondaryAxes = React.useMemo(
    (): AxisOptions<MemoryGameStatisticsData>[] => [
      {
        elementType: "line",
        getValue: (datum) => datum.averageMismatches,
      },
    ],
    []
  );

  return (
    <div className="statistics-container">
      <div className="menu-btn">
        <img
          src="./src\assets\interface\button_menu_2.png"
          onClick={() => props.setScreen("mainMenu")}
        />
      </div>
      <div className="chart-container">
        {data.length > 0 && (
          <Chart
            options={{
              data,
              primaryAxis,
              secondaryAxes,
            }}
          />
        )}
      </div>
    </div>
  );
}
