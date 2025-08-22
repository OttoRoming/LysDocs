---
title: Conina
---
# Conina
Conina är Lysators nya virtualiseringskluster och innehåller både inhysningar och vissa av Lysators egna tjänster.

## Hårdvara
Conina består av 32 binoder och en SL4540 där varje nod har gigabit ethernet och är inkopplat till ett IB-nät för Ceph.

| Namn          | IP                                        | Modell | Kommentar               |
| ------------- | ----------------------------------------- | ------ | ----------------------- |
| conina1       | 10.10.237.1 + conina.lysator.liu.se       | binod  |                         |
| conina2       | 10.10.237.2                               | binod  |                         |
| conina3       | 10.10.237.3                               | binod  |                         |
| conina4       | 10.10.237.4                               | binod  |                         |
| conina5       | 10.10.237.5                               | binod  |                         |
| conina6       | 10.10.237.6                               | binod  |                         |
| conina7       | 10.10.237.7                               | binod  |                         |
| conina8       | 10.10.237.8                               | binod  |                         |
| conina9       | 10.10.237.9                               | binod  |                         |
| conina10      | 10.10.237.10                              | binod  |                         |
| conina11      | 10.10.237.11                              | binod  |                         |
| conina12      | 10.10.237.12                              | binod  |                         |
| conina13      | 10.10.237.13                              | binod  |                         |
| conina14      | 10.10.237.14                              | binod  |                         |
| conina15      | 10.10.237.15                              | binod  |                         |
| conina16      | 10.10.237.16                              | binod  |                         |
| conina17      | 10.10.237.17                              | binod  |                         |
| conina18      | 10.10.237.18                              | binod  |                         |
| conina19      | 10.10.237.19                              | binod  |                         |
| conina20      | 10.10.237.20                              | binod  |                         |
| conina21      | 10.10.237.21                              | binod  |                         |
| conina22      | 10.10.237.22                              | binod  |                         |
| conina23      | 10.10.237.23 + karaboudjan.lysator.liu.se | binod  |                         |
| conina24      | 10.10.237.24                              | binod  |                         |
| conina25      | 10.10.237.25                              | binod  |                         |
| conina26      | 10.10.237.26                              | binod  |                         |
| conina27      | 10.10.237.27                              | binod  |                         |
| conina28      | 10.10.237.28                              | binod  |                         |
| conina29      | 10.10.237.29                              | binod  |                         |
| conina30      | 10.10.237.30                              | binod  |                         |
| conina31      | 10.10.237.31                              | binod  |                         |
| conina32      | 10.10.237.32 + speedol.lysator.liu.se     | binod  |                         |
| conina-disk1  | 10.10.237.101                             | SL4540 | Ska ej köra vmar        |

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

### Specialnoder/systemservrar
conina1, conina23 och conina32 är specialnoder på så sätt att de har routningsbara ip:n.

conina1
conina.lysator.liu.se har adress 130.236.254.43
conina.lysator.liu.se har IPv6 adress 2001:6b0:17:f0a0::2b

conina23
karaboudjan.lysator.liu.se har adress 130.236.254.50
karaboudjan.lysator.liu.se har IPv6 adress 2001:6b0:17:f0a0::32

conina32
speedol.lysator.liu.se har adress 130.236.254.51
speedol.lysator.liu.se har IPv6 adress 2001:6b0:17:f0a0::33
