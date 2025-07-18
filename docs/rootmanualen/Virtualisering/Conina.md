---
title: Conina
---
# Conina
Conina är Lysators nya virtualiseringskluster och innehåller både inhysningar och vissa av Lysators egna tjänster.

## Hårdvara
Conina består av 32 binoder och en SL4540 där varje nod har gigabit ethernet och är inkopplat till ett IB-nät för Ceph.

| Namn          | IP                                     | Modell | Kommentar               |
| ------------- | -------------------------------------- | ------ | ----------------------- |
| conina-1      | 10.10.237.1 + conina.lysator.liu.se    | binod  |                         |
| conina-2      | 10.10.237.2                            | binod  |                         |
| conina-3      | 10.10.237.3                            | binod  |                         |
| conina-4      | 10.10.237.4                            | binod  |                         |
| conina-5      | 10.10.237.5                            | binod  |                         |
| conina-6      | 10.10.237.6                            | binod  |                         |
| conina-7      | 10.10.237.7                            | binod  |                         |
| conina-8      | 10.10.237.8                            | binod  |                         |
| conina-9      | 10.10.237.9                            | binod  |                         |
| conina-10     | 10.10.237.10                           | binod  |                         |
| conina-11     | 10.10.237.11                           | binod  |                         |
| conina-12     | 10.10.237.12                           | binod  |                         |
| conina-12     | 10.10.237.13                           | binod  |                         |
| conina-13     | 10.10.237.14                           | binod  |                         |
| conina-14     | 10.10.237.15                           | binod  |                         |
| conina-15     | 10.10.237.16                           | binod  |                         |
| conina-16     | 10.10.237.17                           | binod  |                         |
| conina-17     | 10.10.237.18                           | binod  |                         |
| conina-18     | 10.10.237.19                           | binod  |                         |
| conina-19     | 10.10.237.20                           | binod  |                         |
| conina-20     | 10.10.237.21                           | binod  |                         |
| conina-21     | 10.10.237.22                           | binod  |                         |
| conina-22     | 10.10.237.23                           | binod  |                         |
| conina-23     | 10.10.237.24                           | binod  |                         |
| conina-24     | 10.10.237.25                           | binod  |                         |
| conina-26     | 10.10.237.26                           | binod  |                         |
| conina-27     | 10.10.237.27                           | binod  |                         |
| conina-28     | 10.10.237.28                           | binod  |                         |
| conina-29     | 10.10.237.29                           | binod  |                         |
| conina-30     | 10.10.237.30                           | binod  |                         |
| conina-31     | 10.10.237.31                           | binod  |                         |
| conina-32     | 10.10.237.32                           | binod  |                         |
| conina-disk1  | 10.10.237.101                          | SL4540 | Ska ej köra vmar        |

## Åtkomst
Webbgränssnittet (port 8006) kan nås från Lysators nät. Förslagsvis används ssh-proxy via `conina-1` från godtycklig cpu-server eller
wireguard via Skuldafn. Inloggning kan ske antingen med Lysator-konto genom att välja `ad.lysator.liu.se` som realm alternativt välja `Linux PAM` och logga in med lösenordet i pass (root som användarnamn)

SSH kan enbart nås från Lysators nät.

## Underhåll
### Starta klustret
!!! warning "Sätt inte igång många noder samtidigt"
    Om många noder startar samtidigt kan corosync bilda separata grupper, genom att starta noderna en och en så undviks problemet.

Skriptet `/root/conina/turn_on.sh` på Orwell kan användas för att starta hela klustret via ipmi.

### Grafana
Övervakning av bl.a. temperatur finns på [https://graf.lysator.liu.se/d/celhn15dqhtz4c/conina?orgId=1](https://graf.lysator.liu.se/d/celhn15dqhtz4c/conina?orgId=1)
