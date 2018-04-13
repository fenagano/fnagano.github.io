(function main() {

var Plot = {
    id: 'plot',
    imgId: 'hover-image',
    domain: 'https://plot.ly'
};

Plot.iframe = document.getElementById(Plot.id);
Plot.graphContentWindow = Plot.iframe.contentWindow;

Plot.hoverImg = document.getElementById(Plot.imgId);

Plot.init = function init() {
    var pinger = setInterval(function() {
        Plot.post({task: 'ping'});
    }, 500);

    function messageListener(e) {
        var message = e.data;

        if(message.pong) {
            console.log('Initial pong, frame is ready to receive');
            clearInterval(pinger);

            Plot.post({
                'task': 'listen',
                'events': ['hover']
            });
        }
        else if(message.type === 'hover') {
            Plot.onHover(message);
        }
    }

    window.removeEventListener('message', messageListener);
    window.addEventListener('message', messageListener);
};

Plot.post = function post(o) {
    Plot.graphContentWindow.postMessage(o, Plot.domain);
};

 var artistToUrl = {
     'blusa-bla':'https://img.lojasrenner.com.br/item/544492007/zoom/1.jpg',
     'blusa2':'https://cea.vteximg.com.br/arquivos/ids/2309390-468-560/Blusa-Open-Shoulder-com-Guipir-Vinho-8737561-Vinho_1.jpg?v=636528511713500000',
     'blusa3':'https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/image/1098x1370/e9c3970ab036de70892d86c6d221abfe/b/l/blusa-babados-12130176_foto1_frontal.jpg',
     'blusa4':'https://cea.vteximg.com.br/arquivos/ids/2627553-468-560/Blusa-Feminina-Ciganinha-Manga-Curta-com-Amarracao-Vinho-8921333-Vinho_1.jpg?v=636570694173600000',
     'blusa5':'https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/image/1098x1370/e9c3970ab036de70892d86c6d221abfe/b/l/blusa-decote-cut-out-ferragem-12256927_foto1_frontal.jpg',
     'blusa6':'https://img.lojasrenner.com.br/item/544313814/zoom/1.jpg',
     'blusa7':'https://cea.vteximg.com.br/arquivos/ids/2770830-468-560/Blusa-Feminina-com-No-Canelada-Manga-Longa-Decote-Redondo-Vinho-9094642-Vinho_1.jpg?v=636585403900700000',
     'blusa8':'https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/image/1098x1370/e9c3970ab036de70892d86c6d221abfe/b/l/blusa-manga-sino-12124974_foto1_frontal.jpg',
     'blusa9':'https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/image/1098x1370/e9c3970ab036de70892d86c6d221abfe/b/l/blusa-lisa-ilhos-12314641_foto1_frontal.jpg',
     'blusa10':'https://cea.vteximg.com.br/arquivos/ids/2771063-468-560/Blusa-Feminina--No-More-Fake-Friends--Botone-Assimetrica-Manga-Curta-Decote-Redondo-Vinho-9035459-Vinho_1.jpg?v=636585413773100000',
     'blusa11':'https://img.lojasrenner.com.br/item/544706546/zoom/1.jpg',
     'blusa12':'https://img.lojasrenner.com.br/item/544450317/zoom/1.jpg',
 };    


var blankImg = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=';

Plot.onHover = function(message) {
    var artist = message.points[0].x
        .toLowerCase()
        .replace(/ /g, '-');

    var imgSrc = blankImg;

    if(artistToUrl[artist] !== undefined) imgSrc = artistToUrl[artist];

    Plot.hoverImg.src = imgSrc;
};

Plot.init();

})();
