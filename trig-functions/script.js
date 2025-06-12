const dom = [...document.querySelectorAll('[id]')].reduce((obj, ele) => {
	obj[ele.id] = ele;
	return obj;
}, {});

const RADIUS_TO_DEGREES = Math.PI / 180;
const CIRCLE_RADIUS = 500;
const TANGENT_LENGTH = 200;
const PLOT_RADIUS = CIRCLE_RADIUS / 2;
const PLOT_STEP = 1000 / 360;

function render(ang) {
	const radians = ang * RADIUS_TO_DEGREES;
	const tangent = radians - Math.PI / 2;
	const xAxis = Math.sin(radians);
	const yAxis = Math.cos(radians);

	dom.spnDegrees.textContent = Math.round(ang);
	dom.spnRadians.textContent = radians.toFixed(4);
	dom.spnXaxis.textContent = Math.round(xAxis * CIRCLE_RADIUS);
	dom.spnYaxis.textContent = Math.round(yAxis * CIRCLE_RADIUS);
	dom.spnTangent.textContent = tangent.toFixed(4);

	dom.svgRadius.setAttribute('x2', 500 + Math.round(xAxis * CIRCLE_RADIUS));
	dom.svgRadius.setAttribute('y2', 500 - Math.round(yAxis * CIRCLE_RADIUS));

	dom.svgXaxis.setAttribute('x1', 500 + Math.round(xAxis * CIRCLE_RADIUS));
	dom.svgXaxis.setAttribute('y1', 500 - Math.round(yAxis * CIRCLE_RADIUS));
	dom.svgXaxis.setAttribute('y2', 500 - Math.round(yAxis * CIRCLE_RADIUS));
	dom.svgXaxis2.setAttribute('x2', 500 + Math.round(xAxis * CIRCLE_RADIUS));

	dom.svgYaxis.setAttribute('x1', 500 + Math.round(xAxis * CIRCLE_RADIUS));
	dom.svgYaxis.setAttribute('x2', 500 + Math.round(xAxis * CIRCLE_RADIUS));
	dom.svgYaxis.setAttribute('y1', 500 - Math.round(yAxis * CIRCLE_RADIUS));
	dom.svgYaxis2.setAttribute('y2', 500 - Math.round(yAxis * CIRCLE_RADIUS));

	dom.svgTangent.setAttribute(
		'x1',
		500 +
			Math.round(xAxis * CIRCLE_RADIUS) +
			Math.round(Math.sin(tangent) * TANGENT_LENGTH)
	);
	dom.svgTangent.setAttribute(
		'y1',
		500 -
			Math.round(yAxis * CIRCLE_RADIUS) -
			Math.round(Math.cos(tangent) * TANGENT_LENGTH)
	);
	dom.svgTangent.setAttribute(
		'x2',
		500 +
			Math.round(xAxis * CIRCLE_RADIUS) -
			Math.round(Math.sin(tangent) * TANGENT_LENGTH)
	);
	dom.svgTangent.setAttribute(
		'y2',
		500 -
			Math.round(yAxis * CIRCLE_RADIUS) +
			Math.round(Math.cos(tangent) * TANGENT_LENGTH)
	);

	dom.svgTanLine.setAttribute(
		'x1',
		200 - Math.round(Math.sin(tangent) * TANGENT_LENGTH)
	);
	dom.svgTanLine.setAttribute(
		'y1',
		200 + Math.round(Math.cos(tangent) * TANGENT_LENGTH)
	);
	dom.svgTanLine.setAttribute(
		'x2',
		200 + Math.round(Math.sin(tangent) * TANGENT_LENGTH)
	);
	dom.svgTanLine.setAttribute(
		'y2',
		200 - Math.round(Math.cos(tangent) * TANGENT_LENGTH)
	);

	dom.svgPlotA.setAttribute('x2', Math.round(ang * PLOT_STEP));

	dom.svgPlotX.setAttribute('x1', Math.round(ang * PLOT_STEP));
	dom.svgPlotX.setAttribute('x2', Math.round(ang * PLOT_STEP));
	dom.svgPlotX.setAttribute('y2', 250 - Math.round(xAxis * PLOT_RADIUS));

	dom.svgPlotY.setAttribute('x1', Math.round(ang * PLOT_STEP));
	dom.svgPlotY.setAttribute('x2', Math.round(ang * PLOT_STEP));
	dom.svgPlotY.setAttribute('y2', 250 - Math.round(yAxis * PLOT_RADIUS));

	let sinPlot = ['M 0,250'];
	let cosPlot = ['M 0,250'];
	let tanPlot = ['M 0,250'];
	let tanOp = 'L';
	for (let a = 0; a <= ang; a += 5) {
		const angSin = Math.sin(a * RADIUS_TO_DEGREES);
		const angCos = Math.cos(a * RADIUS_TO_DEGREES);
		let angTan = Math.tan(a * RADIUS_TO_DEGREES);
		sinPlot.push(
			`L ${a * PLOT_STEP},${250 - Math.round(angSin * PLOT_RADIUS)}`
		);
		cosPlot.push(
			`L ${a * PLOT_STEP},${250 - Math.round(angCos * PLOT_RADIUS)}`
		);
		tanOp = 'L';
		if (angTan > 1) {
			angTan = 1;
			tanOp = 'M';
		}
		if (angTan < -1) {
			angTan = -1;
			tanOp = 'M';
		}
		tanPlot.push(
			`${tanOp} ${a * PLOT_STEP},${250 - Math.round(angTan * PLOT_RADIUS)}`
		);
	}
	dom.svgPlotSin.setAttribute('d', sinPlot.join(' '));
	dom.svgPlotCos.setAttribute('d', cosPlot.join(' '));
	dom.svgPlotTan.setAttribute('d', tanPlot.join(' '));
}

const renderDiagram = () => render(+dom.rngAngle.value);

dom.rngAngle.addEventListener('change', renderDiagram);

dom.rngAngle.focus();

renderDiagram();
