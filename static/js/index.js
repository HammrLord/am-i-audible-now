'use strict';

/*
 * Per-codebook results (n = 200) from Tables 2, 3 and 5 to 8 of the paper.
 * `f0` is the F0 effect in cents, `stoi` the intelligibility score. Rows are
 * codebooks; columns are [zero, mean] ablation pairs, one pair per condition.
 */
const CODECS = {
  mimi: {
    conditions: ['Clean', '15 dB', '5 dB', '0 dB'],
    confounded: [1],
    yMax: 300,
    note: 'One semantic codebook distilled from WavLM, followed by seven acoustic codebooks.',
    f0: [
      [22.4, 20.6, 24.9, 25.6, 25.8, 38.5, 32.2, 55.8],
      [188.4, 280.1, 193.7, 236.5, 200.1, 242.7, 208.7, 239.1],
      [68.3, 90.9, 63.9, 75.0, 58.7, 103.0, 70.1, 98.5],
      [177.1, 50.7, 197.3, 48.3, 227.3, 89.2, 254.8, 82.0],
      [178.1, 34.9, 195.5, 43.6, 256.0, 59.3, 255.4, 73.2],
      [35.4, 29.7, 37.3, 40.8, 50.5, 39.7, 65.1, 64.3],
      [77.7, 26.4, 79.3, 33.4, 88.0, 41.7, 100.8, 59.9],
      [22.5, 21.5, 25.1, 26.8, 29.3, 40.1, 41.6, 46.8],
    ],
    stoi: [
      [0.963, 0.966, 0.950, 0.950, 0.935, 0.934, 0.926, 0.930],
      [0.578, 0.524, 0.531, 0.503, 0.531, 0.521, 0.537, 0.539],
      [0.906, 0.897, 0.888, 0.873, 0.862, 0.842, 0.849, 0.833],
      [0.906, 0.935, 0.881, 0.915, 0.848, 0.888, 0.825, 0.876],
      [0.903, 0.953, 0.882, 0.935, 0.851, 0.910, 0.831, 0.894],
      [0.944, 0.963, 0.927, 0.948, 0.905, 0.929, 0.890, 0.911],
      [0.947, 0.971, 0.928, 0.955, 0.902, 0.937, 0.887, 0.919],
      [0.964, 0.974, 0.952, 0.960, 0.934, 0.941, 0.921, 0.927],
    ],
  },
  speechtokenizer: {
    conditions: ['Clean', '15 dB', '5 dB'],
    confounded: [0, 4, 6, 7],
    yMax: 400,
    note: 'One semantic codebook distilled from HuBERT, followed by seven acoustic codebooks. Evaluated at 15 and 5 dB.',
    f0: [
      [28.8, 29.9, 26.6, 55.6, 22.3, 48.3],
      [49.3, 90.6, 47.8, 48.0, 50.8, 60.5],
      [29.0, 27.5, 29.9, 38.7, 38.3, 48.0],
      [20.7, 22.9, 21.9, 24.4, 23.9, 32.9],
      [339.8, 20.4, 349.9, 24.4, 351.9, 26.0],
      [280.5, 17.3, 318.3, 18.0, 347.4, 25.6],
      [104.4, 16.5, 83.9, 19.5, 158.0, 25.9],
      [110.8, 16.4, 143.2, 17.0, 215.4, 20.4],
    ],
    stoi: [
      [0.651, 0.566, 0.543, 0.471, 0.482, 0.451],
      [0.864, 0.864, 0.861, 0.853, 0.838, 0.830],
      [0.905, 0.921, 0.880, 0.899, 0.845, 0.867],
      [0.956, 0.940, 0.940, 0.924, 0.917, 0.897],
      [0.710, 0.960, 0.662, 0.940, 0.614, 0.912],
      [0.929, 0.969, 0.905, 0.952, 0.875, 0.934],
      [0.809, 0.973, 0.761, 0.957, 0.713, 0.937],
      [0.825, 0.978, 0.783, 0.961, 0.737, 0.940],
    ],
  },
  encodec: {
    conditions: ['Clean', '15 dB', '5 dB', '0 dB'],
    confounded: [0],
    yMax: 1000,
    note: 'Eight plain cascaded RVQ codebooks at 6 kbps, with no distilled semantic codebook.',
    f0: [
      [960.6, 38.4, 869.4, 42.3, 786.8, 55.1, 732.6, 56.7],
      [64.5, 24.0, 121.1, 27.3, 190.9, 48.4, 204.2, 59.1],
      [352.9, 20.4, 266.6, 21.9, 263.4, 31.4, 274.0, 38.8],
      [800.4, 20.2, 781.3, 18.5, 780.1, 25.8, 753.4, 21.8],
      [214.9, 17.1, 121.2, 16.3, 110.1, 25.3, 91.9, 19.4],
      [167.7, 15.2, 54.7, 17.2, 49.3, 14.9, 39.5, 21.5],
      [14.6, 15.9, 15.9, 14.2, 18.5, 15.2, 16.8, 17.0],
      [41.6, 15.4, 24.7, 15.3, 21.4, 16.3, 22.4, 15.9],
    ],
    stoi: [
      [0.607, 0.661, 0.558, 0.626, 0.548, 0.623, 0.554, 0.627],
      [0.876, 0.903, 0.865, 0.888, 0.849, 0.869, 0.840, 0.859],
      [0.897, 0.945, 0.882, 0.932, 0.862, 0.917, 0.852, 0.909],
      [0.935, 0.959, 0.922, 0.947, 0.906, 0.934, 0.896, 0.926],
      [0.948, 0.969, 0.936, 0.960, 0.923, 0.948, 0.915, 0.942],
      [0.946, 0.975, 0.933, 0.967, 0.920, 0.958, 0.911, 0.951],
      [0.969, 0.980, 0.960, 0.972, 0.952, 0.962, 0.947, 0.956],
      [0.971, 0.983, 0.961, 0.976, 0.951, 0.968, 0.944, 0.963],
    ],
  },
};

