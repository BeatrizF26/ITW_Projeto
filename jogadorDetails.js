
// ViewModel KnockOut
var vm = function () {
    console.log('ViewModel initiated...');
    //---Variáveis locais
    var self = this;
    self.baseUri = ko.observable('http://192.168.160.58/NBA/API/Players/');
    self.displayName = 'Detalhes do Jogador';
    self.error = ko.observable('');
    self.passingMessage = ko.observable('');
    //--- Data Record
    self.Id = ko.observable('');
    self.Name = ko.observable('');
    self.Birthdate = ko.observable('');
    self.CountryId = ko.observable('');
    self.CountryName = ko.observable('');
    self.DraftYear = ko.observable('');
    self.PositionId = ko.observable('');
    self.PositionName = ko.observable('');
    self.Height = ko.observable('');
    self.Weight = ko.observable('');
    self.School = ko.observable('');
    self.Photo = ko.observable('');
    self.Biography = ko.observable('');
    self.Seasons = ko.observableArray([]);
    self.Teams = ko.observableArray([]);

    //--- Page Events
    self.activate = function (id) {
        console.log('CALL: getPlayers...');
        var composedUri = self.baseUri() + id;
        ajaxHelper(composedUri, 'GET').done(function (data) {
            console.log(data);
            hideLoading();
            self.Id(data.Id);
            self.Name(data.Name);
            if (data.Birthdate !== null) {
                const formattedDate = data.Birthdate.split('T')[0];
                self.Birthdate(formattedDate);
            } else {
                self.Birthdate(data.Birthdate);
            }
            self.CountryId(data.CountryId);
            self.CountryName(data.CountryName);
            self.DraftYear(data.DraftYear);
            self.PositionId(data.PositionId);
            self.PositionName(data.PositionName);
            self.Height(data.Height);
            self.Weight(data.Weight);
            self.School(data.School);
            self.Photo(data.Photo);
            self.Biography(data.Biography);
            self.Seasons(data.Seasons);
            self.Teams(data.Teams);
            self.fetchPlayerData(data.Id)
        });
    };
    self.formatDate = function (dateString) {
        if (!dateString) return '';

        const date = new Date(dateString);
        // Extracting only the date part in YYYY-MM-DD format
        const formattedDate = date.toISOString().split('T')[0];
        return formattedDate;
    };
    self.fetchPlayerData = function (playerId) {
        console.log("id: ", playerId)

        const composedUri = `http://192.168.160.58/NBA/api/Statistics/PlayerRankBySeason?playerId=${playerId}`;

        $(document).ready(function () {
            const ctx = document.getElementById('myChart');

            // Internal function to make AJAX call
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


            ajaxHelper(composedUri, 'GET').done(function (stats) {
                var myLabels = [];
                var myData = [];
                var barColors = [];
                $.each(stats, function (index, item) {
                    myLabels.push(item.Season);
                    myData.push(item.Rank);
                    barColors.push(index % 2 === 0 ? 'blue' : 'red');
                })

                new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: myLabels,
                        datasets: [
                            {
                                label: 'Player Rank nos Playoffs',
                                data: myData,
                                backgroundColor: barColors,
                                borderWidth: 1
                            },
                            {
                                label: 'Player Rank na Regular Season',
                                backgroundColor: barColors,
                                borderWidth: 1
                            }
                        ]
                    },
                    options: {
                        responsive: true,
                        plugins: {
                            legend: {
                                display: true,
                                labels: {
                                    font: {
                                        family: 'Open Sans'
                                    }
                                }
                            }
                        },
                        scales: {
                            y: {
                                ticks: {
                                    font: {
                                        family: 'Open Sans'
                                    }
                                }
                            },
                            x: {
                                ticks: {
                                    font: {
                                        family: 'Open Sans'
                                    }
                                }
                            }
                        }
                    }
                });
            });
        });
    }

    //--- Internal functions
    function ajaxHelper(uri, method, data) {
        self.error(''); // Clear error message
        return $.ajax({
            type: method,
            url: uri,
            dataType: 'json',
            contentType: 'application/json',
            data: data ? JSON.stringify(data) : null,
            error: function (jqXHR, textStatus, errorThrown) {
                console.log("AJAX Call[" + uri + "] Fail...");
                hideLoading();
                self.error(errorThrown);
            }
        });
    }

    function showLoading() {
        $('#myModal').modal('show', {
            backdrop: 'static',
            keyboard: false
        });
    }
    function hideLoading() {
        $('#myModal').on('shown.bs.modal', function (e) {
            $("#myModal").modal('hide');
        })
    }

    function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;

        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');

            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };



    //--- start ....
    showLoading();
    var pg = getUrlParameter('id');
    console.log(pg);
    if (pg == undefined)
        self.activate(1);
    else {
        self.activate(pg);
    }
    console.log("VM initialized!");
};

$(document).ready(function () {
    console.log("document.ready!");
    ko.applyBindings(new vm());
});

$(document).ajaxComplete(function (event, xhr, options) {
    $("#myModal").modal('hide');
})