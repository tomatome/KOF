GAME_WIDTH = window.innerWidth;
GAME_HEIGHT = window.innerHeight;

var s=document.getElementById("game");
Phaser.myScaleManager=new MyScaleManager(s)

var game = new Phaser.Game(window.innerWidth, window.innerHeight, Phaser.CANVAS, 'game');
Phaser.myScaleManager.boot()
game.States = {};
game.States.boot = function() {
	this.preload = function() {
		game.renderer.renderSession.roundPixels = true;
        game.physics.startSystem(Phaser.Physics.ARCADE);
		game.scale.pageAlignHorizontally = true;
		game.scale.pageAlignVertically = true;
		game.scale.scaleMode = Phaser.ScaleManager.EXACT_FIT;
		
	};
	this.create = function() {
		game.state.start('preload');
	};
}

game.States.preload = function() {
	this.preload = function() {
		//var preloadSprite = game.add.sprite(50, game.height / 2, 'loading'); //创建显示loading进度的sprite
		//game.load.setPreloadSprite(preloadSprite); //用setPreloadSprite方法来实现动态进度条的效果

		//以下为要加载的资源
		game.load.image('bg', 'img/bg.jpg'); //游戏背景图
		game.load.atlas('generic', 'img/generic-joystick.png', 'img/generic-joystick.json');
		game.load.image('fbg', 'img/fightbg.jpg'); //fight background
		game.load.atlas('bashen', 'img/bashen3.png', 'img/bashen3.json');
		//game.load.audio('fly_sound', 'assets/flap.wav');//飞翔的音效
		//game.load.audio('score_sound', 'assets/score.wav');//得分的音效
		//game.load.audio('hit_pipe_sound', 'assets/pipe-hit.wav'); //撞击管道的音效
		//game.load.audio('hit_ground_sound', 'assets/ouch.wav'); //撞击地面的音效
	}
	this.create = function() {
		game.state.start('menu'); //当以上所有资源都加载完成后就可以进入menu游戏菜单场景了
	}
}

game.States.menu = function() {
	this.create = function() {
		var bg = game.add.image(GAME_WIDTH/2, GAME_HEIGHT/4, 'fbg'); //当作背景的tileSprite 
		bg.scale.setTo(33, 33)
		//var ground = game.add.tileSprite(0, game.height - 112, game.width, 112, 'ground').autoScroll(-100, 0); //当作地面的tileSprite
		//bg.autoScroll(-10, 0); //让背景动起来
		//ground.autoScroll(-100, 0); //让地面动起来

		bashen = game.add.sprite(40, 40, 'bashen');
    	bashen.scale.set(25.0);
    	bashen.play(true);
    	bashen.animations.add('run');
    	bashen.animations.play('run', 15, true);

		game.pad = game.plugins.add(Phaser.VirtualJoystick);
		game.stick = game.pad.addStick(0, 0, 100, 'generic');
		game.stick.alignBottomLeft(10);
		game.stick.fixedToCamera = true;

		game.buttonA = game.pad.addButton(20, GAME_HEIGHT - 50, 'generic', 'button1-up', 'button1-down');
		game.buttonA.alignBottomRight(20)
		//this.buttonA.onDown.add(this.fire, this);
	}
}

game.States.play = function() {
	this.create = function() {};
}
game.States.over = function() {
	this.create = function() {};
}

game.state.add('boot', game.States.boot);
game.state.add('preload', game.States.preload);
game.state.add('menu', game.States.menu);
game.state.add('play', game.States.play);
game.state.add("over", game.States.over);
game.state.start("boot");