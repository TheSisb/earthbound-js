/* global Phaser */

var WorldSubState = function(parent) {
    this.parent = parent;
}

WorldSubState.prototype.enter = function() {
    var state = this.parent;
    state.playerDisabled = false;
    state.game.camera.follow(state.player.getLeader(), Phaser.Camera.FOLLOW_TOPDOWN);
    this.actionCoolOff = 20;
};

WorldSubState.prototype.update = function() {
    var state = this.parent;

    if (this.actionCoolOff > 0) {
        this.actionCoolOff--;
    } else {
        if (state.cancelKey.isDown) {
            state.switchSubState('worldmenu');
        }
    }

    state.enemies.sort('y', Phaser.Group.SORT_ASCENDING);
    state.player.sort('y', Phaser.Group.SORT_ASCENDING);

    state.physics.arcade.collide(state.enemies, state.currentMap.backgroundLayer);

    if (!state.playerDisabled) {
        var events = state.currentMap.getEvents();

        state.physics.arcade.collide(state.player, state.currentMap.backgroundLayer);
        state.physics.arcade.collide(state.player, state.enemies, function(player, enemy) {
            enemy.onTouch();
        });
        state.physics.arcade.collide(state.player.getLeader(), events, function(player, event) {
            event.onTouch();
        });
    }
};

WorldSubState.prototype.exit = function() {
    this.parent.playerDisabled = true;
}

module.exports = WorldSubState;
