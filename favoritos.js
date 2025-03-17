var vm = function () {
    console.log('ViewModel initiated...');
    var self = this;

    self.arenaFavourites = ko.observableArray([]);
    self.equipasFavourites = ko.observableArray([]);
    self.jogadoresFavourites = ko.observableArray([]);

    // Function to retrieve and display favorites
    self.getFavorites = function () {
        console.log('Getting favorites...');
        var arenasRes = localStorage.getItem('arena_favourites');

        var arenasFavs = arenasRes ? JSON.parse(arenasRes) : [];
        self.arenaFavourites(arenasFavs);

        var equipasRes = localStorage.getItem('equipas_favourites');

        var equipasFavs = equipasRes ? JSON.parse(equipasRes) : [];
        self.equipasFavourites(equipasFavs);

        var jogadoresRes = localStorage.getItem('jogadores_favourites');

        var jogadoresFavs = jogadoresRes ? JSON.parse(jogadoresRes) : [];
        self.jogadoresFavourites(jogadoresFavs);
    };

    self.removerEquipaFavoritos = function (id) {
        var existingFavorites = self.equipasFavourites();
        var indexToRemove = -1;

        existingFavorites.forEach(function (team, index) {
            if (team.Id === id) {
                indexToRemove = index;
            }
        });


        if (indexToRemove !== -1) {
            existingFavorites.splice(indexToRemove, 1);
            self.equipasFavourites(existingFavorites);
            // Update the local storage here to sync with the changes
            localStorage.setItem('equipas_favourites', JSON.stringify(existingFavorites));
        }
    };


    self.removerArenasFavoritos = function (id) {
        var existingFavorites = self.arenaFavourites();
        var indexToRemove = -1;

        existingFavorites.forEach(function (arena, index) {
            if (arena.Id === id) {
                indexToRemove = index;
            }
        });


        if (indexToRemove !== -1) {
            existingFavorites.splice(indexToRemove, 1);
            self.arenaFavourites(existingFavorites);
            // Update the local storage here to sync with the changes
            localStorage.setItem('arena_favourites', JSON.stringify(existingFavorites));
        }
    };


    self.removerJogadoresFavoritos = function (id) {
        var existingFavorites = self.jogadoresFavourites();
        var indexToRemove = -1;

        existingFavorites.forEach(function (jogador, index) {
            if (jogador.Id === id) {
                indexToRemove = index;
            }
        });


        if (indexToRemove !== -1) {
            existingFavorites.splice(indexToRemove, 1);
            self.jogadoresFavourites(existingFavorites);
            // Update the local storage here to sync with the changes
            localStorage.setItem('jogadores_favourites', JSON.stringify(existingFavorites));
        }
    };

    // Call to retrieve favorites
    self.getFavorites();
};

$(document).ready(function () {
    console.log("ready!");
    ko.applyBindings(new vm());
});
