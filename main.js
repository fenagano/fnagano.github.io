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
        else if(message.type === 'touch') {
            Plot.onTouch(message);
        }
    }

    window.removeEventListener('message', messageListener);
    window.addEventListener('message', messageListener);
};

Plot.post = function post(o) {
    Plot.graphContentWindow.postMessage(o, Plot.domain);
};

var artistToUrl = {
    'blusa1':'//img.lojasrenner.com.br/item/544343829/zoom/1.jpg',
    'blusa2':'https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/image/1098x1370/e9c3970ab036de70892d86c6d221abfe/b/l/blusa-rendada-11839031_foto1_frontal.jpg',
    'blusa3':'https://img.lojasrenner.com.br/item/544825318/zoom/1.jpg',
    'blusa4':'https://img.lojasrenner.com.br/item/545665011/zoom/1.jpg',
    'blusa5':'https://cea.vteximg.com.br/arquivos/ids/2588540-468-560/Camisa-Jeans-Feminina-Manga-Longa-Azul-Escuro-9072661-Azul_Escuro_1.jpg?v=636566277413470000',
    'blusa6':'https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/image/1098x1370/e9c3970ab036de70892d86c6d221abfe/b/l/blusa-jeans-manga-7-8-amarracao-12105910_foto1_frontal.jpg',
    'blusa7':'https://img.lojasrenner.com.br/item/545243635/zoom/1.jpg',
    'blusa8':'https://cea.vteximg.com.br/arquivos/ids/2309394-468-560/Blusa-Open-Shoulder-com-Guipir-Azul-Marinho-8737561-Azul_Marinho_1.jpg?v=636528511887370000',
    'blusa9':'https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/image/1098x1370/e9c3970ab036de70892d86c6d221abfe/a/1/a1_11943220_foto1_frontal.jpg',
    'blusa10':'https://cea.vteximg.com.br/arquivos/ids/2019546-468-560/Regata-com-Amarracao-Azul-Marinho-8697448-Azul_Marinho_1.jpg?v=636479863061500000',
    'blusa11':'https://cea.vteximg.com.br/arquivos/ids/2111284-468-560/Blusa-com-Tiras-Azul-8741011-Azul_1.jpg?v=636495624286170000',
    'blusa12':'https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/image/1098x1370/e9c3970ab036de70892d86c6d221abfe/b/l/blusa-leve-floral-12088838_foto1_frontal.jpg',
    'blusa13':'https://img.lojasrenner.com.br/item/544667671/zoom/1.jpg',
    'blusa14':'https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/image/1098x1370/e9c3970ab036de70892d86c6d221abfe/b/l/blusa-manga-babados-12283924_foto1_frontal.jpg',
    'blusa15':'https://img.lojasrenner.com.br/item/544934590/zoom/1.jpg',
    'blusa16':'https://cea.vteximg.com.br/arquivos/ids/2215744-468-560/Blusa-Ampla-com-Recorte-Azul-Marinho-8954019-Azul_Marinho_1.jpg?v=636512718904430000',
    'blusa17':'https://produtos.fotos-riachuelo.com.br/media/catalog/product/cache/image/1098x1370/e9c3970ab036de70892d86c6d221abfe/b/l/blusa-recorte-flores-11978414_foto1_frontal.jpg',
    'blusa18':'https://cea.vteximg.com.br/arquivos/ids/1894687-468-560/Blusa-Open-Shoulder-em-Suede-Azul-Claro-8808199-Azul_Claro_1.jpg?v=636445430678070000',
    'blusa19':'https://img.lojasrenner.com.br/item/544210217/medium/1.jpg',
    'blusa20':'https://cea.vteximg.com.br/arquivos/ids/1837802-468-560/Blusa-Ombro-a-Ombro-com-Babado-Azul-8811514-Azul_1.jpg?v=636428203571000000',
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
Plot.onTouch = function(message) {
    var artist = message.points[0].x
        .toLowerCase()
        .replace(/ /g, '-');

    var imgSrc = blankImg;

    if(artistToUrl[artist] !== undefined) imgSrc = artistToUrl[artist];

    Plot.hoverImg.src = imgSrc;
};

Plot.init();

})();
