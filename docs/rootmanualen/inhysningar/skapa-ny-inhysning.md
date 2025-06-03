## Skapa resurspool

Om samma inhysning ska ha flera VM:ar OCH vill ha möjlighet att använda Proxmoxgränssnittet är det bra ha alla VM:ar inom samma [_resurspool_](https://pve.proxmox.com/wiki/User_Management#pveum_resource_pools). Det gör det smidigare att definiera rättigheter på ett och samma ställe.

För att skapa en ny resurspool:

1. Tryck på "Datacenter (milliways)" högst upp i vänstra trädvyn.

2. Tryck på "Permissions" > "Pools".

3. Tryck "Create" högre upp på sidan.

4. Sätt fälten till något i stil med Name: `inhysning-<kort-namn-på-inhysning>`, Comment: `<Fullständigt namn på förening/organisation>`


## Skapa virtuell maskin

### Genom template

![](template-inhysning.png)

VM 187 (template-inhysning) är en s.k. template VM. Den är baserad på Debian 12, och är förkonfigurerad enligt följande:

- den har "Cloud-Init" så att man direkt i Proxmox, under den klonade VMen:s "Cloud-Init"-flik kan:
    - ställa in `lysroot`:s lösenord
    - sätta ipv4 och ipv4 och dess gateway
- den har `qemu-guest-agent` förinstallerad, så att man exempelvis kan styra VM:en med graceful shutdown genom Proxmox VE
- openssh-server är installerad och aktiverad med `PasswordAuthentication yes`.
- den får sin `hostname` från sitt VM-namn i klustret
- dess apt sources använder `ftp.lysator.liu.se`

**Hur gör man?**

1. Högerklicka på "187 (template-inhysning)" och välj "Clone".

2. Ändra _Mode_ till "Full clone". 

    !!! danger "Full clone"

        Du **måste** byta _Mode_ till "Full clone"! 

        Annars kommer denna nya VM dela resurser med templaten och det blir kaos!

        ![](full-clone.png)

3. Välj namnet på inhysningen. Detta kommer VM:en också få som `hostname`.

4. Välj vilken nod inhysningen ska ligga på.

5. Tryck "Clone".

6. Vänta på kloningen av disken. Det är 3 GiB, så bör bara ta någon minut.

7. Tryck på den nya VM:en.

8. Inne på fliken "Cloud-Init":
    1. Sätt "Password" till det nya lösenordet som genererats med `pass generate -n`.
    2. Sätt den IP Config som önskas.
    3. (Tryck "Regenerate Image".)
    > Osäker om det behövs... enligt [denna tråd](https://forum.proxmox.com/threads/what-is-the-regenerate-image-in-cloud-init-section.115531/) behövs används det för att göra ändringar på en levande VM! Alltså behövs inte om man startar VM:en stoppat tillstånd..

9. Disken är som sagt 3 GiB, vi måste expandera den. Gör så här:
    1. Gå in under "Hardware".
    2. Tryck på "Hard Disk (virtio0)".
    3. Tryck på "Disk Action" > "Resize".
    4. Välj önskad utökning i GiB. Väljer du 100 GiB, blir slutliga storleken 103 GiB.

10. Starta VM:en.

11. Du är färdig! Du kan `ssh`:a in direkt, med `lysroot` och det lösenord som sattes under "Cloud-Init".
    > Alternativt kan du använda "Console" i WebUI.


### Manuellt
> Baserad på <https://datorhandbok.lysator.liu.se/index.php/Rootmanual:Skapa_Inhysning>

1. Välj ut lämplig nod att lägga VM:en på, exempelvis den som verkar minst belastad.
Man kan gå in på varje nods "Summary"-flik och kolla på trender för dag-vecka-månad, bör kunna ge ett hum.

2. Tryck på "Create VM" uppe till höger.

...TO BE CONTINUED!!
