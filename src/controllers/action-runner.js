class ActionRunner {
  actionStore = {}

  runAction({ name, args }) {
    const action = this.loadAndCacheAction(name);
    return action.apply(undefined, args);
  }

  loadAndCacheAction(name, context = {}) {
    if (this.actionStore[name]) {
      return this.actionStore[name];
    }

    const actionPlugin = require(name);
    // TODO check for plugin
    const action = actionPlugin(context);
    // TODO check for action
    this.actionStore[name] = action;

    return action;
  }

  injectAction(name, action) {
    this.actionStore[name] = action;
  }

  loadActionsFromPlugins(plugins, context) {
    plugins.forEach(({ name }) => this.loadAndCacheAction(name, context));
  }
}

module.exports = { ActionRunner };
