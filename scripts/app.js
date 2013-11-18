(function() {
  var formatDate, h, margin, mouseOff, mouseOn, parseDate, rectSize, svg, tgmColors, tip, tooltipContent, w, y, yAxis;

  margin = {
    t: 20,
    r: 20,
    b: 0,
    l: 20
  };

  w = 600 - margin.l - margin.r;

  h = 750 - margin.t - margin.b;

  y = d3.time.scale().range([0, h]);

  formatDate = d3.time.format("%Y").parse;

  parseDate = d3.time.format("%Y");

  rectSize = 12;

  tgmColors = {
    green: 'rgba(26, 173, 70, 1.0)',
    yellow: 'rgba(243, 191, 7, 1.0)',
    orange: 'rgba(253, 137, 57, 1.0)',
    blue: 'rgba(0, 100, 205, 1.0)',
    purple: 'rgba(128, 12, 138, 1.0)'
  };

  d3.selection.prototype.moveToFront = function() {
    return this.each(function() {
      return this.parentNode.appendChild(this);
    });
  };

  mouseOn = function(t, d) {
    tip.show(d);
    return d3.select('.d3-tip').style('pointer-events', 'none');
  };

  mouseOff = function() {
    tip.hide();
    return d3.select('.d3-tip').style('pointer-events', 'none');
  };

  svg = d3.select('#chart').append('svg').attr({
    width: w + margin.l + margin.r,
    height: h + margin.t + margin.b
  }).append('g').attr({
    transform: 'translate(' + [w / 2 + margin.l, margin.t] + ')',
    "class": 'wrapperGroup'
  });

  yAxis = d3.svg.axis().ticks(6).tickSize(0, 0, 0).scale(y).orient('left');

  tooltipContent = function(nodeData) {
    var endYear, startYear;
    startYear = parseDate(nodeData.start_year);
    endYear = parseDate(nodeData.end_year);
    if (startYear !== endYear) {
      return '<h2>' + startYear + ' &ndash; ' + endYear + ' (' + nodeData.location + ')</h2>' + '<p>' + nodeData.event + '</p>';
    } else {
      return '<h2>' + startYear + ' (' + nodeData.location + ')</h2>' + '<p>' + nodeData.event + '</p>';
    }
  };

  tip = d3.tip().attr('class', 'd3-tip').direction('n').offset([-12, 0]).html(function(d) {
    return tooltipContent(d);
  });

  svg.call(tip);

  d3.csv('./data/data.csv', function(data) {
    var nodes;
    y.domain([new Date(1958, 0, 1), new Date(2015, 0, 1)]);
    svg.append('g').attr('class', 'y-axis').call(yAxis);
    svg.selectAll('.y-axis text').attr('transform', 'translate(' + [32, 0] + ')');
    data.forEach(function(d) {
      d.start_year = formatDate(d.start_year);
      return d.end_year = formatDate(d.end_year);
    });
    nodes = svg.append('g');
    return nodes.selectAll('.node').data(data).enter().append('rect').attr({
      "class": 'node',
      x: rectSize / -2,
      y: function(d) {
        return y(d.start_year) - 3;
      },
      width: rectSize,
      height: rectSize,
      fill: '#bf4545'
    }).on('mouseover', function(d) {
      return mouseOn(this, d);
    }).on('mouseout', mouseOff);
  });

}).call(this);
