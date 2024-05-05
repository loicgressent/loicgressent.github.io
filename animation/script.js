const color = [255,255,255];;
const particles = {
	left: 0.05,
	right: 0.05
};

const sideSmoke = (canvas, side) => {
  const ctx = canvas.getContext('2d');
  const machine = SmokeMachine(ctx, color);
  machine.start();
  machine.setPreDrawCallback(() => {
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    const posY = (innerWidth < 992) ? h : h - h*0.14;
    machine.addSmoke(w/2, posY, particles[side])
    canvas.width = w;
    canvas.height = h;
  });
	return machine;
}

const middleSmoke = (canvas) => {
  const ctx = canvas.getContext('2d');
  const machine = SmokeMachine(ctx, color);
  machine.start();
	setTimeout(() => {
		machine.setPreDrawCallback(() => {
			const w = canvas.clientWidth;
			const h = canvas.clientHeight;
			machine.addSmoke(w/2, h*2/3, 0.05)
			canvas.width = w;
			canvas.height = h;
		});
	}, 2500);
	return machine;
}

const repro = document.getElementById('repro');
const canvasMiddle = document.getElementById('canvasMiddle');
const canvasLeft = document.getElementById('canvasLeft');
const canvasRight = document.getElementById('canvasRight');
sideSmoke(canvasLeft, 'left');
sideSmoke(canvasRight, 'right');
const middleSmokeMachine = middleSmoke(canvasMiddle);


repro.addEventListener('mousemove', e => {
	requestAnimationFrame(() => {
		// if (e.pageY > window.innerHeight) return;
		// const t = Math.floor(Math.random() * 200) + 3800
		// middleSmokeMachine.addSmoke(e.pageX, e.pageY, 0.1, t);
		// if (e.pageX > window.innerWidth / 2)
		const min = 0.015;
		const max = 0.15;
		const x = Math.round(e.pageX / innerWidth * 100) / 100;
		particles.left = min + Math.round((max - min) * (1 - x) * 100) / 100;
		particles.right = min + Math.round((max - min) * x * 100) / 100;
	});
});