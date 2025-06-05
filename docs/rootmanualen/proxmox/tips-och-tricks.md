## `qm`

`qm` är ett kommandoradsverktyg för att styra Proxmox. Läs mer <https://pve.proxmox.com/pve-docs/qm.1.html>

Här är är några av de coolaste kommandona som jag hittat:

### `qm terminal <VMID>`

Anslut till en VM:s TTY genom dess seriella port.

För att koppla loss, tryck <kbd>Ctrl</kbd>+<kbd>O</kbd>.

!!! tip "Tips: "jump-host at home""

    ```sh
    ssh -t milliways-N -- qm terminal <VMID>
    ```

    gör att du "jump-hostar" genom noden och direkt får skal i VM:en.

    - Viktigt med `ssh -t`!


**För att kunna använda `qm terminal`:**

- "Anslut" en seriell port `serial0` under den maskinens "Hardware"
![Lägger till seriell port](./serial-port.png)
- Aktivera konsoll på `ttyS0` i operativsystemet.

    På Debian 12 funkar det att modifiera `/etc/default/grub`:
    ```grub
    GRUB_CMDLINE_LINUX="quiet console=tty0 console=ttyS0,115200 earlyprintk=ttyS0,115200 consoleblank=0"
    GRUB_TERMINAL="console serial"
    GRUB_SERIAL_COMMAND="serial --speed=115200"
    ```
