const fixedCanvasStyles = {
	position: "fixed",
	top: 0,
	left: 0,
	width: "100%",
	height: "100%",
	padding: 0,
	margin: 0,
};

function perlinNoise(x, y) {
	const p = new Uint8Array(512);
	const permutation = new Uint8Array(256);
	for (let i = 0; i < 256; i++) permutation[i] = i;
	for (let i = 255; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[permutation[i], permutation[j]] = [permutation[j], permutation[i]];
	}
	p.set(permutation, 0);
	p.set(permutation, 256);

	function fade(t) {
		return t * t * t * (t * (t * 6 - 15) + 10);
	}

	function lerp(t, a, b) {
		return a + t * (b - a);
	}

	function grad(hash, x, y) {
		const h = hash & 3;
		const u = h < 2 ? x : y;
		const v = h < 2 ? y : x;
		return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? 2 * v : -2 * v);
	}

	const X = Math.floor(x) & 255;
	const Y = Math.floor(y) & 255;

	x -= Math.floor(x);
	y -= Math.floor(y);

	const u = fade(x);
	const v = fade(y);

	const A = p[X] + Y;
	const B = p[X + 1] + Y;

	return lerp(
		v,
		lerp(u, grad(p[A], x, y), grad(p[B], x - 1, y)),
		lerp(u, grad(p[A + 1], x, y - 1), grad(p[B + 1], x - 1, y - 1)),
	);
}

module.exports = { fixedCanvasStyles, perlinNoise, Background };
