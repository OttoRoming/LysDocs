---
title: Hårdvara
sidebar:
  order: 2
---

En aktuell lista över klustrets noder finns i [Headlamp](https://headlamp.akatosh.lysator.liu.se/c/main/nodes).
Där syns nodens typ i kolumnen _Roles_ (`control-plane`, `storage` eller `worker`).

## Kontrollplan

_akatosh-01, akatosh-02, akatosh-03_  
Alla tre noderna är Dell PowerEdge R630 med 64, 96 respektive 64 GB RAM.
Noderna har varsin 1 TB NVMe-SSD som sitter i en PCIe-adapter och används för rotfilsystemet.
Tyvärr kan noderna inte boota från SSD:n, så i varje nod sitter också en 1,2 TB SAS-hårddisk som innehåller EFI-partitionen och `/boot`.

## Lagring (Ceph)

_akatosh-11, akatosh-12, akatosh-13_  
Klustret innehåller tre lagringsnoder i form av Dell PowerEdge R510.
Varje lagringsnod innehåller 12 stycken 2 TB SATA-hårddiskar, varav en används som bootdisk och de övriga 11 som datadiskar för Ceph.
Dessutom har varje nod en 500 GB NVMe-SSD som används för Cephs BlueStore-metadata.

## Arbetsnoder

Arbetsnoderna finns i olika utföranden, men generellt är det Asus-noder med 64 eller 128 GB RAM och en 2 TB hårddisk för rotfilsystem, containerlagring och temporär lagring (t.ex. emptyDir).
