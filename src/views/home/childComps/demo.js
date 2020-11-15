function blogName() {

  let loading = $('.loading').wrapInner('<div></div>')
    let min = 20
    let max = 70
    let minMove = 10
    let maxMove = 20;

  startAnimation(loading);

  loading.on('animationend webkitAnimationEnd oAnimationEnd', 'span:last-child', function(e) {
    startAnimation(loading);
  });

  //设置CSS变量并根据需要生成跨距
  function setCSSVars(elem, min, max, minMove, maxMove) {
    let width = Math.ceil(elem.width()),
      text = elem.text();
    for (let i = 1; i < width; i++) {
      let num = Math.floor(Math.random() * (max - min + 1)) + min,
        numMove = Math.floor(Math.random() * (maxMove - minMove + 1)) + minMove,
        dir = (i % 2 == 0) ? 1 : -1,
        spanCurrent = elem.find('span:eq(' + i + ')'),
        span = spanCurrent.length ? spanCurrent : $('<span/>');
      span.css({
        '--x': i - 1 + 'px',
        '--move-y': num * dir + 'px',
        '--move-y-s': ((i % 2 == 0) ? num * dir - numMove : num * dir + numMove) + 'px',
        '--delay': i * 10 + 'ms'
      });
      if (!spanCurrent.length) {
        elem.append(span.text(text));
      }
    }
  }

  //开始动画
  function startAnimation(elem) {
    elem.removeClass('start');
    setCSSVars(elem, min, max, minMove, maxMove);
    elem.addClass('start');
  }
}

export {
  blogName
}
