
var jetBubbles = document.getElementsByClassName('jetBubble');
var mainTimeline = new TimelineMax({repeat:-1});
var mainSpeedLinesTimeline = new TimelineMax({repeat:-1, paused:false});

mainTimeline.timeScale(2);

function createJets(){
  TweenMax.set(jetBubbles, {
    attr:{
      r:'-=5'
    }
  })
 //jet bubbles
  for(var i = 0; i < jetBubbles.length; i++){    
    var jb = jetBubbles[i];    
    var tl = new TimelineMax({repeat:-1});
    tl.to(jb, 1 , {
      attr:{
        r:'+=5'
      },
      ease:Linear.easeNone
    })
    .to(jb, 1 , {
      attr:{
        r:'-=5'
      },
      ease:Linear.easeNone
    })
    mainTimeline.add(tl, i/2)
  }
}
createJets();


window.onscroll = (event) => {
  let topScroll = this.scrollY,
      layers = document.querySelectorAll('[data-type="parallax"]'),
      prefixes = [
        '-webkit-transform',
        '-moz-transform',
        '-ms-transform',
        '-o-transform'
      ];
  
  for (let layer of Array.prototype.slice.call(layers)) {
    let depth = layer.getAttribute('data-depth'),
        movement = -1*(topScroll * depth),
        translate = `translate3d(0, ${movement}px, 0)`;
    for (let prefix of prefixes) {
      layer.style[prefix] = translate;
    }
    layer.style.transform = translate;
  }
}