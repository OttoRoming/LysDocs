## Hur man sätter upp en Arch arbetsstation

1. Boota Archiso installer

2. Konfigurera ip (https://wiki.archlinux.org/title/Network_configuration#Static_IP_address) och även [DNS post](dns)

3. Partitionera

4. Skapa rootlösenord och användaren `lysroot` (sudoer), och pusha lösneordet till passrepo

5. Välj `linux-lts` kernel, installera!
> sätt kernelparamter `consoleblank=300` för att skärmen ska slockna efter 5 minuter i tty:n. Viktigt om ly används som display manager.

6. Starta om

7. Konfigure ip 

8. Installera `libxcrypt-compat`

9. Installera puppet genom att ladda ned `https://apt.voxpupuli.org/pool/openvox7/o/openvox-agent/openvox-agent_7.37.2-1%2Bdebian12_arm64.deb`, packa upp det med `bsdtar`

10. `sudo ln -s /opt/puppetlabs/bin /usr/bin/puppet`

11. (Logg a in på chapman, rensa elle rskapa cert)

12. `puppet config set server chapman.lysator.liu.se`

13. `puppet apply +` https://datorhandbok.lysator.liu.se/index.php/Rootmanual:Nya_Puppet
