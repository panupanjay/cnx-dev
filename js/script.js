function timer() {
    const date = new Date();
    let monthNames = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    let year = date.getFullYear() + 543;
    let month = monthNames[date.getMonth()];
    let numOfDay = date.getDate();

    let hour = date.getHours().toString().padStart(2, "0");
    let minutes = date.getMinutes().toString().padStart(2, "0");
    let second = date.getSeconds().toString().padStart(2, "0");

    let formattedToday =  `${numOfDay} ${month} ${year} ` + `${hour}:${minutes}:${second} น.`;
    $('#date_now').html('* วันที่ '+formattedToday);
}

function toThaiDate(date) {
    let monthNames = [
        "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน",
        "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม.",
        "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
    ];

    let myArray = date.split("-");

    let year = parseInt(myArray[0]) + 543;
    let month = monthNames[parseInt(myArray[1]-1)];
    let numOfDay = myArray[2];

    return `${numOfDay} ${month} ${year} `;
}

function sel_station() {
    let station = $('#station').val();
    get_station(station);
}

function get_station(station) {
    $.ajax({
        url: 'module/api.php',
        type: 'GET',
        data: { stationID: station }, 
        dataType: 'json',
        success: function (data){
            console.log(data);
            let url = 'https://www.google.com/maps/?q='+data.lat+','+data.long;
            $('#station_name').html(data.nameTH+' '+data.areaTH);
            $('#s_date').html(toThaiDate(data.AQILast.date)+' '+data.AQILast.time+' น.');
            $('#s_aqi').html(data.AQILast.AQI.aqi+' AQI');
            $('#s_stationTH').html(data.nameTH+' '+data.areaTH);
            $('#s_map').html('<a type="button" href="'+url+'" target="_blank" class="btn btn-success"><i class="fa fa-map-marker"></i> GOOGLE MAP</a>');
            graph(data.AQILast.AQI.aqi);
        }
    });
}

function graph(val){
    Highcharts.chart('graph', {
        chart: {
            type: 'gauge',
            plotBackgroundColor: null,
            plotBackgroundImage: null,
            plotBorderWidth: 0,
            plotShadow: false,
            height: '80%'
        },
    
        title: {
            text: ''
        },
        pane: {
            startAngle: -90,
            endAngle: 89.9,
            background: null,
            center: ['50%', '75%'],
            size: '110%'
        },
        // the value axis
        yAxis: {
            min: 0,
            max: 300,
            tickPixelInterval: 72,
            tickPosition: 'inside',
            tickColor: Highcharts.defaultOptions.chart.backgroundColor || '#FFFFFF',
            tickLength: 20,
            tickWidth: 2,
            minorTickInterval: null,
            labels: {
                distance: 20,
                style: {
                    fontSize: '14px'
                }
            },
            plotBands: [{
                from: 0,
                to: 25,
                color: '#3bccff', // green
                thickness: 50
            }, {
                from: 25,
                to: 50,
                color: '#92d050', // yellow
                thickness: 50
            }, {
                from: 51,
                to: 100,
                color: '#ffff00', // red
                thickness: 50
            }, {
                from: 101,
                to: 200,
                color: '#ffa200', // red
                thickness: 50
            }, {
                from: 201,
                to: 300,
                color: '#ff3b3b', // red
                thickness: 50
            }]
        },
        series: [{
            name: 'Speed',
            data: [parseInt(val)],
            tooltip: {
                valueSuffix: ' AQI'
            },
            dataLabels: {
                format: '{y} AQI',
                borderWidth: 0,
                color: (
                    Highcharts.defaultOptions.title &&
                    Highcharts.defaultOptions.title.style &&
                    Highcharts.defaultOptions.title.style.color
                ) || '#333333',
                style: {
                    fontSize: '16px'
                }
            },
            dial: {
                radius: '80%',
                backgroundColor: 'gray',
                baseWidth: 12,
                baseLength: '0%',
                rearLength: '0%'
            },
            pivot: {
                backgroundColor: 'gray',
                radius: 6
            }
        }]
    
    });
}