const DEFAULT_CODEC = 'mimi';
const NUM_CODEBOOKS = 8;
const MODES = ['zero', 'mean'];

const SVG_NS = 'http://www.w3.org/2000/svg';
const VIEW = {width: 480, height: 280};
const MARGIN = {top: 12, right: 10, bottom: 44, left: 48};
const PLOT = {
  width: VIEW.width - MARGIN.left - MARGIN.right,
  height: VIEW.height - MARGIN.top - MARGIN.bottom,
  right: VIEW.width - MARGIN.right,
  bottom: VIEW.height - MARGIN.bottom,
};
const GROUP_WIDTH = PLOT.width / NUM_CODEBOOKS;
const BAR = {width: 16, gap: 2, radius: 4};
const Y_TICKS = 4;
const TOOLTIP_OFFSET = 8;

const state = {codec: DEFAULT_CODEC, condition: 0};
const dom = {};

function svg(name, attrs = {}, text) {
  const el = document.createElementNS(SVG_NS, name);
  for (const [key, value] of Object.entries(attrs)) {
    el.setAttribute(key, value);
  }
  if (text !== undefined) {
    el.textContent = text;
  }
  return el;
}

const groupCenter = (k) => MARGIN.left + GROUP_WIDTH * (k + 0.5);
const barHeight = (value, yMax) => PLOT.height * value / yMax;

function renderChart() {
  const codec = CODECS[state.codec];
  const clip = svg('clipPath', {id: 'plot-clip'});
  clip.append(svg('rect', {x: MARGIN.left, y: 0, width: PLOT.width, height: PLOT.bottom}));

  const axes = [];
  for (let tick = 0; tick <= Y_TICKS; tick++) {
    const y = PLOT.bottom - PLOT.height * tick / Y_TICKS;
    if (tick > 0) {
      axes.push(svg('line', {class: 'grid', x1: MARGIN.left, x2: PLOT.right, y1: y, y2: y}));
    }
    axes.push(svg('text', {x: MARGIN.left - 8, y: y + 4, 'text-anchor': 'end'}, codec.yMax * tick / Y_TICKS));
  }
  axes.push(
    svg('text', {
      class: 'axis-title',
      'text-anchor': 'middle',
      transform: `translate(12, ${MARGIN.top + PLOT.height / 2}) rotate(-90)`,
    }, 'F0 effect (cents)'),
    svg('text', {
      class: 'axis-title',
      'text-anchor': 'middle',
      x: MARGIN.left + PLOT.width / 2,
      y: VIEW.height - 6,
    }, 'Codebook'),
  );

  // Bars overshoot the baseline and are clipped there, which leaves only
  // their top corners rounded.
  const bars = svg('g', {'clip-path': 'url(#plot-clip)'});
  const overlays = [];
  for (let k = 0; k < NUM_CODEBOOKS; k++) {
    const cx = groupCenter(k);
    const confounded = codec.confounded.includes(k);

    MODES.forEach((mode, i) => {
      bars.append(svg('rect', {
        class: `bar bar-${mode}`,
        'data-codebook': k,
        'data-mode': i,
        x: i === 0 ? cx - BAR.width - BAR.gap / 2 : cx + BAR.gap / 2,
        y: PLOT.bottom,
        width: BAR.width,
        height: 0,
        rx: BAR.radius,
      }));
    });

    overlays.push(
      svg('text', {
        class: confounded ? 'tick-confounded' : '',
        'text-anchor': 'middle',
        x: cx,
        y: PLOT.bottom + 16,
      }, confounded ? `${k}*` : k),
      svg('rect', {
        class: 'hit',
        'data-codebook': k,
        x: cx - GROUP_WIDTH / 2,
        y: MARGIN.top,
        width: GROUP_WIDTH,
        height: PLOT.height,
      }),
    );
  }

  const baseline = svg('line', {
    class: 'baseline', x1: MARGIN.left, x2: PLOT.right, y1: PLOT.bottom, y2: PLOT.bottom,
  });

  dom.chart.replaceChildren(clip, ...axes, bars, baseline, ...overlays);
  dom.note.textContent = codec.note;
}

