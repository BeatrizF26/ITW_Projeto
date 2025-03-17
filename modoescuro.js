$(document).ready(function () {
    var modoEscuro = localStorage.getItem('modoEscuro') === 'true';

    if (modoEscuro) {
        ativarModoEscuro();
    }

    $('#modo').click(function () {
        var modoEscuroAtual = $('body').toggleClass('modo-escuro').hasClass('modo-escuro');
        localStorage.setItem('modoEscuro', modoEscuroAtual);
        atualizarModoEscuro(modoEscuroAtual);
    });
});

function ativarModoEscuro() {
    $('body').addClass('modo-escuro');
    $('#simbolo').removeClass('fa fa-toggle-on').addClass('fa fa-toggle-off');
    $('.btn-light, .btn-dark').removeClass('btn-light').addClass('btn-dark').addClass('text-secondary');
    $('.table').addClass('table-dark');
    $('.accordion-body').addClass('bg-accordion');
    $('.card-body').addClass('card-escuro');
}

function desativarModoEscuro() {
    $('body').removeClass('modo-escuro');
    $('#simbolo').removeClass('fa fa-toggle-off').addClass('fa fa-toggle-on');
    $('.btn-dark').removeClass('btn-dark').addClass('btn-light').removeClass('text-secondary');
    $('.table').removeClass('table-dark');
    $('.accordion-body').removeClass('bg-accordion');
    $('.card-body').removeClass('card-escuro');
}

function atualizarModoEscuro(modoEscuro) {
    if (modoEscuro) {
        ativarModoEscuro();
    } else {
        desativarModoEscuro();
    }
}