### Konfigurera puppet
1. [Ta bort gamalt certifikat](#old-cert) (om det behövs)
2. Skapa nytt cert: `puppet agent --test --server=chapman.lysator.liu.se --waitforcert=10`
3. Sätt server: `puppet config set server chapman.lysator.liu.se`
4. Slå på tjänsten: `<systemctl enable --now puppet`

### Puppet på Archlinux
- Puppet agent finns på AUR (openvox-agent-bin)
- `libxcrypt-compat` behöver också installeras.
- Puppet binären ligger i `/opt/puppetlabs/bin/puppet` (finns inte i sökvägen)

### Ta bort gamalt certifikat { #old-cert }
Om en dator ska installeras om behöver det gamla certifikatet raderas.
1. SSH:a till `chapman.lysator.liu.se`
2. Som root kör: `puppetserver ca clean --certname <NAMN>.lysator.liu.se`

