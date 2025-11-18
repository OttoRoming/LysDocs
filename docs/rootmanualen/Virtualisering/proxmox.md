Coninas Proxmox VE gränssnitt ligger inte publikt tillgängligt.

För att komma åt det utifrån, enklast är genom SSH tunnling (SOCKS-proxy), exempelvis genom `milou`

```sh
ssh -ND 9009 milou.lysator.liu.se
```

Använd SOCKS-proxy i din webbläsare:

- **SOCKS Host:** localhost
- **SOCKS Port:** 9009

Nu kan du nå gränssnittet på <https://conina.lysator.liu.se:8006>. I nuläget används self-signed certifikat, så du måste acceptera varningen.
