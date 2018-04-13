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
     'blusa-com-babados':'https://fnagano.github.io/Blusa1.jpg',
     'blusa-open-shoulder-com-guipir-vinho':'https://fnagano.github.io/Blusa2.jpg',
     'blusa-babados':'https://fnagano.github.io/Blusa3.jpg',
     'blusa-feminina-ciganinha-manga-curta-com-amarração-vinho':'https://fnagano.github.io/Blusa4.jpg',
     'blusa5':'https://fnagano.github.io/Blusa5.jpg',
     'blusa7':'https://fnagano.github.io/Blusa7.jpg',
     'blusa8':'https://fnagano.github.io/Blusa8.jpg',
     'blusa9':'https://fnagano.github.io/Blusa9.jpg',
     'blusa10':'https://fnagano.github.io/Blusa10.jpg',
     'blusa11':'https://fnagano.github.io/Blusa11.jpg',
     'blusa12':'https://fnagano.github.io/Blusa12.jpg'
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