function updateBars() {
  const codec = CODECS[state.codec];
  for (const bar of dom.chart.querySelectorAll('.bar')) {
    const {codebook, mode} = bar.dataset;
    const value = codec.f0[codebook][state.condition * 2 + Number(mode)];
    const height = barHeight(value, codec.yMax);
    bar.setAttribute('y', PLOT.bottom - height);
    bar.setAttribute('height', height + BAR.radius * 2);
  }
  dom.readout.textContent = codec.conditions[state.condition];
}

function showTooltip(k) {
  const codec = CODECS[state.codec];
  const column = state.condition * 2;
  const f0 = codec.f0[k].slice(column, column + 2);
  const stoi = codec.stoi[k].slice(column, column + 2);

  const rows = MODES.map((mode, i) => `
    <span class="swatch swatch-${mode}"></span>${mode === 'zero' ? 'Zero' : 'Mean'}:
    ${f0[i].toFixed(1)} cents <span class="muted">(STOI ${stoi[i].toFixed(3)})</span>`);
  if (codec.confounded.includes(k)) {
    rows.push('<span class="muted">Reconstruction-critical</span>');
  }
  dom.tooltip.innerHTML =
      `<strong>Codebook ${k}, ${codec.conditions[state.condition]}</strong>${rows.join('<br>')}`;
  dom.tooltip.hidden = false;

  // The tooltip is anchored by its bottom centre, just above the taller bar.
  const chartBox = dom.chart.getBoundingClientRect();
  const wrapperBox = dom.tooltip.offsetParent.getBoundingClientRect();
  const scale = chartBox.width / VIEW.width;
  const barTop = PLOT.bottom - barHeight(Math.max(...f0), codec.yMax);
  const top = chartBox.top - wrapperBox.top + barTop * scale - TOOLTIP_OFFSET;
  dom.tooltip.style.left = `${groupCenter(k) * scale}px`;
  dom.tooltip.style.top = `${Math.max(top, dom.tooltip.offsetHeight)}px`;
}

function hideTooltip() {
  dom.tooltip.hidden = true;
}

function selectCodec(key) {
  const lastCondition = CODECS[key].conditions.length - 1;
  state.codec = key;
  state.condition = Math.min(state.condition, lastCondition);

  for (const button of dom.codecSwitch.querySelectorAll('.button')) {
    const selected = button.dataset.codec === key;
    button.classList.toggle('is-info', selected);
    button.classList.toggle('is-selected', selected);
    button.setAttribute('aria-pressed', selected);
  }
  dom.slider.max = lastCondition;
  dom.slider.value = state.condition;

  hideTooltip();
  renderChart();
  // Bars are created with zero height. Waiting two frames lets that state
  // paint, so the CSS transition has something to animate from.
  requestAnimationFrame(() => requestAnimationFrame(updateBars));
}

function initChart() {
  Object.assign(dom, {
    chart: document.getElementById('f0-chart'),
    tooltip: document.getElementById('chart-tooltip'),
    note: document.getElementById('chart-note'),
    slider: document.getElementById('condition-slider'),
    readout: document.getElementById('condition-readout'),
    codecSwitch: document.getElementById('codec-switch'),
  });
  dom.chart.setAttribute('viewBox', `0 0 ${VIEW.width} ${VIEW.height}`);

  dom.codecSwitch.addEventListener('click', (event) => {
    const button = event.target.closest('[data-codec]');
    if (button) {
      selectCodec(button.dataset.codec);
    }
  });

  dom.slider.addEventListener('input', () => {
    state.condition = Number(dom.slider.value);
    hideTooltip();
    updateBars();
  });

  dom.chart.addEventListener('mousemove', (event) => {
    const hit = event.target.closest('.hit');
    if (hit) {
      showTooltip(Number(hit.dataset.codebook));
    } else {
      hideTooltip();
    }
  });
  dom.chart.addEventListener('mouseleave', hideTooltip);

  selectCodec(DEFAULT_CODEC);
}

function initNavbar() {
  const burger = document.querySelector('.navbar-burger');
  const menu = document.querySelector('.navbar-menu');
  burger.addEventListener('click', () => {
    const open = burger.classList.toggle('is-active');
    menu.classList.toggle('is-active', open);
    burger.setAttribute('aria-expanded', open);
  });
}

function initCarousel() {
  bulmaCarousel.attach('.carousel', {
    slidesToShow: 3,
    slidesToScroll: 1,
    loop: true,
    infinite: true,
    breakpoints: [
      {changePoint: 480, slidesToShow: 1, slidesToScroll: 1},
      {changePoint: 768, slidesToShow: 2, slidesToScroll: 1},
    ],
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initCarousel();
  initChart();
});
