const composedUri = "http://192.168.160.58/NBA/api/Statistics/NumPlayersBySeason";

$('document').ready(function () {
    const ctx = document.getElementById('myChart');

    ajaxHelper(composedUri, 'GET').done(function (stats) {
        // Interact with the data returned

        var myLabels = [];
        var myData = [];
        var barColors = [];
        $.each(stats, function (index, item) {
            myLabels.push(item.Season);
            myData.push(item.Players);
            barColors.push(index % 2 === 0 ? 'blue' : 'red');
        })


        // Instantiate and draw our chart, passing in some options.
        new Chart(ctx, {
            type: 'bar',
            title: 'olá',
            data: {
                labels: myLabels,
                datasets: [
                    {
                        label: 'N.º de Atletas por Playoff',
                        data: myData,
                        backgroundColor: barColors,
                        barThickness: 5
                    },
                    {
                        label: 'N.º de Atletas por Regular Season',
                        backgroundColor: barColors,
                        barThickness: 5
                    }
                ]
            },
            options: {
                responsive: false,
                plugins: {
                    legend: {
                        display: true,
                        labels: { align: 'start', font: { family: 'Open Sans' } },
                        title: {
                            display: true, text: ['Estatísticas Gerais', 'N.º de Atletas por temporada'], padding: { top: 10, bottom: 10 }, font: { size: 12, family: 'Open Sans' }
                        },
                    }
                },
                indexAxis: 'x',
                scales: {
                    y: {
                        ticks: {
                            font: { family: 'Open Sans', color: '#800' } ,
                        }
                    },
                    x: {
                        beginAtZero: true, 
                        ticks: {
                            font: { family: 'Open Sans', color: '#800', size: 8, width: 200 } ,
                        }
                    }
                }
            }
        });
    });
});

//--- Internal functions
function ajaxHelper(uri, method, data) {
    return $.ajax({
        type: method,
        url: uri,
        dataType: 'json',
        contentType: 'application/json',
        data: data ? JSON.stringify(data) : null,
        error: function (jqXHR, textStatus, errorThrown) {
            console.log("AJAX Call[" + uri + "] Fail...");
        }
    });
}