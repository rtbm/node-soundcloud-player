'use strict';
const http = require('https');
const url = require('url');
const spawn = require('child_process').spawn;

class SoundCloudPlayer {
  constructor(client_id) {
    this.client_id = client_id;
    this.endpoint = 'https://api.soundcloud.com';
    this.player = undefined;

    process.on('uncaughtException', err => this.handleError(err));
  }

  query(cmd, cb) {
    return http.get(`${this.endpoint}${cmd}?client_id=${this.client_id}`, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => cb(JSON.parse(data)));
    })
  }

  play(track_id) {
    return sc.query(`/tracks/${track_id}`,
      res => sc.query(url.parse(res.stream_url).path,
        res => {
          this.player = spawn('/usr/local/bin/play', ['-t', 'mp3', res.location]);
        }
      )
    )
  }

  stop() {
    if (this.player) {
      this.player.kill();
      this.player = undefined;
    }
  }

  handleError(err) {
    this.stop();
    console.error(err);
  }
}

const sc = new SoundCloudPlayer('37b912acee9af7be450c8a48dc081921');

sc.play('213665599');
