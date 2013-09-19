$(function () {
    var gray = '#999999';
    var darkGray = '#333333';
    var paleGray = '#f6f6f6';
    var fontStack = '"Open Sans", Helvetica, Arial, sans-serif';
    var categories = ['1993', '1994', '1995', '1996', '1997', '1998', '1999', '2000', '2001', '2002', '2003', '2004', '2005', '2006', '2007', '2008', '2009', '2010', '2011', '2012'];
    for (var i = categories.length - 1; i >= 0; i--) {
      categories[i]
    };

    $('#chart').highcharts({
        chart: {
            type: 'column',
            backgroundColor: paleGray
        },
        exporting: {
            enabled: false
        },
        credits: {
            enabled: false
        },
        title: {
            text: null
        },
        colors: [
            // some TGM colors to be found here
            // 'rgba(26, 173, 70, 0.85)',
            'rgba(253, 137, 57, 0.85)',
            // 'rgba(243, 191, 7, 0.85)',
            'rgba(0, 100, 205, 0.85)',
            'rgba(128, 12, 138, 0.85)'
        ],
        xAxis: {
            categories: categories,
            startOnTick: true,
            endOnTick: true,
            showLastLabel: true,
            labels:{
                staggerLines: 1,
                style: {
                    color: darkGray,
                    fontWeight: 'bold',
                    fontFamily: fontStack,
                    fontSize: 10
                }
            },
            tickLength: 3,
            tickmarkPlacement: 'on',
            tickPositions: [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 19]
        },
        yAxis: {
            min: 0,
            title: {
                text: 'No. of ISDS Cases',
                style: {
                  color: gray,
                  fontWeight: 'bold',
                  fontFamily: fontStack,
                  textTransform: 'uppercase'
                }
            },
            stackLabels: {
                enabled: false
            },
            labels: {
                style: {
                  color: darkGray,
                  fontWeight: 'bold',
                  fontFamily: fontStack,
                  fontSize: 10
                }
            },
            gridLineColor: gray,
            gridLineDashStyle: 'dot'
        },
        legend: {
            align: 'left',
            x: 60,
            shadow: {
                offsetX: 1,
                offsetY: 1,
                opacity: 0.1,
                width: 3
            },
            verticalAlign: 'top',
            layout: 'vertical',
            backgroundColor: '#fcfcfc',
            y: 10,
            floating: true,
            borderColor: '#CCC',
            borderRadius: 2,
            borderWidth: 1,
            itemStyle: {
              color: darkGray,
              fontFamily: fontStack
            },
            itemMarginBottom: 2,
            title: {
                text: 'Case status',
                style: {
                  color: gray,
                  fontWeight: 'bold',
                  fontFamily: fontStack,
                  textTransform: 'uppercase'
                }
            }
        },
        tooltip: {
            borderColor: gray,
            backgroundColor: paleGray,
            style: {
                 color: darkGray,
                 fontWeight: 'bold',
                 fontFamily: fontStack
            },
            formatter: function () {
                return '<b>' + this.x + ' total: ' + this.point.stackTotal + '</b><br/>' + this.series.name + ': ' + this.y;
            }
        },
        plotOptions: {
            column: {
                stacking: 'normal',
                pointPadding: 0.1,
                groupPadding: 0,
                borderWidth: 0,
                dataLabels: {
                    enabled: false
                }
            }
        },
        series: [
          {
            "data": [1, 2, 2, 5, 7, 7, 11, 12, 13, 17, 22, 26, 19, 8, 8, 2, 0, 2, 2, 1],
            "name": "Completed"
          },
          {
            "data": [0, 0, 0, 0, 0, 1, 0, 0, 1, 8, 19, 15, 17, 18, 29, 32, 36, 21, 38, 38],
            "name": "Pending"
          },
          {
            "data": [0, 0, 0, 1, 0, 0, 0, 1, 2, 3, 2, 4, 8, 4, 3, 1, 0, 2, 9, 18],
            "name": "Unknown"
          }
        ]
    });
});