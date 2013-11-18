margin = {t:0, r:20, b:30, l:20}
w = 620 - margin.l - margin.r
h = 750 - margin.t - margin.b
y = d3.time.scale().range([h, 0])
formatDate = d3.time.format("%Y").parse
parseDate = d3.time.format("%Y")
rectSize = 11

d3.selection.prototype.moveToFront = () ->
  this.each(() -> this.parentNode.appendChild(this))

mouseOn = (t, d) ->
  tip.show(d)
  # d3.select('.d3-tip').style('pointer-events', 'none')

mouseOff = () ->
  tip.hide()
  d3.select('.d3-tip')
    .style({
      top: '-1000px'
      left: '-1000px'
      })

svg = d3.select('#chart').append('svg')
  .attr({
    width: w + margin.l + margin.r
    height: h + margin.t + margin.b
  })
  .append('g')
    .attr({
      transform: 'translate(' + [ w/2 + margin.l, margin.t ] + ')'
      class: 'wrapperGroup'
    });

yAxis = d3.svg.axis()
  .ticks(6)
  .tickSize(0, 0, 0)
  .scale(y)
  .orient('left')

tooltipContent = (nodeData) ->
  startYear = parseDate(nodeData.start_year)
  endYear = parseDate(nodeData.end_year)

  if startYear != endYear
    '<h2>' + startYear + ' &ndash; ' + endYear + ' (' + nodeData.location + ')</h2>' +
    '<p>' + nodeData.event + '</p>'
  else
    '<h2>' + startYear + ' (' + nodeData.location + ')</h2>' +
    '<p>' + nodeData.event + '</p>'

tip = d3.tip()
  .attr('class', 'd3-tip')
  .direction('s')
  .offset([16, 0])
  .html((d) -> tooltipContent(d))

svg.call(tip)

d3.csv('./data/data.csv', (data) ->

  y.domain([new Date(1958,0,1), new Date(2015,0,1)])

  svg.append('g').attr('class', 'y-axis')
    .call(yAxis)

  svg.selectAll('.y-axis text').attr('transform', 'translate(' + [32,0] + ')')

  data.forEach((d) ->
    d.start_year = formatDate(d.start_year)
    d.end_year = formatDate(d.end_year)
  )

  nodes = svg.append('g')

  nodes.selectAll('.node')
    .data(data)
  .enter().append('rect')
    .attr({
      class: 'node'
      x: rectSize / -1.5
      y: (d) -> y(d.start_year) - 3
      width: rectSize * 1.5
      height: rectSize
      fill: '#900'
    })
    # .on('mouseover', (d) -> mouseOn(this, d))
    # .on('mouseout', (d) -> mouseOff)
    .on('mouseover', tip.show)
    .on('mouseout', mouseOff)
)