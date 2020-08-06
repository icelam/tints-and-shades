const { spawn } = require('child_process');

class WebpackElectronReloadPlugin {
  constructor(options) {
    this.options = {
      startCommand: '',
      ...options
    };
    this.electronProcess = null;
  }

  apply(compiler) {
    // Executes a plugin during watch mode after a new compilation is triggered
    // but before the compilation is actually started. Async Hook.
    compiler.hooks.watchRun.tap('webpack_execute_plugin_watchRun', () => {
      if (!this.electronProcess) { return; }
      console.log(`🚮 Electron Reload Plugin: Closing old Electron process (pid: ${this.electronProcess.pid})...`);
      try {
        process.kill(this.electronProcess.pid);
      } catch (error) {
        console.error(`❌ Electron Reload Plugin: Failed to close old Electron process (${error.message})`);
      }
    });

    // Called after emitting assets to output directory. Async Hook.
    compiler.hooks.afterEmit.tap('webpack_execute_plugin_afterEmit', () => {
      if (!this.options.startCommand && this.options.startCommand !== 'string') {
        console.error('❌ Electron Reload Plugin: Start command must be a string.');
        return;
      }
      console.log('ℹ️ Electron Reload Plugin: Starting new Electron instance...');
      this.electronProcess = spawn(this.options.startCommand, {
        shell: true, env: process.env, stdio: 'inherit'
      }).on('error', (error) => {
        console.error(error);
      });
    });
  }
}

module.exports = WebpackElectronReloadPlugin;
