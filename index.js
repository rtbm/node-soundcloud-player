const http = require('https');
const url = require('url');
var exec = require('child_process').exec;

class SoundCloudPlayer {
  constructor(client_id) {
    this.client_id = client_id;
    this.endpoint = 'https://api.soundcloud.com';
  }

  query(cmd, cb) {
    console.log(`${this.endpoint}${cmd}?client_id=${this.client_id}`);

    return http.get(`${this.endpoint}${cmd}?client_id=${this.client_id}`, res => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => cb(JSON.parse(data)));
    })
  }

  play(track_id) {
    sc.query(`/tracks/${track_id}`, res => {
      const parsedUrl = url.parse(res.stream_url);
      sc.query(parsedUrl.path, res => {
        const cmd = `/usr/local/bin/play -t mp3 "${res.location}"`;
        exec(cmd, (error, stdout, stderr) => {
          if (error) {
            console.error(`exec error: ${error}`);
            return;
          }
          console.log(`stdout: ${stdout}`);
          console.log(`stderr: ${stderr}`);
        });
      });
    });
  }
}

const sc = new SoundCloudPlayer('37b912acee9af7be450c8a48dc081921');

sc.play('213665599');
