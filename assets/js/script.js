  // Terminal typewriter with brand-accurate content
  const lines = [
    { cmd: 'echo "founded at SQU in partnership with ITA, 2010"', out: '→ Building open-source culture in Oman since day one.' },
    { cmd: 'sudo apt install open-source-mindset', out: '→ Package installed. Reboot your thinking.' },
    { cmd: 'git clone https://github.com/FO3S-SQU', out: '→ Cloning into community... done. Welcome aboard.' },
    { cmd: 'cat /etc/fo3s/four-freedoms.txt', out: '→ Run. Study. Redistribute. Improve.' },
    { cmd: 'ls ./goals/ | head -1', out: '→ first-omani-gnu-linux-distro/' },
  ];
  let li = 0, ci = 0, phase = 'typing';
  const cmdEl = document.getElementById('typed-cmd');
  const outEl = document.getElementById('typed-out');

  function tick() {
    const l = lines[li];
    if (phase === 'typing') {
      cmdEl.textContent = l.cmd.slice(0, ci++);
      if (ci > l.cmd.length) {
        phase = 'showing';
        outEl.textContent = l.out;
        outEl.style.opacity = '1';
        return setTimeout(tick, 1800);
      }
      setTimeout(tick, 38);
    } else if (phase === 'showing') {
      phase = 'clearing';
      outEl.style.opacity = '0';
      setTimeout(tick, 400);
    } else {
      li = (li + 1) % lines.length;
      ci = 0; phase = 'typing';
      cmdEl.textContent = '';
      setTimeout(tick, 300);
    }
  }
  tick();

  // Close modals on backdrop click
  document.querySelectorAll('.modal-overlay').forEach(el => {
    el.addEventListener('click', e => { if (e.target === el) el.classList.remove('open'); });
  });