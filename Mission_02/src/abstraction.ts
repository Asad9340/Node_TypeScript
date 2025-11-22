interface MediaPlayer{
  play(): void;
  pause(): void;
  stop(): void;
}

class MusicPlayer implements MediaPlayer{
  play(): void {
    console.log('Music Playing')
  }
  pause(): void {
       console.log('Music paused...')
  }
  stop(): void {
       console.log('Music stoped ...')
  }

}

const AsadPlayer = new MusicPlayer();

AsadPlayer.pause()