> Baserad på <https://datorhandbok.lysator.liu.se/index.php/Rootmanual:Skapa_Inhysning>

## Skapa resurspool

Om samma inhysning ska ha flera VM:ar OCH vill ha möjlighet att använda Proxmoxgränssnittet är det bra ha alla VM:ar inom samma [_resurspool_](https://pve.proxmox.com/wiki/User_Management#pveum_resource_pools). Det gör det smidigare att definiera rättigheter på ett och samma ställe.

För att skapa en ny resurspool:

1. Tryck på "Datacenter (milliways)" högst upp i vänstra trädvyn.

2. Tryck på "Permissions" > "Pools".

3. Tryck "Create" högre upp på sidan.

4. Sätt fälten till något i stil med Name: `inhysning-<kort-namn-på-inhysning>`, Comment: `<Fullständigt namn på förening/organisation>`


## Skapa virtuell maskin

1. Välj ut lämplig nod att lägga VM:en på, exempelvis den som verkar minst belastad.
Man kan gå in på varje nods "Summary"-flik och kolla på trender för dag-vecka-månad, bör kunna ge ett hum.

2. Tryck på "Create VM" uppe till höger.

TO BE CONTINUED!!
