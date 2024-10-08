import ReactApexChart from 'react-apexcharts';
const GaugeChart = ({ heading, series }) => {
  const options = {
    chart: {
      type: 'radialBar',
      offsetY: -20,
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        track: {
          background: '#E7E7E7',
          strokeWidth: '97%',
          margin: 5,
          dropShadow: {
            enabled: true,
            top: 2,
            left: 0,
            blur: 2,
            opacity: 0.5,
          },
        },
        dataLabels: {
          name: {
            show: false,
          },
          value: {
            offsetY: -2,
            fontSize: '22px',
          },
        },
      },
    },
    fill: {
      colors: ['#CCD000'],
    },
    labels: ['Average Results'],
  };
  return (
    <div className=' '>
      <h2>
        {heading}
      </h2>
      <ReactApexChart options={options} height={500} series={series} type='radialBar' />
    </div>
  );
};
export default GaugeChart;