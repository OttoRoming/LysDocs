Coninas Proxmox VE gränssnitt ligger inte publikt tillgängligt.

För att komma åt det utifrån, enklast är genom SSH tunnling, exempelvis genom `milou`

```
ssh -ND 9009 -J milou root@conina
```

Nu kan du nå gränssnittet på https://conina.lysator.liu.se:8006. I nuläget används self-signed certifikat, så du måste acceptera varningen.
