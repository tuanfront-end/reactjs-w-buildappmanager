import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { StatisticMobileAppState } from 'containers/HomePage/reducers/reducerStatisticMobileApp';
import { StatisticMobileAppItem } from 'api/statistic';

export interface ChartsProps {
  statisticMobileApp: StatisticMobileAppState;
}

export default function Charts({ statisticMobileApp }: ChartsProps) {
  return (
    <div>
      <Doughnut
        data={{
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
            {
              label: 'My First dataset',
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
              data: [0, 10, 5, 2, 20, 30, 45],
            },
          ],
        }}
      />
    </div>
  );
}
