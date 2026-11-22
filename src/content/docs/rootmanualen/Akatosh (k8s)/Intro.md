---
title: Intro
sidebar:
  order: 1
---

Akatosh är ett Kubernetes-kluster (k8s) som kör diverse tjänster.

## Översikt

Klustret består av kontrollplan, lagring (Ceph) och arbetsnoder. Tillsammans
utgör de ett kluster byggt för high availability i kontrollplanet, lagringen och
arbetsnoderna.

### Kontrollplan

Kontrollplanet består av tre dedikerade noder, akatosh-01, akatosh-02 och
akatosh-03 (se [Hårdvara](/rootmanualen/akatosh-k8s/hårdvara/)). Där körs
Kubernetes egna komponenter, de som håller reda på klustrets tillstånd och
bestämmer vad som ska köras var. Med tre noder behåller klustret majoritet
(quorum) även om en nod går ner, så kontrollplanet fortsätter att fungera.

Utöver Kubernetes egna komponenter körs här även sådant som resten av klustret
är beroende av, eller som behövs för att administrera det. Eftersom de inte
delar noder med vanliga tjänster påverkas de inte av last eller problem på
arbetsnoderna. Dessutom körs Postgres för diverse tjänster för att utnyttja den
snabbare lagringen som finns på kontrollplansnoderna.

#### Kubernetes kontrollplan

Det här är själva kontrollplanet, komponenterna som styr klustret.

| Tjänst                  | Vad den gör                                                                                                          |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------- |
| etcd                    | Distribuerad databas där hela klustrets tillstånd och konfiguration lagras.                                          |
| kube-apiserver          | Klustrets API. Allt som läser eller ändrar något i klustret går via den, både kubectl, ArgoCD och noderna själva.    |
| kube-scheduler          | Bestämmer vilken nod varje container ska köras på.                                                                   |
| kube-controller-manager | Ser till att det som körs stämmer med det som är beställt, till exempel genom att starta om containrar som kraschat. |
| kube-vip                | Virtuell IP-adress för API:t som flyttas till en annan kontrollplansnod om en nod går ner. Ungefär som keepalived.   |

#### Infrastruktur

Grundtjänster som resten av klustret är beroende av. Slutar de fungera påverkas
alla tjänster, därför körs de i kontrollplanet och inte på arbetsnoderna.

| Tjänst                    | Vad den gör                                                                                                                 |
| ------------------------- | --------------------------------------------------------------------------------------------------------------------------- |
| Cilium                    | Nätverket mellan containrar och noder, inklusive brandväggsregler inne i klustret.                                          |
| CoreDNS                   | Klustrets interna DNS, så att tjänster kan nå varandra via namn.                                                            |
| metrics-server            | Samlar in CPU- och minnesanvändning per container, till exempel för `kubectl top` och Headlamp.                             |
| kubelet-csr-approver      | Godkänner automatiskt de TLS-certifikat som varje nods kubelet (Kubernetes agent på noden) begär.                           |
| sealed-secrets-controller | Gör det möjligt att lagra lösenord och andra hemligheter krypterat i git. Bara klustret har nyckeln för att dekryptera dem. |
| local-path-provisioner    | Skapar lagringsvolymer som kataloger på nodens lokala disk. Snabbt, men datan finns bara på den noden.                      |
| cert-manager              | Beställer och förnyar TLS-certifikat från Let's Encrypt automatiskt.                                                        |
| CNPG-operator             | Sätter upp och sköter Postgres-kluster, med replikering, automatisk failover och backup.                                    |
| Autoroll                  | Uppdaterar tjänster automatiskt när en ny version av deras container-image publiceras.                                      |

<!-- TODO: Ceph-avsnitt
#### Ceph
-->

#### Adminverktyg

Verktyg för att administrera klustret. De körs i kontrollplanet så att de går
att nå även när det är problem på arbetsnoderna, alltså just när man behöver
dem.

| Tjänst                                               | Vad den gör                                                                                                                   |
| ---------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| [ArgoCD](https://argocd.akatosh.lysator.liu.se/)     | Synkar klustret mot [git](https://forge.lysator.liu.se/lysator/k8s-lys), så att det som finns i git är det som körs (gitops). |
| [Headlamp](https://headlamp.akatosh.lysator.liu.se/) | Webbgränssnitt för att se och hantera klustret.                                                                               |

#### Tjänster

| Tjänst    | Vad den gör                                                                        |
| --------- | ---------------------------------------------------------------------------------- |
| Postgres  | Postgres-kluster som sköts av CNPG-operatorn och används av tjänsterna i klustret. |
| Authentik | Inloggning för tjänster i klustret.                                                |
