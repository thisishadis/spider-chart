'use client'
import Highcharts from 'highcharts'
import HighchartsReact from 'highcharts-react-official'
import HighchartsMore from 'highcharts/highcharts-more'
import Accessibility from 'highcharts/modules/accessibility'
import ExportData from 'highcharts/modules/export-data'
import Exporting from 'highcharts/modules/exporting'
import React, {useEffect, useState} from 'react'

HighchartsMore(Highcharts)
Exporting(Highcharts)
ExportData(Highcharts)
Accessibility(Highcharts)

type ChartData = {
  [key: string]: {
    [key: string]: number
  }
}

export default function Home() {
  const [chartData, setChartData] = useState<ChartData>({
    'Allocated Budget': {
      'Sales': 43000,
      'Marketing': 19000,
      'Development': 35000,
      'Customer Support': 17000,
      'Information Technology': 10000,
    },
    'Actual Spending': {
      'Sales': 26000,
      'Marketing': 31000,
      'Development': 42000,
      'Customer Support': 39000,
      'Information Technology': 50000,
    },
    'Actual dSpending': {
      'Sales': 26000,
      'Marketing': 31000,
      'Development': 4200,
      'Customer Support': 39000,
      'Information Technology': 50000,
    },
  })

  const categories = Object.keys(chartData['Allocated Budget'])

  const seriesData = Object.keys(chartData).map((type) => ({
    name: type,
    data: categories.map((category) => chartData[type][category]),
    pointPlacement: 'on',
  }))

  const options = {
    chart: {
      polar: true,
      type: 'line',
    },
    title: {
      text: 'Budget vs spending',
      x: -80,
    },
    pane: {
      size: '80%',
    },
    xAxis: {
      categories: categories,
      tickmarkPlacement: 'on',
      lineWidth: 0,
    },
    yAxis: {
      gridLineInterpolation: 'polygon',
      lineWidth: 0,
      min: 0,
    },
    tooltip: {
      shared: true,
      pointFormat: '<span style="color:{series.color}">{series.name}: <b>${point.y:,.0f}</b><br/>',
    },
    legend: {
      align: 'right',
      verticalAlign: 'middle',
      layout: 'vertical',
    },
    series: seriesData,
    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              align: 'center',
              verticalAlign: 'bottom',
              layout: 'horizontal',
            },
            pane: {
              size: '70%',
            },
          },
        },
      ],
    },
  }
  const [textareaValue, setTextareaValue] = useState<string>(JSON.stringify(chartData, null, 2))

  useEffect(() => {
    try {
      const parsedData = JSON.parse(textareaValue)
      setChartData(parsedData)
    } catch (error) {
      console.error('Invalid JSON format', error)
      // Handle invalid JSON format (optional)
    }
  }, [textareaValue])

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextareaValue(event.target.value)
  }

  return (
      <div className="App flex h-full flex-col">
        <HighchartsReact highcharts={Highcharts} options={options} />
        <textarea
            className="text-area border-1 h-[50vh] border font-mono sm:text-sm"
            placeholder="Type here..."
            value={textareaValue}
            onChange={handleTextareaChange}
        ></textarea>
      </div>
  )
}
