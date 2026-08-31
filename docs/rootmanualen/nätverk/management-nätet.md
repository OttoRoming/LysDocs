---
title: Management Nätet
---
# Management Nätet
Management nätet används för att administrera servrar utan fysiskt tillgång.
Ipmi tillåter användaren att starta om, stänga av och få en shell på datorer
vilket underlättar hanteringen av många maskiner enormt.

Lysators managment nät hanteras via Orwell. Av tidigare missar har vi lärt oss
att nya maskiner **skall** sättas upp med ipmi.

## IP-rymd
Management-nätets ip-rymd är `172.16.0.0/16`. Ip-adresserna är uppdelade så att
näst sista oktetten anger ändamål för ip-adressen och den sista oktetten speglar
den sista oktetten i den managerade enhetens "riktiga" ip-adress.

| näst sista oktett | Användning                                                                           |
|-------------------|--------------------------------------------------------------------------------------|
| 163               | PDU:er										   |
| 237	            | Conina                                                                               |
| 249               | Management Switchar								   |
| 250               | Switchar 										   |
| 254               | Datorer med "vanlig ip" (sista oktetten är samma som vanliga)			   |
| 255               | Mycket temporär använding                                                            |

## Sätta upp IPMI

Eftersom Lysators system är donationer har de ofta redan någon IPMI
konfiguration. IPMI ska använda användaren `Administrator` och lösenordet som
finns i rötternas pass med namnet `bmc` (Board Managment Controler).

Börjar med att skapa eller ändra namn på en existerande användare; använd dig
av kommandon nedan:

```bash
# Visa listan av alla användarkonton. Välj ett id som du ska använda - helst en
# existerande användare.
ipmitool user list 1

# Enable/Disable användarkonto
ipmitool user enable <id> 
ipmitool user disable <id> 

# Bytt namn eller lösenord av användare
ipmitool user set password <id> 
ipmitool user set name <id> Administrator

# Ger användaren administrator privilegier
ipmitool user priv <id> 4
```

Sätt sedan upp nätverkskonfigurationen med kommandon nedan. IP addressen för
maskinen du sätter upp får du från tabellen längre upp. 

```bash
ipmitool lan set 1 ipsrc static
ipmitool lan set 1 ipaddr <ip>
ipmitool lan set 1 netmask 255.255.0.0
ipmitool lan set 1 defgw ipaddr 172.16.0.1
```

Det rekommenderas även att man lägga in maskinen i LysNetwork Puppet 
i filen [`mgmt-hosts`](https://git.lysator.liu.se/lysator/puppet/lysnetwork/-/blob/master/files/mgmt-hosts)
för att underlätta användandet av IPMI från Orwell.

## Orwell

Orwell är Lysator managment maskin ditt managment nätet är ansluten till. Rötter
kan logga in där med egen användare.

För att koppla dig till IPMI av en maskin:
För att exekvetera IPMI kommandon från Orwell använd kommandot nedan, lösenordet
som efterfrågas **bör** vara `bmc` i pass-repot.

```bash
ipmitool -H <ip> -I lanplus -U Administrator <kommando>
```

Om man vill underlätta sig arbetet använder man kommandot `shell` som koppla dig
till maskinen och öppnar en tolk där man kan exekvetera andra kommandon utan att
behöva ange lösenordet hela tiden. 
```bash
ipmitool -H kukuri.mgmt -I lanplus -U Administrator shell
```

### Shell
Om uppsatt kan man få en shell på maskinen med:
```bash
sol activate
```

### SEL - System Event Log
System event loggen är en logg ditt maskinen loggar hårdvarufel. Om en maskin
beter sig konstigt utan någon uppenbart orsakt är det värd att kolla på den.

```bash
sel list 
sel get 0x<id>
sel clear
```

### Power Controll
Vanligaste operationen man använder IPMI till är att starta om, sätta på eller
kolla om en maskin är på. `chassis` är kommandot som kontrollera det.

```bash
chassis status
chassis on
chassis off
chassis restart
```






