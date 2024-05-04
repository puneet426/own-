const SCENE = document.querySelector('.scene');
const BUTTON_TEXT = document.querySelector('.text');
const CONFIG = {
    text: "PUNEET",
    hue: 180,
    alpha: 1,
    window: 1.4,
    speed: 1,
    blur: 10,
    spread: 120,
    thickness: 2,
    radius: 32,
    constant: false,
    exploded: false
};

const UPDATE = () => {
    console.info('cool');
    for (const KEY of Object.keys(CONFIG)) {
        if (KEY === 'exploded' || KEY === 'constant') break;
        document.documentElement.style.setProperty(`--${KEY}`, CONFIG[KEY]);
    }
    document.body.dataset.showGlows = CONFIG.constant;
};

const TOGGLE = () => {
    const exploded = CONFIG.exploded;
    document.body.toggleAttribute('data-exploded');
    if (!exploded) {
        document.body.toggleAttribute('data-imploding');
        const SCENE_ANIMATIONS = SCENE.getAnimations();
        Promise.all([...SCENE_ANIMATIONS.map(t => t.finished)]).then(() => { document.body.toggleAttribute('data-imploding') });
    }
};

const CHANGE_LABEL = () => {
    BUTTON_TEXT.innerText = CONFIG.text;
};

const gui = new dat.GUI();
gui.add(CONFIG, 'text').name('Label').onChange(CHANGE_LABEL);
gui.add(CONFIG, 'hue', 0, 359, 1).name('Hue').onChange(UPDATE);
gui.add(CONFIG, 'alpha', 0.1, 1, 0.1).name('Alpha').onChange(UPDATE);
gui.add(CONFIG, 'window', 0.5, 5, 0.1).name('Reveal (s)').onChange(UPDATE);
gui.add(CONFIG, 'speed', 0.5, 5, 0.1).name('Speed (s)').onChange(UPDATE);
gui.add(CONFIG, 'blur', 0, 50, 1).name('Blur (px)').onChange(UPDATE);
gui.add(CONFIG, 'spread', 10, 180, 1).name('Spread (deg)').onChange(UPDATE);
gui.add(CONFIG, 'thickness', 1, 10, 1).name('Thickness (px)').onChange(UPDATE);
gui.add(CONFIG, 'radius', 0, 100, 1).name('Radius (px)').onChange(UPDATE);
gui.add(CONFIG, 'constant').name('Show Glows').onChange(UPDATE);
gui.add(CONFIG, 'exploded').name('Explode').onChange(TOGGLE);

UPDATE();
